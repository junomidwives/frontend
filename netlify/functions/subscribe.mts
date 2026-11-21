/**
 * Newsletter signup: POST { name, email } → MailerLite.
 *
 * Runs as a Netlify Function so the MailerLite API key stays on the server.
 * It used to be read in the browser (VITE_MAILERLITE_TOKEN), which put the
 * key, with full access to the account, in the site's public JavaScript.
 *
 * Netlify environment variables (both sites):
 *   MAILERLITE_TOKEN  MailerLite API key
 *   MAILERLITE_GROUP  group ID new subscribers are added to (optional)
 * Keep them without a VITE_ prefix, or the build would bundle them again.
 *
 * Served at /.netlify/functions/subscribe.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function subscribe(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const token = process.env.MAILERLITE_TOKEN;
  if (!token) {
    console.error("MAILERLITE_TOKEN is not set");
    return json({ error: "Signup isn't available just now. Please try again later." }, 500);
  }

  let body: { name?: unknown; email?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const name = String(body?.name ?? "").trim().slice(0, 200);
  const email = String(body?.email ?? "").trim().slice(0, 254);
  if (!name || !EMAIL.test(email)) {
    return json({ error: "Please enter your name and a valid email address." }, 400);
  }

  const group = process.env.MAILERLITE_GROUP;
  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      fields: { name },
      ...(group ? { groups: [group] } : {}),
    }),
  });

  if (!response.ok) {
    // Log MailerLite's reason for Netlify's function logs, never the key.
    console.error("MailerLite responded", response.status, await response.text());
    return json({ error: "We couldn't sign you up just now. Please try again later." }, 502);
  }

  return json({ ok: true }, 200);
}
