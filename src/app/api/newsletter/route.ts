import { NextRequest, NextResponse } from "next/server";
import { subscriptionSchema, subscribe, rateLimited } from "@/lib/newsletter";
export async function POST(req: NextRequest) {
  const reply = (status: number, message: string) =>
    NextResponse.json(
      { message },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  const origin = req.headers.get("origin");
  const expectedOrigin = `${req.nextUrl.protocol}//${req.headers.get("host")}`;
  if (origin !== expectedOrigin)
    return reply(403, "Please submit the form from this website.");
  if (Number(req.headers.get("content-length") || 0) > 4096)
    return reply(413, "The request is too large.");
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip))
    return reply(
      429,
      "Too many attempts. Please wait ten minutes and try again.",
    );
  let input: unknown;
  try {
    const raw = await req.text();
    if (raw.length > 4096) return reply(413, "The request is too large.");
    input = JSON.parse(raw);
  } catch {
    return reply(400, "Please submit a valid email address and consent.");
  }
  const parsed = subscriptionSchema.safeParse(input);
  if (!parsed.success)
    return reply(
      400,
      "Enter a valid email address and agree to receive updates.",
    );
  const { email, website, started } = parsed.data;
  if (website || Date.now() - started < 1500 || started > Date.now())
    return reply(400, "We could not accept this submission. Please try again.");
  const result = await subscribe(email.trim().toLowerCase());
  return reply(result.status, result.message);
}
