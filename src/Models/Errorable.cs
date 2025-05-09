using System.Collections.Generic;

namespace parole.Models;

public class Errorable
{
    public Error Error { get; set; } = default!;
}

public class Error
{
    public Error()
    {
        Details = [];
    }

    public int Code { get; set; }
    public string Message { get; set; } = default!;
    public string Messages
    {
        get
        {
            Details.Add(Message);
            return string.Join(" ", Details);
        }
    }
    public string MessageCode { get; set; } = default!;
    public List<string> Details { get; set; }
    public string Description { get; set; } = default!;
}
