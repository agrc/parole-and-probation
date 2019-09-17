using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using app.Models;

namespace app.Services {
    public class EmailSender {
        private readonly EmailConfig _config;

        public EmailSender(EmailConfig config) {
            _config = config;
        }

        public async Task SendAsync(IReadOnlyCollection<string> recipients, Stream stream) {
            using (var mailMessage = new MailMessage {
                From = new MailAddress("no-reply@utah.gov"),
                Subject = "AP&P Field Map: Offender Export",
                Body = "Attached is your export. This will open well in all spreadsheet applications including Google Sheets."
            }) {

                foreach (var email in recipients) {
                    mailMessage.To.Add(email);
                }

                using (var client = new SmtpClient(_config.Smtp) {
                    PickupDirectoryLocation = _config.Pickup,
                    DeliveryMethod = _config.Testing ? SmtpDeliveryMethod.SpecifiedPickupDirectory : SmtpDeliveryMethod.Network
                }) {
                    var csv = new Attachment(stream, new ContentType("application/csv"));
                    mailMessage.Attachments.Add(csv);

                    await client.SendMailAsync(mailMessage);
                }
            }
        }
    }
}
