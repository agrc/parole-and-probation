using System.Collections.Generic;

namespace parole.Features {
    public record TypeAheadDescriptor(string Input, string Value, string Filter, int? RequestId, int? Limit = 25);
    public record TypeAheadResponse(int? RequestId, IEnumerable<string> Data);
}
