# Go-live checklist

Tick every line, with proof, before the Meta ads start or the site is announced. Kamar signs off the final line.

## 1. Accounts and setup

- [ ] WhatsApp number registered and approved, display name approved
- [ ] All templates in `docs/WHATSAPP_TEMPLATES.md` show Approved
- [ ] hello@coretalents.in works and is connected to the workflows
- [ ] CRM sheet is shared only with the people in the alert routing table
- [ ] Domain, SSL, hosting, backups and uptime monitoring are on
- [ ] Footer number, WhatsApp button and templates all show the same number
- [ ] No keys or passwords in the repo or its history

## 2. Test leads (use 3 of each, with real phone numbers owned by the team)

| Test | Expected | Pass |
| --- | --- | --- |
| Employer requirement form, HOT lead (role and seats given) | Saved to sheet with source and UTM; scored HOT; WhatsApp and email reply to the lead within 1 minute; alert to telecaller, sales manager and Kamar | [ ] |
| Employer requirement form, WARM lead (missing seats) | Saved; scored WARM; reply sent; alert sent | [ ] |
| Empanelment form | Saved; `empanelment_ack` sent | [ ] |
| Job-seeker form | Saved to the screening tab; `jobseeker_ack` sent; telecaller not alerted | [ ] |
| Meta Instant Form, employer | Same result as the website HOT lead, with source `Meta Ads` and the campaign and ad name | [ ] |
| Meta Instant Form, job seeker | Same result as the website job-seeker lead | [ ] |
| Number on the Do Not Call list | No message is sent | [ ] |

## 3. Failure tests

- [ ] Send a message to a number with no WhatsApp: the failure alert reaches Kamar and the developer
- [ ] Switch off the sheet connection briefly: the failure alert is raised and no lead is lost
- [ ] Submit the same lead twice: no repeat alert storm

## 4. Timed workflows

- [ ] Follow-up: a lead 3 days old gets exactly one draft or one template, not repeats
- [ ] Daily check-in at 8:00 am reaches Kamar
- [ ] Weekly report arrives Saturday 4:00 pm and Monday 8:30 am, with numbers that match the sheet
- [ ] Placements: day 3 and day 7 check-ins, invoice reminder at 7 days, guarantee alert 7 days before the end date by level (45, 60, 90), bulk second instalment on day 30

## 5. Tracking

- [ ] Meta Events Manager shows PageView, Lead and Contact events from the site
- [ ] A test lead from an ad shows the campaign and ad name in the sheet

## 6. Sign-off

- [ ] Telecaller can read and answer client replies (inbox works)
- [ ] Kamar has reviewed one full test lead from form to alert
- [ ] Date and name of sign-off:
