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
  assert.match(html, /<html[^>]*lang="en"[^>]*dir="ltr"/);
  assert.match(html, /<title>Klil Israeli \| Motion Designer &amp; Director<\/title>/);
  assert.match(html, /Every frame/);
  assert.match(html, /Selected projects/);
  assert.match(html, /SHOWREEL/);
  assert.match(html, /Wix Studio/);
  assert.match(html, /Cut to Beat|קאט לביט/);
  assert.doesNotMatch(html, /Vertical Pressure|לחץ אנכי/);
  assert.doesNotMatch(html, /DIRECTION · DESIGN · MOTION|Pause on a name|Behance/);
  assert.match(html, /brand-carousel/);
  assert.match(html, /בנק הפועלים/);
  assert.doesNotMatch(html, /LIGHTRICKS/i);
  assert.match(html, />About</);
  assert.match(html, /Language/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders direct contact and project brief routes", async () => {
  const contactResponse = await render("/contact");
  assert.equal(contactResponse.status, 200);
  const contactHtml = await contactResponse.text();
  assert.match(contactHtml, /mailto:klilisraeli%40gmail\.com|mailto:klilisraeli@gmail\.com/);
  assert.match(contactHtml, /Open the project form/);
  assert.match(contactHtml, /tel:\+972501234567/);

  const briefResponse = await render("/contact/brief");
  assert.equal(briefResponse.status, 200);
  const briefHtml = await briefResponse.text();
  assert.match(briefHtml, /Project brief/);
  assert.doesNotMatch(briefHtml, /01 \/|02 \/|03 \/|04 \/|05 \/|06 \/|07 \/|Behance/);
  assert.match(briefHtml, /name="projectType"/);
  assert.match(briefHtml, /name="message"/);
});

test("server-renders project facts and case-study content", async () => {
  const response = await render("/projects/kinetic-field");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, />Field</);
  assert.match(html, />Client</);
  assert.match(html, />Service</);
  assert.match(html, />Year</);
  assert.match(html, /Wix Studio/);
  assert.match(html, /Momentum/);
  assert.match(html, /The challenge/);
  assert.match(html, /Next project/);
});
