import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { validateContact } from '../../lib/contact-validation';

export const prerender = false;
const respond = (body: object, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('content-type')?.includes('application/json'))
    return respond({ error: 'Please send a JSON request.' }, 415);
  let input: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 20000)
      return respond({ error: 'Your message is too long.' }, 413);
    input = JSON.parse(raw);
  } catch {
    return respond({ error: 'The request could not be read.' }, 400);
  }
  const data = validateContact(input);
  if (!data)
    return respond(
      {
        error:
          'Check your name, email and message (10–5,000 characters), then complete verification.',
      },
      400,
    );
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!secret || !apiKey)
    return respond(
      {
        error:
          'The form is unavailable. Please email contact@freddiephilpot.dev.',
      },
      503,
    );
  try {
    const verification = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({ secret, response: data.captchaToken }),
        signal: AbortSignal.timeout(10000),
      },
    );
    const result = await verification.json();
    if (!verification.ok || result.success !== true)
      return respond(
        { error: 'Verification expired or failed. Please complete it again.' },
        400,
      );
    const { error } = await new Resend(apiKey).emails.send({
      from: 'Contact Form <contact@freddiephilpot.dev>',
      to: [import.meta.env.CONTACT_EMAIL || 'contact@freddiephilpot.dev'],
      replyTo: data.email,
      subject: 'Portfolio message from ' + data.name,
      text:
        'Name: ' + data.name + '\nEmail: ' + data.email + '\n\n' + data.message,
    });
    if (error)
      return respond(
        {
          error:
            'Your message could not be sent. Please email contact@freddiephilpot.dev.',
        },
        502,
      );
    return respond({ success: true }, 200);
  } catch {
    return respond(
      {
        error:
          'The service could not be reached. Please try again or email contact@freddiephilpot.dev.',
      },
      502,
    );
  }
};
