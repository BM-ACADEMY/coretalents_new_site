# Tasks

Last updated: 10 Nov 2026. Update this file in every pull request. Status: `[ ]` open, `[x]` done. Put the proof link after each finished task.

Go-live is blocked until section A items 1 to 3 are done and the go-live checklist passes (`docs/GO_LIVE_CHECKLIST.md`). Meta ads must not start until a test lead receives the automatic reply.

## Decisions needed

| ID | Decision | Suggested | Owner |
| --- | --- | --- | --- |
| D1 | WhatsApp automation needs a number not used on the WhatsApp app. Which number is public? | Make the new number the single public number on site, ads and templates. Ask Aakash whether the telecaller can read and answer replies for it (inbox), because an automation-only number has none | Kamar |
| D2 | Where do follow-up drafts go? | To the telecaller, or auto-send approved day 3 and day 7 templates | Kamar |
| D3 | Do internal alerts use WhatsApp templates or email? | Email for internal alerts, WhatsApp for clients and candidates, to avoid template limits | Kamar |
| D4 | One tracker: the CRM Google Sheet. The telecaller call log becomes a tab in it | Yes | Kamar |
| D5 | Domain of the job platform: velaivaaipu.in or velaivaaipu.com | Confirm and fix the footer link | Kamar |
| D6 | Office address (SEO-06): 'No. 78, Lenin Street, Kosapalayam – 605013' (footer/contact, `SITE.address`) or 'Lenin Street, Kuyavarpalayam – 605008' (schema in `Seo.jsx` + Puducherry page)? | Pick one; it must match the Google Business Profile exactly | Kamar |

## A. Client side (Kamar's team)

1. [ ] **New SIM** for WhatsApp automation. In Afra Ventures' name, always on, no WhatsApp installed on it. Owner: sales manager. Due: Mon 9 Nov
2. [ ] **Meta Business registration and verification** for Afra Ventures. Needed for ads and for WhatsApp. Owner: Babila. Start: Mon 9 Nov
3. [ ] **WhatsApp templates** submitted to Meta from `docs/WHATSAPP_TEMPLATES.md` (Meta approval takes 1 to 3 days). Owner: Babila. Due: Tue 10 Nov
4. [ ] **Google Sheet "CoreTalents CRM"** and Gmail access given to the developer. Create hello@coretalents.in if it does not exist. Owner: Kamar. Due: Mon 9 Nov
5. [ ] **Google Business Profile** for CoreTalents, then the Google review link. Owner: Babila. Due: Mon 16 Nov
6. [ ] **Ownership** of GitHub, domain, hosting, n8n and Meta accounts moved to Afra Ventures accounts. Owner: Kamar
7. [ ] **Employer proof lines** and counter numbers approved in writing. Owner: Kamar. Due: Thu 12 Nov
8. [ ] **CRM sheet column list** shared so the telecaller call log can be added as a tab. Owner: Aakash

## B. Developer (Aakash)

### Needed for go-live

1. [ ] Connect the new WhatsApp number and approved templates in all workflows
2. [ ] Follow-up workflow: send all drafts, stop repeat alerts, route drafts per D2
3. [ ] Failure alert to Kamar and the developer when any message or workflow fails
4. [ ] Route alerts per `docs/BUSINESS_RULES.md` (telecaller and sales manager get new-lead alerts, not only the owner)
5. [ ] Weekly report: add a Saturday 4:00 pm send, keep Monday 8:30 am
6. [ ] Check lead scoring against the HOT rule in `docs/BUSINESS_RULES.md`
7. [ ] Placements: guarantee alert uses 45, 60 or 90 days by level; invoice reminder 7 days after joining; bulk second instalment on day 30
8. [ ] Host the website and server, connect coretalents.in, SSL on, uptime monitoring on, backups on
9. [ ] Footer phone number replaced everywhere, and the WhatsApp button uses the same number. Due: Mon 9 Nov
10. [ ] Confirm what coretalents.in shows today, and that every task here applies to the new site

### For the Meta ads (before Mon 16 Nov)

1. [ ] New workflow W5: Meta Instant Form leads go through the same intake as the website form (see `docs/WORKFLOWS.md`)
2. [ ] Meta Pixel and Conversions API installed. Due: Wed 11 Nov
3. [ ] Lead event on the requirement and empanelment forms, Contact event on the WhatsApp button. Due: Wed 11 Nov
4. [ ] Every form submission saved with page and UTM source. Due: Wed 11 Nov
5. [ ] Landing page `/hire` for ads: pay-only-on-joining message, three proof points, requirement form above the fold, loads in under 3 seconds on mobile. Due: Fri 13 Nov
6. [ ] Thank-you page after each form: "We will call you within 1 working day. Written proposal within 24 hours." Due: Fri 13 Nov
7. [ ] Counters render on mobile; employer proof lines added after approval. Due: Fri 13 Nov
8. [ ] Privacy policy and terms cover lead forms and candidate data; consent line on every form. Due: Mon 16 Nov
9. [ ] Job Promotion page says job reels are sold through Velai Vaaippu at Rs 500 per opening. Remove Rs 999 and Rs 2,499 anywhere. Due: Fri 13 Nov
10. [ ] Free job-listing and empanelment link in the header. Due: Mon 16 Nov

### Housekeeping

1. [ ] Code is pushed to GitHub and the repo is private; no copy lives only in a Downloads folder
2. [ ] No keys, tokens or passwords in the repo (check history too); `.env.example` lists names only
3. [ ] README sections marked TODO are filled in
4. [ ] Access to the CRM sheet limited to the people in the routing table

## C. SEO (from the site audit of 26 Oct 2026)

1. [ ] **SEO-06 Office address (NAP).** After D6 is decided, use the one address in `client/src/data/content.js` (`SITE.address` and the Puducherry page text) and in `ORG_SCHEMA` / `LOCAL_SCHEMA` in `client/src/components/Seo.jsx`. Owner: Aakash, after Kamar confirms
2. [ ] **SEO-07 WhatsApp number.** `SITE.whatsapp` in `client/src/data/content.js` has a CONFIRM note (919944509441 vs 9944940051 in the proposal PDF). Set the confirmed number (see D1) and remove the note. Owner: Aakash, after Kamar confirms
3. [x] **SEO-08 Noindex the 6 placeholder Insights articles.** Pages that show "Article to be written" now output `<meta name="robots" content="noindex">`, and their 6 URLs are removed from `client/public/sitemap.xml`. When an article is written, add it to `ARTICLE_BODIES` (noindex goes away by itself) and add its URL back to the sitemap. Branch: `seo-updates`

## Ownership (fill in)

| Item | Owner account | Recovery contact |
| --- | --- | --- |
| GitHub repository | | |
| Domain and DNS | | |
| Hosting and database | | |
| n8n | | |
| Meta Business portfolio | | |
| WhatsApp Business account | | |
| Google Workspace | | |
