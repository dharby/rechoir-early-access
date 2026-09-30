import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * Newsletter subscription proxy for EmailOctopus.
 *
 * WHY THIS EXISTS: the browser must never hold the EmailOctopus API key. It is
 * an account-wide credential (it can read and modify every list), and this
 * repository is public — a key shipped in the client bundle would be readable
 * by anyone. So the browser posts the visitor's email here, and this function
 * adds the secret on the server. The key lives in the deployment environment
 * only (EMAILOCTOPUS_API_KEY), never in the repo.
 *
 * Required environment variables:
 *   EMAILOCTOPUS_API_KEY  — from EmailOctopus → Account → API keys
 *   EMAILOCTOPUS_LIST_ID  — the audience/list id
 */

const EMAILOCTOPUS_API = "https://api.emailoctopus.com/v1";

type ResponseBody =
  | { ok: true; alreadySubscribed?: boolean }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function send(res: ServerResponse, status: number, body: ResponseBody) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  // No caching of an API response that varies by caller.
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    send(res, 405, { ok: false, error: "Method not allowed." });
    return;
  }

  const apiKey = process.env.EMAILOCTOPUS_API_KEY;
  const listId = process.env.EMAILOCTOPUS_LIST_ID;

  if (!apiKey || !listId) {
    // Misconfigured deployment — fail loudly rather than pretending to work.
    send(res, 500, { ok: false, error: "Newsletter is not configured yet." });
    return;
  }

  // Read the JSON body (Vercel does not parse it for us).
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk));
    size += buf.length;
    if (size > 8_192) {
      send(res, 413, { ok: false, error: "Request too large." });
      return;
    }
    chunks.push(buf);
  }

  let email = "";
  let honeypot = "";
  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8")) as {
      email?: unknown;
      company?: unknown;
    };
    if (typeof parsed.email === "string") email = parsed.email.trim().toLowerCase();
    if (typeof parsed.company === "string") honeypot = parsed.company;
  } catch {
    send(res, 400, { ok: false, error: "Could not read the request." });
    return;
  }

  // Honeypot: real people never fill a hidden field. Pretend it worked so bots
  // do not learn they were detected, and do not bother EmailOctopus.
  if (honeypot) {
    send(res, 200, { ok: true });
    return;
  }

  if (!EMAIL_RE.test(email)) {
    send(res, 400, { ok: false, error: "Please enter a valid email address." });
    return;
  }

  try {
    // EmailOctopus uses HTTP Basic auth: the API key as the username, any
    // string as the password.
    const upstream = await fetch(`${EMAILOCTOPUS_API}/lists/${listId}/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, status: "pending" }),
    });

    if (upstream.ok) {
      // "pending" (double opt-in) — the visitor must confirm in their inbox.
      send(res, 200, { ok: true });
      return;
    }

    const detail = (await upstream.json().catch(() => null)) as {
      title?: string;
      detail?: string;
    } | null;

    // EmailOctopus returns 400 "Subscriber Exists" for a duplicate address.
    // For the visitor that is good news, not an error.
    if (upstream.status === 400 && detail?.title === "Subscriber Exists") {
      send(res, 200, { ok: true, alreadySubscribed: true });
      return;
    }

    console.error("EmailOctopus error", upstream.status, detail?.title, detail?.detail);
    send(res, 502, { ok: false, error: "We could not subscribe you just now. Please try again." });
  } catch (err) {
    console.error("Newsletter request failed", err);
    send(res, 502, { ok: false, error: "We could not reach the newsletter service. Please try again." });
  }
}
