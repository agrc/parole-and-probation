using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Serilog;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace parole.Features {
    public class TokenService {
        private readonly Uri TokenUri;
        private readonly string _tokenUrl = "/tokens/generateToken";
        private const int TenMinuteBufferInMilliSeconds = 600000;
        private readonly HttpClient _client;
        private readonly KeyValuePair<string?, string?>[] FormData = new KeyValuePair<string?, string?>[5];
        private readonly ILogger _log;
        private DateTime _expiresIn = DateTime.UtcNow;
        private string _currentToken = default!;

        public TokenService(IHttpClientFactory httpClientFactory, IArcGISCredential credentials, ILogger log) {
            _client = httpClientFactory.CreateClient("default");
            _log = log;

            TokenUri = new Uri(UriHelper.BuildAbsolute(credentials.Scheme,
                new HostString(credentials.Host),
                credentials.PathBase,
                _tokenUrl));

            FormData[0] = new KeyValuePair<string?, string?>("username", credentials.Username);
            FormData[1] = new KeyValuePair<string?, string?>("password", credentials.Password);
            FormData[2] = new KeyValuePair<string?, string?>("client", "requestip");
            FormData[3] = new KeyValuePair<string?, string?>("expiration", "60");
            FormData[4] = new KeyValuePair<string?, string?>("f", "json");
        }

        public async Task<string> GetTokenAsync() {
            _log.Verbose("GetToken");

            if (!string.IsNullOrEmpty(_currentToken)) {
                var utcNow = DateTime.UtcNow;

                _log.Verbose("The time is {Now} and the token expires at {Expires}", utcNow, _expiresIn);

                if (utcNow < _expiresIn) {
                    _log.Verbose("The current token is still valid.");

                    return _currentToken;
                }

                _log.Verbose("Requesting a new token");
            }

            _log.Debug("Requesting the first token");

            using var formContent = new FormUrlEncodedContent(FormData);
            try {
                var response = await _client.PostAsync(TokenUri, formContent);
                if (!response.IsSuccessStatusCode) {
                    return string.Empty;
                }

                TokenResponse? tokenResponse;

                try {
                    tokenResponse = await response.Content.ReadFromJsonAsync<TokenResponse>();
                } catch (Exception) {
                    _log.Error("problem creating token response: {data}", response.Content.ReadAsStringAsync().Result);

                    return string.Empty;
                }

                _log.Verbose("Token service response {@Response}", tokenResponse);

                if (tokenResponse is null) {
                    return string.Empty;
                }

                var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                _expiresIn = epoch.AddMilliseconds(tokenResponse.Expires - TenMinuteBufferInMilliSeconds);

                return _currentToken = tokenResponse.Token;
            } catch (Exception ex) {
                _log.Error(ex, "Getting a token from {Url}", TokenUri.AbsoluteUri);

                return string.Empty;
            }
        }
    }
}
