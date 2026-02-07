import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

async function verifyCaptcha(token) {
  const secretKey = "0x4AAAAAACYIXybxpet0rXcguxZ4wjrIxdI";
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token
      })
    });
    const data = await response.json();
    console.log("Turnstile verification result:", data);
    return data.success === true;
  } catch (error) {
    console.error("Captcha verification failed:", error);
    return false;
  }
}
const POST = async ({ request }) => {
  try {
    const apiKey = "re_EvZ56KGW_J5nPi3D7kyaHdibM6Wi9hEmJ";
    if (!apiKey) ;
    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, email, message, captchaToken } = body;
    if (!name || !email || !message || !captchaToken) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return new Response(
        JSON.stringify({ error: "Captcha verification failed" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const { data, error } = await resend.emails.send({
      from: "Contact Form <contact@freddiephilpot.dev>",
      to: ["contact@freddiephilpot.dev"],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}`
    });
    if (error) {
      console.error("Resend error:", JSON.stringify(error, null, 2));
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("Email sent successfully:", data);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
