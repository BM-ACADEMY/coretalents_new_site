import { useState } from 'react';
import { sendLead } from './api';
import { track, getUtm } from './track';

// Shared form logic for the requirement and empanelment forms.
// Field `name` attributes must not change - the n8n workflow depends on them.
export function useCtForm(formType, successText) {
  const [invalid, setInvalid] = useState({});
  const [msg, setMsg] = useState(null); // { kind: 'ok' | 'err', text }
  const [sending, setSending] = useState(false);

  function validate(form) {
    const bad = {};
    form.querySelectorAll('.field').forEach((field) => {
      const input = field.querySelector('input,select,textarea');
      if (!input || input.type === 'checkbox') return;
      const v = input.value.trim();
      if (input.required && !v) bad[input.name] = true;
      else if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) bad[input.name] = true;
      else if (input.dataset.phone && v && !/^[6-9]\d{9}$/.test(v.replace(/\D/g, '').slice(-10))) bad[input.name] = true;
    });
    return bad;
  }

  function collect(form) {
    const out = {};
    Array.prototype.forEach.call(form.elements, (el) => {
      if (!el.name || el.name === 'website_url') return;
      if (el.type === 'checkbox') {
        if (el.checked) { out[el.name] = out[el.name] || []; out[el.name].push(el.value); }
      } else if (el.value) {
        out[el.name] = el.value.trim();
      }
    });
    return out;
  }

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (sending) return;

    // honeypot - bots fill hidden fields
    const hp = form.querySelector('.hp input');
    if (hp && hp.value) return;

    const bad = validate(form);
    setInvalid(bad);
    const firstBad = Object.keys(bad)[0];
    if (firstBad) {
      setMsg({ kind: 'err', text: 'Please check the highlighted fields.' });
      form.elements[firstBad]?.focus();
      return;
    }

    const data = collect(form);
    data.form_type = formType;
    data.source_page = window.location.pathname;
    data.submitted_at = new Date().toISOString();
    data.utm = getUtm();

    setSending(true);
    sendLead(data)
      .then(() => {
        track(`${formType}_submit`, {
          positions: data.positions || '',
          languages: (data.languages || []).join(','),
        });
        form.reset();
        setMsg({ kind: 'ok', text: successText });
        requestAnimationFrame(() => form.querySelector('.form-msg')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      })
      .catch(() => {
        setMsg({ kind: 'err', text: 'Something went wrong. Please WhatsApp us instead - the button is on this page.' });
      })
      .finally(() => setSending(false));
  }

  // clear a field's error state as the user types
  function onInput(e) {
    const name = e.target.name;
    if (name && invalid[name]) setInvalid((prev) => ({ ...prev, [name]: false }));
  }

  return { invalid, msg, sending, onSubmit, onInput };
}
