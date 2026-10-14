import { z } from "zod";
export const subscriptionSchema = z.object({
  email: z.email().max(254),
  consent: z.literal(true),
  website: z.string().max(200).default(""),
  started: z.number().finite(),
});
export type NewsletterResult = { status: number; message: string };
type Env = Record<string, string | undefined>;
export function configured(env: Env = process.env) {
  return !!(
    env.BREVO_API_KEY &&
    env.BREVO_LIST_ID &&
    env.BREVO_DOI_TEMPLATE_ID &&
    env.BREVO_REDIRECT_URL
  );
}
export async function subscribe(
  email: string,
  env: Env = process.env,
  request: typeof fetch = fetch,
): Promise<NewsletterResult> {
  if (!configured(env))
    return {
      status: 503,
      message:
        "Subscriptions are not available yet. Please check back when the newsletter is connected.",
    };
  const listId = Number(env.BREVO_LIST_ID),
    templateId = Number(env.BREVO_DOI_TEMPLATE_ID);
  if (
    !Number.isInteger(listId) ||
    listId < 1 ||
    !Number.isInteger(templateId) ||
    templateId < 1 ||
    !env.BREVO_REDIRECT_URL?.startsWith("https://")
  )
    return {
      status: 503,
      message:
        "Newsletter configuration needs attention. Please try again later.",
    };
  const headers = {
    "api-key": env.BREVO_API_KEY!,
    "Content-Type": "application/json",
  };
  const accepted = {
    status: 200,
    message:
      "If this address is not already subscribed, check your inbox to confirm. You’re all set if you’ve already joined.",
  };
  try {
    const contact = await request(
      `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
      { headers, signal: AbortSignal.timeout(8000) },
    );
    if (contact.ok) {
      const data = await contact.json();
      if (data.listIds?.includes(listId) && !data.emailBlacklisted)
        return accepted;
    } else if (contact.status !== 404)
      return {
        status: 502,
        message:
          "The newsletter service is temporarily unavailable. Please try again later.",
      };
    const res = await request(
      "https://api.brevo.com/v3/contacts/doubleOptinConfirmation",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          includeListIds: [listId],
          templateId,
          redirectionUrl: env.BREVO_REDIRECT_URL,
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (res.ok) return accepted;
    return {
      status: 502,
      message:
        "We could not send the confirmation email. Please try again later.",
    };
  } catch {
    return {
      status: 502,
      message:
        "The newsletter service could not be reached. Please try again later.",
    };
  }
}
const attempts = new Map<string, { count: number; until: number }>();
export function rateLimited(key: string, now = Date.now()) {
  for (const [k, v] of attempts) if (v.until < now) attempts.delete(k);
  const record = attempts.get(key);
  if (record) {
    record.count++;
    return record.count > 5;
  }
  if (attempts.size >= 10000) return true;
  attempts.set(key, { count: 1, until: now + 600000 });
  return false;
}
