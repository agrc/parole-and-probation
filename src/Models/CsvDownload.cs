using System.Collections.Generic;

namespace app.Models {
    public class CsvDownload {
        public IReadOnlyCollection<int> Offenders { get; set; }
        public string Agent { get; set; }
    }
}
