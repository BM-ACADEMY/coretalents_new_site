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
