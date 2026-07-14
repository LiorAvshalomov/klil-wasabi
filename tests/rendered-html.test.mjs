import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished bilingual portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>כליל ישראלי \| Motion Designer &amp; Director<\/title>/);
  assert.match(html, /כל פריים/);
  assert.match(html, /עבודות נבחרות/);
  assert.match(html, /SHOWREEL/);
  assert.match(html, /Wix Studio/);
  assert.match(html, /בחירת שפה/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders project facts and case-study content", async () => {
  const response = await render("/projects/kinetic-field");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, />תחום</);
  assert.match(html, />לקוח</);
  assert.match(html, />שירות</);
  assert.match(html, />שנה</);
  assert.match(html, /Wix Studio/);
  assert.match(html, /תנופה/);
  assert.match(html, /האתגר/);
  assert.match(html, /הפרויקט הבא/);
});
