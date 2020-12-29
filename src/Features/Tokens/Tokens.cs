using parole.Models;

namespace parole.Features {
    public interface IArcGISCredential {
        string Username { get; set; }
        string Password { get; set; }
        string Host { get; set; }
        string Scheme { get; set; }
        string PathBase { get; set; }
        string PathString { get; set; }
    }

    public class Credential : IArcGISCredential {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public string Scheme { get; set; }
        public string PathBase { get; set; }
        public string PathString { get; set; }
    }

    public class TokenResponse : Errorable {
        public string Token { get; set; }
        public long Expires { get; set; }
        public bool Ssl { get; set; }
    }
}
