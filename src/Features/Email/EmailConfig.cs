namespace parole.Features {
    // public class EmailConfig {
    //     public string Smtp { get; set; }
    //     public string Pickup { get; set; }
    //     public bool Testing { get; set; }
    // }

    public record EmailConfig(string Smtp, string Pickup, bool Testing);
}
