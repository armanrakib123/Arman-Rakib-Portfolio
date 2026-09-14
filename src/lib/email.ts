import nodemailer from "nodemailer";
import portfolioConfig from "@/config/portfolioConfig";

interface SendContactEmailProps {
  toEmail: string;
  userName: string;
  subject: string;
  requirements: string;
  budget: string;
}

export async function sendThankYouEmail({
  toEmail,
  userName,
  subject,
  requirements,
  budget,
}: SendContactEmailProps) {
  const dev = portfolioConfig.developer;

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.FROM_EMAIL || smtpUser || dev.email;

  // Check if SMTP credentials exist
  if (!smtpUser || !smtpPass) {
    console.log(
      `[DEV EMAIL SIMULATION] SMTP credentials not set in .env.local. Thank you email would be sent to: ${toEmail} (${userName})`
    );
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const cleanWhatsapp = dev.whatsapp.replace(/[^0-9]/g, "");
    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // ── 1. Premium Fully Responsive Client Thank You Email Template ──
    const clientHtmlContent = `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Inquiry Received — ${dev.name}</title>
  <style>
    /* Reset & Client-Specific Styles */
    html, body { margin: 0 !important; padding: 0 !important; height: 100% !important; width: 100% !important; background-color: #080612; }
    * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; box-sizing: border-box; }
    div[style*="margin: 16px 0"] { margin: 0 !important; }
    table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; }
    table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    a { text-decoration: none; }

    /* Mobile Responsive Breakpoints */
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; padding: 10px !important; }
      .card-body { padding: 24px 18px !important; }
      .header-padding { padding: 32px 20px !important; }
      .summary-box { padding: 18px 14px !important; }
      .btn-responsive { width: 100% !important; display: block !important; text-align: center !important; margin-bottom: 10px !important; }
      .responsive-title { font-size: 22px !important; line-height: 28px !important; }
      .meta-label { width: 100px !important; }
    }
  </style>
</head>
<body style="background-color: #080612; margin: 0; padding: 24px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #e2e8f0;">

  <!-- Email Wrapper -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #080612;">
    <tr>
      <td align="center" style="padding: 10px;">
        
        <!-- Main Card Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="max-width: 600px; width: 100%; background-color: #0f172a; border-radius: 24px; overflow: hidden; border: 1px solid rgba(168,85,247,0.35); box-shadow: 0 25px 60px rgba(0,0,0,0.75);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #7c3aed 0%, #3b82f6 50%, #10b981 100%);"></td>
          </tr>

          <!-- Header Banner -->
          <tr>
            <td align="center" class="header-padding" style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); padding: 38px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08);">
              
              <!-- Initials Logo Badge -->
              <div style="margin: 0 auto 16px auto; width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: #ffffff; font-size: 18px; font-weight: 900; line-height: 48px; text-align: center; box-shadow: 0 6px 20px rgba(124,58,237,0.5);">
                ${dev.initials}
              </div>

              <!-- Status Badge -->
              <span style="display: inline-block; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); padding: 5px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #34d399; margin-bottom: 14px;">
                ✓ Inquiry Received & Confirmed
              </span>

              <h1 class="responsive-title" style="margin: 0; font-size: 26px; font-weight: 900; tracking: -0.02em; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                ${dev.name}
              </h1>
              <div style="font-size: 13px; font-weight: 600; margin-top: 6px; color: #a78bfa; letter-spacing: 0.5px;">
                ${dev.title}
              </div>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td class="card-body" style="padding: 36px 32px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
              
              <div style="font-size: 18px; font-weight: 800; color: #f8fafc; margin-bottom: 12px;">
                Hi ${userName},
              </div>

              <p style="margin-top: 0; margin-bottom: 22px; color: #cbd5e1; font-size: 15px;">
                Thank you for getting in touch! Your inquiry regarding <strong style="color: #c084fc;">&quot;${subject}&quot;</strong> has been successfully registered. I am reviewing your scope details and will get back to you within 24 hours.
              </p>

              <!-- Submitted Specification Summary Card -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="summary-box" style="background-color: #1e293b; border-radius: 18px; border: 1px solid #334155; margin: 26px 0; overflow: hidden;">
                <tr>
                  <td style="padding: 22px;">
                    
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.4px; color: #c084fc; margin-bottom: 14px; display: flex; align-items: center;">
                      📋 Project Specification Summary
                    </div>

                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                      <tr>
                        <td class="meta-label" style="padding: 7px 0; font-size: 13px; color: #94a3b8; font-weight: 600; width: 120px;">Client Name:</td>
                        <td style="padding: 7px 0; font-size: 13px; color: #f1f5f9; font-weight: 700;">${userName}</td>
                      </tr>
                      <tr>
                        <td class="meta-label" style="padding: 7px 0; font-size: 13px; color: #94a3b8; font-weight: 600;">Email Address:</td>
                        <td style="padding: 7px 0; font-size: 13px; color: #38bdf8; font-weight: 700;">${toEmail}</td>
                      </tr>
                      <tr>
                        <td class="meta-label" style="padding: 7px 0; font-size: 13px; color: #94a3b8; font-weight: 600;">Subject Topic:</td>
                        <td style="padding: 7px 0; font-size: 13px; color: #f1f5f9; font-weight: 700;">${subject}</td>
                      </tr>
                      <tr>
                        <td class="meta-label" style="padding: 7px 0; font-size: 13px; color: #94a3b8; font-weight: 600;">Budget Range:</td>
                        <td style="padding: 7px 0; font-size: 13px; color: #34d399; font-weight: 800;">${budget}</td>
                      </tr>
                      <tr>
                        <td class="meta-label" style="padding: 7px 0; font-size: 13px; color: #94a3b8; font-weight: 600;">Date Submitted:</td>
                        <td style="padding: 7px 0; font-size: 13px; color: #cbd5e1; font-weight: 600;">${formattedDate}</td>
                      </tr>
                    </table>

                    <!-- Requirement Quote Box -->
                    <div style="margin-top: 16px; background-color: #090d16; border-left: 3px solid #7c3aed; border-radius: 10px; padding: 14px 16px; font-style: italic; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                      &quot;${requirements}&quot;
                    </div>

                  </td>
                </tr>
              </table>

              <!-- Next Steps Timeline -->
              <div style="font-weight: 800; color: #f8fafc; font-size: 16px; margin-bottom: 14px;">
                🚀 What Happens Next?
              </div>

              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding-bottom: 14px;" valign="top">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color: #7c3aed; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; font-weight: 900; font-size: 11px; line-height: 24px;" valign="middle">1</td>
                        <td style="padding-left: 12px; font-size: 13px; color: #cbd5e1;">
                          <strong style="color: #ffffff;">Technical Assessment:</strong> Reviewing project scope, architecture dependencies, and estimate.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 14px;" valign="top">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color: #3b82f6; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; font-weight: 900; font-size: 11px; line-height: 24px;" valign="middle">2</td>
                        <td style="padding-left: 12px; font-size: 13px; color: #cbd5e1;">
                          <strong style="color: #ffffff;">Direct Proposal (within 24 hours):</strong> I will contact you via email or WhatsApp to schedule a discussion.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Button CTA -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${dev.github}" target="_blank" class="btn-responsive" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 14px; box-shadow: 0 8px 24px rgba(124,58,237,0.45);">
                      Explore My GitHub Projects →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #0b0f19; padding: 26px 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b;">
              
              <div style="font-weight: 800; color: #94a3b8; font-size: 14px; margin-bottom: 4px;">
                ${dev.name}
              </div>
              <div style="color: #64748b; margin-bottom: 14px;">
                ${dev.title}<br>
                ${dev.location}
              </div>

              <!-- Contact Pills -->
              <div style="margin-bottom: 16px;">
                <a href="mailto:${dev.email}" style="color: #c084fc; text-decoration: none; font-weight: 700; margin: 0 8px;">📧 ${dev.email}</a> •
                <a href="https://wa.me/${cleanWhatsapp}" target="_blank" style="color: #38bdf8; text-decoration: none; font-weight: 700; margin: 0 8px;">💬 WhatsApp: ${dev.whatsapp}</a>
              </div>

              <!-- Social Links -->
              <div style="font-size: 11px; color: #475569;">
                <a href="${dev.github}" target="_blank" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">GitHub</a> |
                <a href="${dev.linkedin}" target="_blank" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">LinkedIn</a> |
                <a href="https://work-pilot-ai.vercel.app" target="_blank" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">WorkPilot AI</a>
              </div>

              <div style="margin-top: 18px; font-size: 10px; color: #334155;">
                © ${new Date().getFullYear()} ${dev.name}. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // Send thank you email to client
    const clientMailOptions = {
      from: `"${dev.name}" <${fromEmail}>`,
      to: toEmail,
      subject: `Inquiry Received: ${subject} — ${dev.name}`,
      html: clientHtmlContent,
    };

    const info = await transporter.sendMail(clientMailOptions);
    console.log("Thank-you email dispatched to client successfully:", info.messageId);

    // ── 2. Professional Admin Notification Email Template (Sent to Hrishi) ──
    const adminHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080612; color: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 18px; padding: 28px; border: 1px solid rgba(168,85,247,0.4); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-b: 1px solid #334155; padding-bottom: 16px;">
      <h2 style="color: #c084fc; margin: 0; font-size: 20px;">🚀 New Portfolio Client Inquiry</h2>
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px; font-size: 14px;">
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; width: 120px; font-weight: 600;">Client Name:</td>
        <td style="padding: 6px 0; color: #ffffff; font-weight: 700;">${userName}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Client Email:</td>
        <td style="padding: 6px 0; color: #38bdf8; font-weight: 700;">
          <a href="mailto:${toEmail}" style="color: #38bdf8; text-decoration: none;">${toEmail}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Subject Topic:</td>
        <td style="padding: 6px 0; color: #ffffff; font-weight: 700;">${subject}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Budget Range:</td>
        <td style="padding: 6px 0; color: #34d399; font-weight: 800;">${budget}</td>
      </tr>
    </table>

    <div style="background-color: #0f172a; padding: 18px; border-radius: 12px; border-left: 4px solid #c084fc; margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 8px;">
        Requirements Message:
      </div>
      <div style="font-size: 14px; color: #f1f5f9; line-height: 1.6; white-space: pre-wrap;">
        ${requirements}
      </div>
    </div>

    <!-- Quick Action Buttons -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <a href="mailto:${toEmail}?subject=Re: ${encodeURIComponent(subject)} - ${encodeURIComponent(dev.name)}" style="display: inline-block; padding: 12px 24px; background: #7c3aed; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 13px; margin-right: 10px;">
            📧 Reply to Client
          </a>
          <a href="https://wa.me/${cleanWhatsapp}" target="_blank" style="display: inline-block; padding: 12px 24px; background: #25d366; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 13px;">
            💬 Open WhatsApp
          </a>
        </td>
      </tr>
    </table>

  </div>
</body>
</html>
    `;

    // Also notify dev if toEmail is not dev's own email
    if (toEmail.toLowerCase() !== fromEmail.toLowerCase()) {
      await transporter.sendMail({
        from: `"Portfolio Client Alert" <${fromEmail}>`,
        to: fromEmail,
        subject: `🔥 New Project Inquiry from ${userName} (${subject})`,
        html: adminHtmlContent,
      });
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending emails:", error);
    return { success: false, error };
  }
}
