# Workflows (n8n)

Last updated: 7 Nov 2026. Four workflows are built (status from the scope document of 7 Nov 2026) and wait only on the WhatsApp setup. One more is to be built. Business rules and recipients are in `docs/BUSINESS_RULES.md`. Template names are in `docs/WHATSAPP_TEMPLATES.md`.

Every workflow must: log what it did, handle errors by raising the failure alert, and never send a message to a number on the Do Not Call list.

| # | Workflow | Status |
| --- | --- | --- |
| W1 | Lead intake | Built, needs fixes for routing |
| W2 | Follow-up | Built, needs fixes |
| W3 | Reports | Built, needs a Saturday send |
| W4 | Placements | Built, needs rule checks |
| W5 | Meta lead ads intake | To build |

## W1. Lead intake

- **Trigger:** every form submit on the website (requirement form, empanelment form, job-seeker form).
- **Steps:** save the lead to the CRM sheet with source and UTM values, score it (HOT, WARM, COLD), send the lead a WhatsApp reply and an email, alert the right people.
- **Templates:** `client_enquiry_ack`, `jobseeker_ack`, `empanelment_ack`, `new_lead_alert`.
- **Recipients:** see the alert routing table in `docs/BUSINESS_RULES.md`. Employer leads alert the telecaller and the sales manager with a copy to Kamar.
- **Errors:** if the sheet save fails, stop and raise the failure alert. If the WhatsApp send fails, still save the lead and raise the alert.
- **Open:** a form lead has not messaged us first, so a plain message is not delivered. The client reply must use an approved template.

## W2. Follow-up

- **Trigger:** every hour.
- **Steps:** find leads that need a follow-up (no contact for 3 days, then 7 days), prepare a draft, and send it to the telecaller or auto-send the approved day 3 and day 7 template (decision D2).
- **Templates:** `followup_day3`, `followup_day7`, `followup_draft_alert`.
- **Fixes needed:** send all drafts, and stop repeat alerts for the same lead and stage.
- **Stop rule:** never send after a lead is marked Not hiring, Won or Do Not Call.

## W3. Reports

- **Trigger:** daily 8:00 am (check-in), Saturday 4:00 pm (weekly report), Monday 8:30 am (weekly report).
- **Recipients:** Kamar. The weekly report also goes to the sales manager.
- **Content:** leads by source, HOT count, calls made, conversations, proposals sent, joins, fees collected, overdue invoices, failed messages. Calls and conversations come from the telecaller log tab of the CRM sheet (decision D4).

## W4. Placements

- **Trigger:** daily 9:00 am.
- **Steps:** candidate check-in on day 3 and day 7 after joining, review request after payment, invoice reminder, guarantee alert.
- **Templates:** `candidate_checkin_day3`, `candidate_checkin_day7`, `client_review_request`, `invoice_reminder`, `guarantee_alert`.
- **Rules to check:** guarantee end date is joining date plus 45, 60 or 90 days by level; invoice due 7 days after joining; bulk second instalment due on day 30.

## W5. Meta lead ads intake (new)

- **Trigger:** a new lead from the Meta Instant Form (employer form or job-seeker form), using n8n's Facebook Lead Ads trigger.
- **Steps:** map the form fields into the same lead record as W1 with source `Meta Ads`, plus campaign and ad name; then run the same scoring, reply and alert steps as W1.
- **Employer form fields:** name, phone, company, city, role to hire, number of positions, when needed, language needed.
- **Job-seeker leads** go to the candidate screening tab and get `jobseeker_ack`. The telecaller does not call them.
- **Test:** 3 test leads must reach the sheet, get the reply, and alert the telecaller within 1 minute.
