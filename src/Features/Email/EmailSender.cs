using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Serilog;

namespace parole.Features {
    public class EmailSender {
        private readonly EmailConfig _config;
        private readonly ILogger? _log;
        private readonly ISendGridClient _client;

        public EmailSender(ISendGridClient client, EmailConfig config, ILogger? log) {
            _config = config;
            _log = log;
            _client = client;
        }

        public async Task SendAsync(IReadOnlyCollection<string> recipients, Stream stream) {
            _log?.Information("Sending email to {people}", recipients);

            var to = recipients.Select(x => new EmailAddress(string.Empty, x)).ToList();

            var message = new SendGridMessage {
                From = new EmailAddress("No Reply", "no.reply@utah.gov"),
                Subject = "AP&P Field Map: Offender Export",
            };

            message.AddTos(to);

            message.PlainTextContent = "Attached is your export. This will open in all spreadsheet applications including Google Sheets.";
            await message.AddAttachmentAsync("export.csv", stream);

            if (_config.Testing) {
                SendToPickupDirectory(message, _config.Pickup);

                return;
            }

            await _client.SendEmailAsync(message);
            _log?.Information("Email sent");
        }

        private static void SendToPickupDirectory(SendGridMessage message, string pickupDirectory) {
            while (true) {
                var path = Path.Combine(pickupDirectory, $"{DateTime.Now:yyyy-MM-dd-hh-mm-ss}.eml");

                if (!Directory.Exists(pickupDirectory)) {
                    Directory.CreateDirectory(pickupDirectory);
                }

                if (File.Exists(path)) {
                    continue;
                }

                try {
                    File.WriteAllText(path, message.Serialize());

                    return;
                } catch (IOException) {
                    // The file may have been created between our File.Exists() check and
                    // our attempt to create the stream.
                }
            }
        }
    }
}
