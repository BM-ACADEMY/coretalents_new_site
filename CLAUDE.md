# Notes for AI coding assistants

This repo is the CoreTalents website and n8n automation. Read `README.md` and `docs/BUSINESS_RULES.md` before changing anything.

- Business rules (fees, guarantee periods, time limits, alert routing) live only in `docs/BUSINESS_RULES.md`. Do not invent or change them. If code and the doc disagree, ask Kamar.
- Every change must also update `docs/TASKS.md` and `CHANGELOG.md`, and any other doc it affects, in the same pull request.
- WhatsApp templates are approved by Meta. Never edit an approved template in place. Add a new version and update `docs/WHATSAPP_TEMPLATES.md`.
- Never commit secrets (`.env`, keys, tokens, n8n credentials, exports that contain them). Use `.env.example` with names only.
- Do not publish fee tables or discounts on the public website. Only the claims in the "Public claims" section of `docs/BUSINESS_RULES.md` may appear.
- Respect the Do Not Call list. Never message a number on it.
- Treat lead data as personal data. Do not log phone numbers or messages in public places.
- Run the tests and the checks in `docs/GO_LIVE_CHECKLIST.md` that apply to your change, and link proof in the pull request.
