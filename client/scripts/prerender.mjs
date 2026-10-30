// Build step: writes one real HTML file per route, so crawlers and link previews
// (Google, WhatsApp, LinkedIn) see each page's title, description, canonical and text
// in the page source. The browser app still boots exactly as before.
//   /                       -> dist/index.html
//   /services               -> dist/services.html
//   /services/bulk-hiring   -> dist/services/bulk-hiring.html
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { render, routes } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const template = await readFile(resolve(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('index.html: <div id="root"></div> not found');

// React puts <title>, <meta> and <link> elements first in its output. Take the page's own
// head tags (title, meta, canonical) from there; the logo preload is already in index.html.
const HOIST = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;
function split(html) {
  const head = [];
  let rest = html;
  for (let m = rest.match(HOIST); m; m = rest.match(HOIST)) {
    const tag = m[0];
    if (!/^<link\b/.test(tag) || /rel="canonical"/.test(tag)) {
      // data-ssr marks tags that main.jsx removes before React takes over, so they are never doubled
      head.push(tag.replace(/^<(title|meta|link)\b/, '<$1 data-ssr=""'));
    }
    rest = rest.slice(tag.length);
  }
  return { head: head.join('\n'), body: rest };
}

const seen = new Set();
for (const route of routes) {
  const { head, body } = split(render(route));
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1];
  if (!title) throw new Error(`${route}: no <title> rendered`);
  if (!/name="description"/.test(head)) throw new Error(`${route}: no meta description rendered`);
  if (seen.has(title)) throw new Error(`${route}: duplicate title "${title}"`);
  seen.add(title);

  const html = template
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const file = route === '/' ? resolve(dist, 'index.html') : resolve(dist, `${route.slice(1)}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages.`);
