// Vercel Serverless Function - Resend Email Dispatcher
// Receives contact form submissions and delivers to bkjaiswal3399@gmail.com

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required form fields (name, email, message)' });
  }

  // Resend Secret API Key (from environment variable or default)
  const apiKey = process.env.RESEND_API_KEY || 're_9wvA6Cct_LuAkg6crywGQGGDF1NXZHPPo';

  if (!apiKey) {
    return res.status(500).json({
      error: 'RESEND_API_KEY is not configured.'
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portfolio Inquiry <onboarding@resend.dev>',
        to: ['bkjaiswal3399@gmail.com'],
        reply_to: email,
        subject: `[EHS Portfolio Inquiry] ${subject || 'New Message'} - from ${name}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #102A43; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E8EDF2; border-radius: 12px; background: #ffffff;">
            <div style="border-bottom: 2px solid #F28C28; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #102A43; font-size: 22px;">New Contact Message</h2>
              <p style="margin: 4px 0 0 0; color: #168C8C; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Bajarangee Kumar Jaiswal | EHS Portfolio</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #65758B; width: 140px; font-weight: 600;">Sender Name:</td>
                <td style="padding: 8px 0; color: #102A43; font-weight: 700;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #65758B; font-weight: 600;">Email Address:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #F28C28; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #65758B; font-weight: 600;">Subject / Topic:</td>
                <td style="padding: 8px 0; color: #102A43; font-weight: 600;">${subject || 'General Inquiry'}</td>
              </tr>
            </table>

            <div style="background: #F5F7FA; border-left: 4px solid #168C8C; padding: 16px 18px; border-radius: 6px; margin: 20px 0;">
              <span style="display: block; font-size: 12px; font-weight: 700; color: #168C8C; text-transform: uppercase; margin-bottom: 6px;">Message Content:</span>
              <p style="margin: 0; font-size: 14px; color: #263746; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="border-top: 1px solid #E8EDF2; padding-top: 14px; margin-top: 24px; font-size: 12px; color: #65758B; display: flex; justify-content: space-between;">
              <span>Delivered via Resend Email API</span>
              <span>Candidate: +91-7310181309</span>
            </div>
          </div>
        `
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Resend API rejected the request', details: data });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error while sending email' });
  }
}
