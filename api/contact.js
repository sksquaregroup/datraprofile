/**
 * Datra Platform — Vercel Serverless Function: Contact & Demo Request API
 * 
 * Supported Email Providers:
 * 1. Resend (Recommended): Set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * 2. SMTP (Nodemailer): Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
 */

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { name, email, company, screens, notes } = req.body || {};

    // Validate required fields
    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Please provide full name, work email, and company.' });
    }

    // Email content formatting
    const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@sksquaregroup.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Datra Platform <onboarding@resend.dev>';
    const subject = `[Datra Platform Demo Request] ${company} — ${name}`;
    
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

    // 1. Option A: Resend API (Recommended)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const response = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        reply_to: email,
        subject: subject,
        html: htmlContent,
      });

      return res.status(200).json({ 
        success: true, 
        message: 'Consultation request submitted successfully via Resend.',
        id: response.id 
      });
    }

    // 2. Option B: SMTP via Nodemailer
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

      return res.status(200).json({ 
        success: true, 
        message: 'Consultation request submitted successfully via SMTP.' 
      });
    }

    // 3. Fallback / Dev Mode (when environment variables are not yet set)
    console.log('[Datra Platform Demo Request Received]:', { name, email, company, screens, notes });
    return res.status(200).json({
      success: true,
      message: 'Demo request recorded (Development fallback mode. Add RESEND_API_KEY or SMTP credentials in Vercel to send real emails).'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      error: 'Failed to deliver consultation request. Please contact contact@sksquaregroup.com directly.',
      details: error.message 
    });
  }
}
