using parole.Models;

namespace parole.Features;

public interface IArcGISCredential
{
    string Username { get; set; }
    string Password { get; set; }
    string Host { get; set; }
    string Scheme { get; set; }
    string PathBase { get; set; }
    string PathString { get; set; }
}

public class Credential : IArcGISCredential
{
    public string Username { get; set; } = default!;
    public string Password { get; set; } = default!;
    public string Host { get; set; } = default!;
    public string Scheme { get; set; } = default!;
    public string PathBase { get; set; } = default!;
    public string PathString { get; set; } = default!;
}

public class TokenResponse : Errorable
{
    public string Token { get; set; } = default!;
    public long Expires { get; set; }
    public bool Ssl { get; set; }
}
