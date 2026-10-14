import { test } from "node:test";
import assert from "node:assert/strict";
import {
  subscribe,
  subscriptionSchema,
  rateLimited,
} from "../src/lib/newsletter";
const env = {
  BREVO_API_KEY: "test-key",
  BREVO_LIST_ID: "1",
  BREVO_DOI_TEMPLATE_ID: "2",
  BREVO_REDIRECT_URL: "https://example.com/confirmed",
};
test("missing credentials do not claim success", async () => {
  assert.equal((await subscribe("test@example.com", {})).status, 503);
});
test("invalid email or missing consent rejected", () => {
  assert(
    !subscriptionSchema.safeParse({ email: "bad", consent: true, started: 0 })
      .success,
  );
  assert(
    !subscriptionSchema.safeParse({
      email: "test@example.com",
      consent: false,
      started: 0,
    }).success,
  );
});
test("provider rejection and network failure return an error", async () => {
  const reject = (async () =>
    new Response("{}", { status: 500 })) as typeof fetch;
  assert.equal((await subscribe("test@example.com", env, reject)).status, 502);
  const offline = (async () => {
    throw new Error("offline");
  }) as typeof fetch;
  assert.equal((await subscribe("test@example.com", env, offline)).status, 502);
});
test("duplicate confirmed subscription does not send another confirmation", async () => {
  let calls = 0;
  const request = (async () => {
    calls++;
    return new Response(
      JSON.stringify({ listIds: [1], emailBlacklisted: false }),
      { status: 200 },
    );
  }) as typeof fetch;
  assert.equal((await subscribe("test@example.com", env, request)).status, 200);
  assert.equal(calls, 1);
});
test("new subscription sends a double opt-in request", async () => {
  let calls = 0;
  const request = (async (url, init) => {
    calls++;
    if (calls === 1) return new Response("{}", { status: 404 });
    assert(String(url).endsWith("/doubleOptinConfirmation"));
    assert.deepEqual(JSON.parse(String(init?.body)).includeListIds, [1]);
    return new Response(null, { status: 201 });
  }) as typeof fetch;
  assert.equal((await subscribe("test@example.com", env, request)).status, 200);
  assert.equal(calls, 2);
});
test("rate limiter limits repeated attempts and expires", () => {
  for (let i = 0; i < 5; i++) assert.equal(rateLimited("test", 1000), false);
  assert.equal(rateLimited("test", 1000), true);
  assert.equal(rateLimited("test", 601001), false);
});
