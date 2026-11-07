# WhatsApp templates

Last updated: 7 Nov 2026. These are drafts to submit to Meta. Meta approval takes 1 to 3 days. A message to someone who has not messaged us in the last 24 hours must use an approved template, so every business-started message below needs one.

## Rules for submitting

- Names are lowercase with underscores, exactly as in the table. Workflows refer to these names.
- Submit each one with sample values for every variable `{{1}}`, `{{2}}` and so on. Meta rejects templates without examples.
- Category: choose Utility for service messages and Marketing for follow-ups that ask for new business. Meta may reclassify a template, and marketing messages cost more. Check Meta's current price list before launch.
- Do not put promotional wording, prices or discounts in utility templates.
- Write in English first. Tamil versions are to be added for job seekers and candidates (TODO). Keep the same name with a `_ta` suffix.
- Change the status column when Meta approves or rejects a template. If one is rejected, write the reason here.
- Never edit an approved template in place. Create a new version, for example `client_enquiry_ack_v2`, and switch the workflow.

## Templates

| # | Name | Category | Variables | Sent to | Used in | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `client_enquiry_ack` | Utility | name, role | Employer | W1, W5 | Not submitted |
| 2 | `jobseeker_ack` | Utility | name, role or interest | Job seeker | W1, W5 | Not submitted |
| 3 | `empanelment_ack` | Utility | contact name, company | Employer | W1 | Not submitted |
| 4 | `proposal_sent` | Utility | name, role, email | Employer | Manual or W2 | Not submitted |
| 5 | `followup_day3` | Marketing | name | Employer | W2 | Not submitted |
| 6 | `followup_day7` | Marketing | name | Employer | W2 | Not submitted |
| 7 | `candidate_checkin_day3` | Utility | name, company | Candidate | W4 | Not submitted |
| 8 | `candidate_checkin_day7` | Utility | name, company | Candidate | W4 | Not submitted |
| 9 | `client_review_request` | Utility | name, review link | Employer | W4 | Not submitted |
| 10 | `invoice_reminder` | Utility | name, invoice no, amount, due date | Employer | W4 | Not submitted |
| 11 | `guarantee_alert` | Utility | candidate, client, end date | Staff | W4 | Not submitted |
| 12 | `new_lead_alert` | Utility | type, name, company, seats, role, phone | Staff | W1, W5 | Not submitted |
| 13 | `followup_draft_alert` | Utility | name, company, suggested message | Staff | W2 | Not submitted |

Templates 11 to 13 go to our own staff. They are only needed as templates if staff have not messaged the number in the last 24 hours. Decision D3 may move them to email.

## Draft text (English)

**1. `client_enquiry_ack`**

> Hello {{1}}, thank you for contacting CoreTalents about hiring for {{2}}. We have received your requirement. Our team will call you within 1 working day, and you will get a written proposal within 24 hours.
>
> CoreTalents, Puducherry

**2. `jobseeker_ack`**

> Hello {{1}}, thank you for registering with CoreTalents for {{2}}. We have received your details. Our team will contact you when there is a matching opening.
>
> CoreTalents, Puducherry

Add "There is no fee from you." only after Kamar confirms it is true for every role.

**3. `empanelment_ack`**

> Hello {{1}}, thank you for registering {{2}} with CoreTalents. Empanelment is free and has no obligation. We will contact you when we have candidates that match your hiring needs.
>
> CoreTalents, Puducherry

**4. `proposal_sent`**

> Hello {{1}}, we have emailed our written proposal for {{2}} to {{3}}. Please read it and reply here to confirm or to ask any question.
>
> CoreTalents, Puducherry

**5. `followup_day3`**

> Hello {{1}}, following up on our earlier message. Are you hiring for any role this month? Reply with the role and the number of seats and we will send a written proposal within 24 hours.
>
> CoreTalents, Puducherry

**6. `followup_day7`**

> Hello {{1}}, we will check with you again next month. If a hiring need comes up before that, just reply to this message and our team will call you.
>
> CoreTalents, Puducherry

**7. `candidate_checkin_day3`**

> Hello {{1}}, congratulations on joining {{2}}. How is your first week going? Reply 1 if all is well, or 2 if you need help from us.
>
> CoreTalents, Puducherry

**8. `candidate_checkin_day7`**

> Hello {{1}}, it has been a week since you joined {{2}}. We hope you are settling in. Reply 1 if all is well, or 2 if you need help from us.
>
> CoreTalents, Puducherry

**9. `client_review_request`**

> Hello {{1}}, thank you for hiring through CoreTalents. If you are happy with our service, please share a short review here: {{2}}. It takes one minute.
>
> CoreTalents, Puducherry

**10. `invoice_reminder`**

> Hello {{1}}, this is a reminder that invoice {{2}} for Rs {{3}} is due on {{4}}. Please share the payment update. Thank you.
>
> CoreTalents, Puducherry

**11. `guarantee_alert`**

> Guarantee alert: the guarantee for {{1}} placed with {{2}} ends on {{3}}.

**12. `new_lead_alert`**

> New {{1}} lead: {{2}}, {{3}}, {{4}} seats for {{5}}. Phone {{6}}. Please call within 15 minutes.

**13. `followup_draft_alert`**

> Follow-up needed for {{1}} ({{2}}). Suggested message: {{3}}

## Not templates

Replies to someone who messaged us in the last 24 hours do not need a template. If the telecaller must answer client replies, decision D1 in `docs/TASKS.md` (an inbox for the automation number) must be settled first.
