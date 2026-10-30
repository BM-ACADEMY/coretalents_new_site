# CoreTalents — React client

Original static site (`CoreTalents-Website-Package/coretalents/site/`) oda React (Vite) version. Design, text, SEO tags, form field names ellaam original maadhiriye.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # output -> dist/
npm run preview    # dist-a local-la test panna
```

## Text maathanum-na

**`src/data/content.js`** mattum edit pannu. Phone, WhatsApp, CIN, GSTIN, services, roles, locations, articles ellaam idhula dhaan irukku. Ellaa pages-um automatic-aa update aagum.

## Forms

`.env` (copy from `.env.example`):

| Var | Meaning |
|---|---|
| `VITE_API_URL` | Express server URL, e.g. `https://coretalents-api.onrender.com` |
| `VITE_LIVE` | `false` = test mode (console-la log mattum). Backend ready aana appuram `true` |

Forms `POST {VITE_API_URL}/api/leads` pannum. Field names (`company_name`, `target_joining`...) n8n workflow-kku match aaganum, **rename pannaadha**.

## Structure

```
src/
  data/content.js        ALL TEXT
  styles/style.css       original stylesheet, unchanged
  components/
    Layout.jsx           header + footer + WhatsApp float + mobile bar, scroll-to-top
    Header.jsx Footer.jsx
    Seo.jsx              title, description, canonical, JSON-LD per page
    Blocks.jsx           CtaBand, StatsBand, Table, Breadcrumb, ProcessGrid, PageHead, Card, Tags
    Forms.jsx            RequirementForm, EmpanelmentForm
  lib/
    useCtForm.js         validation, honeypot, submit, UTM, GA4 event
    api.js track.js links.js
  pages/                 one file per page / page template
  App.jsx                routes
public/
  _redirects             Netlify SPA fix (deep links refresh panna 404 varaama)
  sitemap.xml robots.txt favicon.svg
```

## Routes

Clean URLs — `.html` illa: `/services/bulk-hiring`, `/roles/it-technology`, `/locations/chennai`, `/insights/<slug>`, `/pricing`, `/contact`... Unknown URL -> 404 page (`noindex`).

Puthu service / role / location / article add panna `content.js`-la object add pannu, appuram `public/sitemap.xml`-la URL add pannu.

## SEO prerender (build output)

`npm run build` now does three steps: normal Vite build, a server render of every route, and `scripts/prerender.mjs`, which writes one HTML file per page with its own title, meta description, canonical, JSON-LD and page text:

```
dist/index.html                     -> /
dist/services.html                  -> /services
dist/services/bulk-hiring.html      -> /services/bulk-hiring
...                                 (33 pages, list comes from content.js)
```

So "View Page Source" shows the real tags, and Google / WhatsApp / LinkedIn read them without running JavaScript. In the browser the app boots exactly as before (`main.jsx` removes the static head tags first so nothing is doubled).

- Upload the **whole `dist` folder** (including `.htaccess` and the `services/`, `roles/`, `locations/`, `insights/` folders).
- **Vercel / Netlify:** works as is (`cleanUrls` in `vercel.json`; Netlify serves `services.html` at `/services` by default).
- **Apache / cPanel / Hostinger:** `dist/.htaccess` handles it (needs `mod_rewrite` and `AllowOverride All`).
- **nginx:** `try_files $uri $uri.html /index.html;`
- New page in `content.js` -> it is prerendered automatically on the next build. A new static route in `App.jsx` must also be added to `STATIC` in `src/entry-server.jsx`.
- `npm run build:spa` = old build without prerendering (fallback only).
- Check after deploy: open any page -> right-click -> **View page source** -> the `<title>` must be the page's own title.

## Deploy (Vercel)

`vercel.json` already ready: SPA rewrite (deep link refresh 404 aagaadhu), asset caching, security headers, pazhaya `.html` URLs-kku 301 redirect.

1. Code-a GitHub-la push pannu
2. vercel.com -> Add New -> Project -> repo select pannu
3. **Root Directory: `client`** (important - `coretalents-mern` illa)
4. Framework, build command, output ellaam `vercel.json`-la irundhu auto-aa edukkum
5. Settings -> Environment Variables: `VITE_API_URL`, `VITE_LIVE` (backend ready aana appuram)
6. Deploy -> Settings -> Domains-la `coretalents.in` add pannu

CLI-la: `npm i -g vercel` -> `cd client` -> `vercel --prod`

## Deploy (Netlify)

1. `npm run build`
2. `dist/` folder-a app.netlify.com/drop-la drag pannu
   (illa Git connect panni: build command `npm run build`, publish directory `dist`, base directory `client`)
3. Site settings -> Environment variables-la `VITE_API_URL`, `VITE_LIVE` set pannu (Git deploy-kku)

## GA4

`index.html`-la commented GA4 block irukku. Measurement ID potu uncomment pannu.
