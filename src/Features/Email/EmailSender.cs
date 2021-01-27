using MailKit.Net.Smtp;
using MimeKit;
using Serilog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace parole.Features {
    public class EmailSender {
        private readonly EmailConfig _config;
        private readonly ILogger _log;

        public EmailSender(EmailConfig config, ILogger log) {
            _config = config;
            _log = log;

            _log.Debug("Email settings: {@settings}", config);
        }

        public async Task SendAsync(IReadOnlyCollection<string> recipients, Stream stream) {
            _log.Information("Sending email to {people}", recipients);

            var to = recipients.Select(x => new MailboxAddress(string.Empty, x));

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("No Reply", "no.reply@utah.gov"));
            message.To.AddRange(to);
            message.Subject = "AP&P Field Map: Offender Export";

            var body = new TextPart("plain") {
                Text = "Attached is your export. This will open well in all spreadsheet applications including Google Sheets."
            };

            var attachment = new MimePart("application/csv") {
                Content = new MimeContent(stream),
                ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                FileName = "export.csv"
            };

            message.Body = new Multipart("mixed") {
                body,
                attachment
            };

            if (_config.Testing) {
                SendToPickupDirectory(message, _config.Pickup);

                return;
            }

            using var client = new SmtpClient();
            _log.Debug("Connecting to smtp server");
            await client.ConnectAsync(_config.Smtp, 25, MailKit.Security.SecureSocketOptions.None).ConfigureAwait(false);
            _log.Debug("Connected to smtp server");

            await client.SendAsync(message).ConfigureAwait(false);
            _log.Information("Email sent");

            await client.DisconnectAsync(true).ConfigureAwait(false);
        }

        private static void SendToPickupDirectory(MimeMessage message, string pickupDirectory) {
            while (true) {
                var path = Path.Combine(pickupDirectory, $"{DateTime.Now:yyyy-MM-dd-hh-mm-ss}.eml");

                if (!Directory.Exists(pickupDirectory)) {
                    Directory.CreateDirectory(pickupDirectory);
                }

                if (File.Exists(path)) {
                    continue;
                }

                try {
                    using var stream = new FileStream(path, FileMode.CreateNew);
                    message.WriteTo(stream);

                    return;
                } catch (IOException) {
                    // The file may have been created between our File.Exists() check and
                    // our attempt to create the stream.
                }
            }
        }
    }
}
