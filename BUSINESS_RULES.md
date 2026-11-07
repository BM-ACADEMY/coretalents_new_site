# Business rules

Last updated: 7 Nov 2026. Owner: Kamar. Change a rule here first, then in code.

This file is internal. Do not publish fee tables, discounts or the guarantee rules on the public website. The website shows only what is approved in the "Public claims" section below.

## Brand facts

| Item | Value |
| --- | --- |
| Brand | CoreTalents, a division of Afra Ventures Private Limited |
| Tagline | Smart hiring that builds strong teams |
| Colours | Yellow #FFC700 and black |
| Address | No. 78, Lenin Street, Kosapalayam, Puducherry 605013 |
| CIN | U62011PY2026PTC009819 |
| GSTIN | 34ABGCA7083D1ZS |
| Email | hello@coretalents.in (confirm the mailbox exists) |
| Office hours | Monday to Saturday, 9:30 am to 6:30 pm |
| Phone and WhatsApp | One number everywhere (site, ads, templates). Approved: +91 99445 09441. The footer currently shows 94038 92971 and must be changed. **Open:** the WhatsApp automation number must be a number not used on the WhatsApp app (see `docs/TASKS.md`, decision D1) |
| Job-seeker platform | Velai Vaaippu. Confirm the domain: velaivaaipu.in or velaivaaipu.com. The footer link must match |

## Services

1. Recruitment and staffing
2. Bulk and volume hiring
3. Language-specific hiring (Telugu, Kannada, Malayalam, Hindi)
4. Campus and fresher hiring
5. Job promotion: sold through Velai Vaaippu at Rs 500 per opening. CoreTalents only refers to it

## Fees (internal, plus 18% GST)

| Level | Monthly gross | Fee per joined candidate | Guarantee |
| --- | --- | --- | --- |
| Entry | Up to Rs 20,000 | One month's gross, minimum Rs 8,000 | 45 days |
| Mid | Rs 20,001 to 50,000 | 10% of annual CTC | 60 days |
| Senior | Above Rs 50,000 | 12% of annual CTC, quoted per mandate | 90 days |

- **Payment:** within 7 days of joining. Bulk mandates (20 or more seats): 50% at joining and 50% on day 30.
- **Bulk discount:** 10% off at 20 to 49 seats, 15% off at 50 or more.
- **Language-specific roles:** plus 15% on the fee.
- **Guarantee:** one free replacement if the candidate leaves or is dismissed for performance or conduct within the guarantee period. It does not apply if the invoice is overdue or the role, salary or location changed.
- **Candidates are not charged.** Confirm for every role before any "no fee from you" claim is used in ads.

## Public claims (what the website may say)

- Pay only when a candidate joins. No fee for profiles, interviews or empanelment.
- Written proposal with firm rates within 24 hours.
- Counters (1400+ trained, 150+ placed, 12,700+ job seekers) show only after Kamar confirms the numbers are true.
- No client name, candidate story or new number is published without Kamar's written approval.

## Response times (SLAs)

| Event | Target |
| --- | --- |
| Automatic acknowledgement to the lead (WhatsApp and email) | Within 1 minute |
| Telecaller or sales manager calls a new employer lead | Within 15 minutes in office hours; 10:00 am next working day otherwise |
| Written proposal to the employer | Within 24 hours of a real requirement |
| First screened profiles | 48 to 72 hours after kick-off |
| Full first batch | 5 to 7 working days after kick-off |

## Lead sources

`Website - requirement form`, `Website - empanelment`, `Website - job seeker`, `Meta Ads`, `Telecaller (manual)`, `Referral`, `Velai Vaaippu`.

Every lead record stores: source, campaign and ad name (for Meta), UTM values for website traffic, date and time, and consent given.

## Lead scoring

A lead is **HOT** when it is an employer lead and any of these is true:

- It gives a role and a number of seats.
- It asks for 20 or more seats.
- It needs a language-specific role (Telugu, Kannada, Malayalam, Hindi).
- It needs people to join within 30 days.

Everything else is **WARM** (employer, missing detail) or **COLD** (job seeker, empanelment only, or incomplete). Job-seeker leads go to the screening list, not to the telecaller.

> TODO (Aakash): compare this with the scoring the workflow uses today and tell Kamar about any difference.

## Alert routing

| What | Goes to | How |
| --- | --- | --- |
| New employer lead (HOT or WARM) | Telecaller and sales manager, copy to Kamar | WhatsApp or email. Include company, role, seats, phone |
| Follow-up draft (leads needing a follow-up) | Telecaller | Draft message to send. Day 3 and day 7 approved templates can auto-send instead |
| New job-seeker lead | Candidate screening list (Lokeshwari) | Sheet tab and email |
| Daily check-in | Kamar | Daily 8:00 am |
| Weekly report | Kamar and the sales manager | Saturday 4:00 pm (before the weekly review) and Monday 8:30 am |
| Guarantee alert | Sales manager and Kamar | 7 days before the guarantee ends |
| Failed message or workflow error | Kamar and the developer | Immediately |

## Placements timing

- Candidate check-in: day 3 and day 7 after joining.
- Invoice reminder: due 7 days after joining. For bulk, the second instalment is due on day 30.
- Review request: after the client has paid.
- Guarantee end date: joining date plus 45, 60 or 90 days by level.

## Data and privacy

- Leads include personal data of candidates. Only the people named in the routing table may open the CRM sheet.
- Every form shows a short consent line and links to the privacy policy.
- A Do Not Call list is kept. A number on it is never called or messaged again.
- Do not copy lead data into personal accounts, chats or files.

## Decisions log

| Date | Decision |
| --- | --- |
| 7 Nov 2026 | Fee ranges, guarantee periods and payment terms approved |
| 7 Nov 2026 | Entry, mid and senior fees all payable within 7 days of joining |
| 7 Nov 2026 | One brand number: +91 99445 09441 (automation number open, D1) |
| 7 Nov 2026 | Job promotion is a Velai Vaaippu product at Rs 500 per opening |
| 7 Nov 2026 | Job-seeker ads run from the Velai Vaaippu Instagram; employer ads only from CoreTalents |
| 7 Nov 2026 | Candidate screening owner: Lokeshwari |
