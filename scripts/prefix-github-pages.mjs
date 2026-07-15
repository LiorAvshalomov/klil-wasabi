import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const prefix = "/klil-wasabi";
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt", ".xml"]);

async function rewriteDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return rewriteDirectory(path);
      if (!textExtensions.has(extname(entry.name))) return;

      const source = await readFile(path, "utf8");
      const rewritten = source
        .replaceAll('"/brand/', `"${prefix}/brand/`)
        .replaceAll("'/brand/", `'${prefix}/brand/`)
        .replaceAll('"/media/', `"${prefix}/media/`)
        .replaceAll("'/media/", `'${prefix}/media/`)
        .replaceAll('url("/fonts/', `url("${prefix}/fonts/`)
        .replaceAll("url('/fonts/", `url('${prefix}/fonts/`)
        .replaceAll("url(/fonts/", `url(${prefix}/fonts/`)
        .replaceAll('url("/brand/', `url("${prefix}/brand/`)
        .replaceAll("url('/brand/", `url('${prefix}/brand/`)
        .replaceAll("url(/brand/", `url(${prefix}/brand/`);

      if (rewritten !== source) await writeFile(path, rewritten);
    }),
  );
}

await rewriteDirectory(root);
