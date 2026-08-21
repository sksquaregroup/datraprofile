/**
 * Datra Platform — Vercel Serverless Function: Contact & Demo Request API
 * 
 * Supports two-way communication:
 * 1. Delivers lead details to info@sksquaregroup.com
 * 2. Sends an automated confirmation receipt back to the prospective client
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { name, email, company, screens, notes } = req.body || {};

    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Please provide full name, work email, and company.' });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || 'info@sksquaregroup.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Datra Platform <info@sksquaregroup.com>';
    const subject = `[Datra Platform Demo Request] ${company} — ${name}`;
    
    // Internal Notification Email for Team
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: #090615; padding: 24px; text-align: center;">
          <h1 style="color: #00f2fe; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">DATRA PLATFORM</h1>
          <p style="color: #94a3b8; margin: 4px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">New Enterprise Consultation Request</p>
        </div>
        
        <div style="padding: 24px;">
          <h2 style="font-size: 16px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #00f2fe; padding-bottom: 8px;">Lead Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
            <tr>
              <td style="padding: 10px 0; font-weight: 600; width: 140px; color: #64748b;">Full Name:</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Work Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Company / Org:</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${company}</td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Estate Size:</td>
              <td style="padding: 10px 0;"><span style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 2px 10px; border-radius: 12px; font-weight: 600; font-size: 13px;">${screens || 'Not specified'}</span></td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600; color: #64748b; vertical-align: top;">Requirements:</td>
              <td style="padding: 10px 0; line-height: 1.5; color: #334155;">${notes || 'None provided'}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 14px; background: #f8fafc; border-radius: 6px; font-size: 12px; color: #64748b; text-align: center;">
            Sent automatically from <strong>Datra Platform</strong> Web Profile &bull; A technology of SK Square Group Ltd.
          </div>
        </div>
      </div>
    `;

    // Client Confirmation Receipt Email
    const clientConfirmationHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: #090615; padding: 24px; text-align: center;">
          <h1 style="color: #00f2fe; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">DATRA PLATFORM</h1>
          <p style="color: #94a3b8; margin: 4px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">SK SQUARE GROUP</p>
        </div>
        
        <div style="padding: 28px;">
          <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">Thank You for Your Consultation Request, ${name}</h2>
          <p style="font-size: 14.5px; color: #475569; line-height: 1.6;">
            We have received your request for a live demonstration of <strong>Datra Platform</strong> for <strong>${company}</strong>.
          </p>
          <p style="font-size: 14.5px; color: #475569; line-height: 1.6;">
            An SK Square Group digital signage architect is reviewing your display requirements and will contact you within <strong>24 hours</strong> to coordinate a live walkthrough on your estate.
          </p>

          <div style="margin: 24px 0; padding: 16px; background: #f0fdfa; border-left: 4px solid #00f2fe; border-radius: 4px;">
            <p style="margin: 0; font-size: 13.5px; color: #0f766e; font-weight: 600;">Summary of Request:</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #134e4a;"><strong>Organisation:</strong> ${company} | <strong>Estate Size:</strong> ${screens || 'General Estate'}</p>
          </div>

          <p style="font-size: 13.5px; color: #64748b; line-height: 1.5;">
            Need immediate assistance or have custom NDA requirements? Reply directly to this email or reach us at <a href="mailto:info@sksquaregroup.com" style="color: #0284c7;">info@sksquaregroup.com</a>.
          </p>
        </div>

        <div style="background: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          &copy; 2026 SK Square Group Ltd. All rights reserved. Datra Platform™
        </div>
      </div>
    `;

    // 1. Resend API
    let resendApiKey = (process.env.RESEND_API_KEY || '').trim();
    if (resendApiKey) {
      if (resendApiKey.startsWith('re_re_')) {
        resendApiKey = resendApiKey.replace(/^re_re_/, 're_');
      }

      const { Resend } = await import('resend');
      const resend = new Resend(resendApiKey);

      // Send to SK Square Group Team
      const response = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        reply_to: email,
        subject: subject,
        html: htmlContent,
      });

      // Send Confirmation Response to Client
      try {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          reply_to: toEmail,
          subject: 'Datra Platform — Consultation Request Received',
          html: clientConfirmationHtml,
        });
      } catch (clientErr) {
        console.warn('[Auto-responder notice]:', clientErr.message);
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Consultation request submitted and confirmation sent.',
        id: response.id 
      });
    }

    // 2. SMTP via Nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || fromEmail,
        to: toEmail,
        replyTo: email,
        subject: subject,
        html: htmlContent,
      });

      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || fromEmail,
          to: email,
          replyTo: toEmail,
          subject: 'Datra Platform — Consultation Request Received',
          html: clientConfirmationHtml,
        });
      } catch (err) {}

      return res.status(200).json({ 
        success: true, 
        message: 'Consultation request submitted successfully via SMTP.' 
      });
    }

    // 3. Fallback Mode
    console.log('[Datra Platform Demo Request Received]:', { name, email, company, screens, notes });
    return res.status(200).json({
      success: true,
      message: 'Demo request recorded.'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      error: 'Failed to deliver consultation request. Please contact info@sksquaregroup.com directly.',
      details: error.message 
    });
  }
}
