namespace parole.Features {
    public class EmailConfig {
        public string Smtp { get; set; } = default!;
        public string Pickup { get; set; } = default!;
        public bool Testing { get; set; }
    }
}
