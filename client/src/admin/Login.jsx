import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useAuth } from './auth';
import { Alert, Field } from './ui';

export default function Login() {
  const { status, signIn } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (status === 'in') return <Navigate to={from} replace />;

  async function onSubmit(e) {
    e.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="a-login">
      <form className="a-card a-login-card" onSubmit={onSubmit} noValidate>
        <img src="/logo.png" alt="CoreTalents" className="a-login-logo" />
        <div>
          <h1 className="a-h1">Admin sign in</h1>
          <p className="a-sub">Enter your email and password to manage the site.</p>
        </div>
        <Alert>{error}</Alert>
        <Field label="Email" htmlFor="adminEmail">
          <input id="adminEmail" className="a-input" type="email" autoComplete="username" required autoFocus
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password" htmlFor="adminPassword">
          <div className="a-input-wrap">
            <input id="adminPassword" className="a-input" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="a-icon-btn a-input-btn" onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>
              {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>
        <button type="submit" className="a-btn a-btn-primary a-btn-block" disabled={busy || !email || !password}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
