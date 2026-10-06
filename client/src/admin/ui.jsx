import { useEffect, useRef } from 'react';
import { WarningCircle } from '@phosphor-icons/react';

// Small shared pieces of the admin UI.

export function Switch({ checked, onChange, label, disabled }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled}
      className="a-switch" data-on={checked || undefined} onClick={() => onChange(!checked)}>
      <span />
    </button>
  );
}

export function Field({ label, hint, htmlFor, children }) {
  return (
    <div className="a-field">
      <label className="a-label" htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && <p className="a-hint">{hint}</p>}
    </div>
  );
}

export function Alert({ children }) {
  if (!children) return null;
  return <div className="a-alert" role="alert"><WarningCircle size={16} weight="bold" /><span>{children}</span></div>;
}

export function Badge({ tone = 'neutral', children }) {
  return <span className="a-badge" data-tone={tone}>{children}</span>;
}

export function PageHead({ title, text, children }) {
  return (
    <div className="a-pagehead">
      <div>
        <h1 className="a-h1">{title}</h1>
        {text && <p className="a-sub">{text}</p>}
      </div>
      {children && <div className="a-pagehead-actions">{children}</div>}
    </div>
  );
}

export function ConfirmDialog({ title, text, confirmLabel, busy, onConfirm, onCancel }) {
  const cancel = useRef(null);
  useEffect(() => {
    cancel.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  return (
    <div className="a-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="a-dialog" role="alertdialog" aria-modal="true" aria-labelledby="aDialogTitle" aria-describedby="aDialogText">
        <h2 className="a-h2" id="aDialogTitle">{title}</h2>
        <p className="a-sub" id="aDialogText">{text}</p>
        <div className="a-dialog-actions">
          <button type="button" className="a-btn a-btn-outline" ref={cancel} onClick={onCancel}>Cancel</button>
          <button type="button" className="a-btn a-btn-danger" disabled={busy} onClick={onConfirm}>{busy ? 'Deleting…' : confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
