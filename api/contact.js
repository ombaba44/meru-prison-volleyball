import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Basic Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const timestamp = new Date().toLocaleString();

    // 1. Send Email to Admin
    const adminEmailHtml = `
      <div style="font-family: sans-serif; max-w-xl; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #1a472a; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Contact Inquiry</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Date:</strong> ${timestamp}</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px; white-space: pre-wrap;">
          ${message}
        </div>
      </div>
    `;

    // 2. Send Auto-Reply to User
    const userEmailHtml = `
      <div style="font-family: sans-serif; max-w-xl; margin: 0 auto; color: #1a1a1a;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #1a472a; margin: 0;">Meru Prison Stars</h1>
          <p style="color: #f97316; font-weight: bold; margin-top: 5px;">Building Champions Beyond the Court</p>
        </div>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to the Meru Prison Stars. We have received your message regarding "<strong>${subject}</strong>".</p>
        <p>Our team is dedicated to rehabilitation through sports and community empowerment. We will review your inquiry and get back to you as soon as possible.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Meru Prison Stars Team</strong></p>
      </div>
    `;

    // Execute both email sends concurrently
    await Promise.all([
      resend.emails.send({
        from: 'Meru Prison Stars <onboarding@resend.dev>', // Use verified domain in production if available
        to: 'ombabam@gmail.com',
        subject: `[Contact Form] ${subject}`,
        html: adminEmailHtml,
        reply_to: email,
      }),
      resend.emails.send({
        from: 'Meru Prison Stars <onboarding@resend.dev>', // Use verified domain in production if available
        to: email,
        subject: 'We received your message - Meru Prison Stars',
        html: userEmailHtml,
      })
    ]);

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
}
