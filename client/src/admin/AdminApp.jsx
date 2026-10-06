import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import * as api from './api';
import { AuthContext, useAuth } from './auth';
import AdminLayout from './AdminLayout';
import Login from './Login';
import Dashboard from './Dashboard';
import Popups from './Popups';
import PopupForm from './PopupForm';
import './admin.css';

function RequireAuth({ children }) {
  const { status } = useAuth();
  const location = useLocation();
  if (status === 'loading') return <div className="a-boot" role="status">Loading…</div>;
  if (status === 'out') return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return children;
}

// Everything under /admin. Loaded as its own chunk - the public site never downloads it.
export default function AdminApp() {
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState(api.getToken() ? 'loading' : 'out'); // loading | in | out

  const signOut = useCallback(() => { api.clearToken(); setAdmin(null); setStatus('out'); }, []);

  const signIn = useCallback(async (email, password) => {
    const data = await api.login(email, password);
    api.setToken(data.token);
    setAdmin(data.admin);
    setStatus('in');
  }, []);

  // restore the session on load; an expired token sends the admin back to the login page
  useEffect(() => {
    api.setExpiredHandler(signOut);
    if (api.getToken()) {
      api.me().then((d) => { setAdmin(d.admin); setStatus('in'); }).catch(signOut);
    }
    return () => api.setExpiredHandler(null);
  }, [signOut]);

  // keep the panel out of search results
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.append(meta);
    document.title = 'CoreTalents Admin';
    return () => meta.remove();
  }, []);

  const auth = useMemo(() => ({ admin, status, signIn, signOut }), [admin, status, signIn, signOut]);

  return (
    <AuthContext.Provider value={auth}>
      <div className="adm">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="popups" element={<Popups />} />
            <Route path="popups/new" element={<PopupForm />} />
            <Route path="popups/:id" element={<PopupForm />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
