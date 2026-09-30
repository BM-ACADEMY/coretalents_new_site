import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCtForm } from '../lib/useCtForm';

const EASE = [0.16, 1, 0.3, 1];
const CONFETTI_COLORS = ['#ffc700', '#12395e', '#ffdd55', '#1d6fc4', '#0b2238'];

// Burst of brand-coloured pieces from the centre of the card.
function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2 + Math.random() * 0.3;
    const r = Math.min(window.innerWidth * 0.45, 520) * (0.45 + Math.random() * 0.55);
    return {
      x: Math.cos(a) * r,
      y: Math.sin(a) * r - 60,
      rot: Math.random() * 540 - 270,
      w: 6 + Math.random() * 6,
      h: Math.random() > 0.5 ? 6 + Math.random() * 4 : 14 + Math.random() * 6,
      round: Math.random() > 0.6,
      c: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      d: Math.random() * 0.15,
    };
  }), []);
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.span key={i}
          style={{ width: p.w, height: p.h, background: p.c, borderRadius: p.round ? '50%' : 2 }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 180], opacity: [1, 1, 0], scale: 1, rotate: p.rot }}
          transition={{ duration: 1.6, delay: 0.25 + p.d, ease: [0.2, 0.8, 0.4, 1], times: [0, 0.45, 1] }} />
      ))}
    </div>
  );
}

// Shown over the form after a successful submit: ring + check draw in,
// confetti bursts, then the heading and text rise.
// Shown as a centred popup over the whole page. Esc, the backdrop or the
// button closes it.
function SuccessPanel({ title, text, onAgain }) {
  const reduce = useReducedMotion();
  const btn = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => btn.current?.focus({ preventScroll: true }), 1400);
    const esc = (e) => { if (e.key === 'Escape') onAgain(); };
    window.addEventListener('keydown', esc);
    return () => { clearTimeout(t); window.removeEventListener('keydown', esc); };
  }, [onAgain]);
  const rise = (d) => ({
    initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d, ease: EASE },
  });
  return createPortal(
    <motion.div className="form-success" role="dialog" aria-modal="true" aria-live="polite" aria-label={title}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
      onClick={(e) => { if (e.target === e.currentTarget) onAgain(); }}>
      {!reduce && <Confetti />}
      <motion.div className="fs-card" initial={{ opacity: 0, scale: 0.85, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: 'spring', stiffness: 240, damping: 22 }}>
      <motion.span className="fs-wash" aria-hidden="true"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.9, ease: EASE }} />
      <div className="fs-body">
        <motion.div className="fs-badge" initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}>
          <svg viewBox="0 0 96 96" aria-hidden="true">
            <motion.circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeInOut' }} />
            <motion.path d="M30 50 L43 62 L67 36" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.75, ease: 'easeOut' }} />
          </svg>
          <span className="fs-ping" aria-hidden="true" />
        </motion.div>
        <h3 className="fs-title">
          {title.split(' ').map((w, i) => (
            <span className="w" key={i}>
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.9 + i * 0.07, ease: EASE }}>{w}</motion.span>
            </span>
          ))}
        </h3>
        <motion.p className="fs-text" {...rise(1.15)}>{text}</motion.p>
        <motion.button ref={btn} type="button" className="btn btn-primary" onClick={onAgain} {...rise(1.3)}>
          Done
        </motion.button>
      </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

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

function FormShell({ form, children, button, note, doneTitle }) {
  const { msg, sending, done, successText, again, onSubmit, onInput } = form;
  return (
    <form className="form-card" noValidate onSubmit={onSubmit} onInput={onInput}>
      <AnimatePresence>
        {done && <SuccessPanel title={doneTitle} text={successText} onAgain={again} />}
      </AnimatePresence>
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
    <FormShell form={form} button="Send requirement" doneTitle="Requirement received!"
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
    <FormShell form={form} button="Send me the MoU" doneTitle="Your MoU is on its way!"
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
