using System.Collections.Generic;

namespace parole.Features {
    public record CsvDownload(IReadOnlyCollection<int> Offenders, string Agent);
}
