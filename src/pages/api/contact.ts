import type { APIRoute } from 'astro';
import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}

async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    console.log('Turnstile verification result:', data);
    return data.success === true;
  } catch (error) {
    console.error('Captcha verification failed:', error);
    return false;
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check API key exists
    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);
    
    const body: ContactFormData = await request.json();
    const { name, email, message, captchaToken } = body;

    // Validate required fields
    if (!name || !email || !message || !captchaToken) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify captcha
    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return new Response(
        JSON.stringify({ error: 'Captcha verification failed' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <contact@freddiephilpot.dev>',
      to: [import.meta.env.CONTACT_EMAIL || 'contact@freddiephilpot.dev'],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Email sent successfully:', data);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
