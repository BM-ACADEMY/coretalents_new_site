import { useCtForm } from '../lib/useCtForm';

// Field `name` values map 1:1 onto the n8n workflow and the Google Sheet columns. Do not rename.

function Field({ id, name, label, hint, err, invalid, as = 'input', children, ...rest }) {
  const Tag = as;
  return (
    <div className={invalid?.[name] ? 'field invalid' : 'field'}>
      <label htmlFor={id}>{label}{hint && <> <span className="hint">{hint}</span></>}</label>
      {children || <Tag id={id} name={name} {...rest} />}
      {err && <div className="err">{err}</div>}
    </div>
  );
}

function FormShell({ form, children, button, note }) {
  const { msg, sending, onSubmit, onInput } = form;
  return (
    <form className="form-card" noValidate onSubmit={onSubmit} onInput={onInput}>
      <div className={msg ? `form-msg ${msg.kind}` : 'form-msg'}>{msg?.text}</div>
      <div className="hp"><label>Leave this empty<input type="text" name="website_url" tabIndex={-1} autoComplete="off" /></label></div>
      {children}
      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={sending}>
        {sending ? <><span className="spinner" aria-hidden="true" />Sending...</> : button}
      </button>
      <p className="form-note">{note}</p>
    </form>
  );
}

const LANGS = ['Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Hindi', 'English'];

export function RequirementForm() {
  const form = useCtForm('requirement', 'Thank you. We will come back with a written proposal and firm rates within 24 hours.');
  const v = form.invalid;
  return (
    <FormShell form={form} button="Send requirement"
      note="We reply with a written proposal and firm rates within 24 hours. No fee until a candidate joins.">
      <div className="field-row">
        <Field invalid={v} id="rf-company" name="company_name" label="Company name *" required err="Please enter your company name" />
        <Field invalid={v} id="rf-contact" name="contact_name" label="Your name *" required err="Please enter your name" />
      </div>
      <div className="field-row">
        <Field invalid={v} id="rf-phone" name="phone" label="Phone / WhatsApp *" data-phone="1" required inputMode="numeric" placeholder="10-digit mobile" err="Enter a valid 10-digit mobile number" />
        <Field invalid={v} id="rf-email" name="email" type="email" label="Email *" required err="Enter a valid email address" />
      </div>
      <div className="field-row">
        <Field invalid={v} id="rf-role" name="role" label="Role / designation *" required placeholder="e.g. Telecaller, Ops Manager" err="Please enter the role" />
        <Field invalid={v} id="rf-pos" name="positions" type="number" min="1" label="Number of positions *" required err="Please enter how many positions" />
      </div>
      <Field invalid={v} id="rf-exp" name="experience" label="Experience and qualification" hint="optional" placeholder="e.g. Freshers, or 2+ years in voice process" />
      <div className="field">
        <label>Language requirement</label>
        <div className="checks">
          {LANGS.map((l) => <label key={l}><input type="checkbox" name="languages" value={l} /> {l}</label>)}
        </div>
      </div>
      <div className="field-row">
        <Field invalid={v} id="rf-smin" name="salary_min" type="number" label="Salary offered - from (Rs./month) *" required err="Enter the lower end of the band" />
        <Field invalid={v} id="rf-smax" name="salary_max" type="number" label="Salary offered - to (Rs./month) *" required err="Enter the upper end of the band" />
      </div>
      <div className="field-row">
        <Field invalid={v} id="rf-loc" name="location" label="Location *" required placeholder="City and area" err="Please enter the work location" />
        <Field invalid={v} id="rf-shift" name="shift" label="Shift">
          <select id="rf-shift" name="shift" defaultValue="">
            <option value="">Select</option><option>Day</option><option>Night</option><option>Rotational</option>
          </select>
        </Field>
      </div>
      <Field invalid={v} id="rf-join" name="target_joining" label="When do you need them to join?">
        {/* exact option text is matched by the n8n lead-scoring code */}
        <select id="rf-join" name="target_joining" defaultValue="">
          <option value="">Select</option><option>Immediately</option><option>Within 2 weeks</option>
          <option>Within 1 month</option><option>Within 2-3 months</option><option>Planning ahead</option>
        </select>
      </Field>
      <Field invalid={v} id="rf-notes" name="notes" as="textarea" label="Anything else we should know?" hint="optional" />
    </FormShell>
  );
}

export function EmpanelmentForm() {
  const form = useCtForm('empanelment', 'Thank you. We will email the MoU and our rate card shortly.');
  const v = form.invalid;
  return (
    <FormShell form={form} button="Send me the MoU"
      note="No fee, no obligation, and we will not add you to a mailing list.">
      <div className="field-row">
        <Field invalid={v} id="ef-company" name="company_name" label="Company name *" required err="Please enter your company name" />
        <Field invalid={v} id="ef-contact" name="contact_name" label="Your name and designation *" required err="Please enter your name" />
      </div>
      <div className="field-row">
        <Field invalid={v} id="ef-phone" name="phone" label="Phone / WhatsApp *" data-phone="1" required inputMode="numeric" err="Enter a valid 10-digit mobile number" />
        <Field invalid={v} id="ef-email" name="email" type="email" label="Email *" required err="Enter a valid email address" />
      </div>
      <div className="field-row">
        <Field invalid={v} id="ef-city" name="city" label="City *" required err="Please enter your city" />
        <Field invalid={v} id="ef-ind" name="industry" label="Industry" placeholder="e.g. BPO, manufacturing, hospitality" />
      </div>
      <Field invalid={v} id="ef-roles" name="typical_roles" label="Roles you typically hire for" placeholder="e.g. voice process, accounts, field sales" />
      <Field invalid={v} id="ef-vol" name="hires_per_year" label="Approximate hires per year">
        <select id="ef-vol" name="hires_per_year" defaultValue="">
          <option value="">Select</option><option>1-5</option><option>6-20</option><option>21-50</option><option>50+</option>
        </select>
      </Field>
      <Field invalid={v} id="ef-notes" name="notes" as="textarea" label="Anything we should know?" hint="optional" />
    </FormShell>
  );
}
