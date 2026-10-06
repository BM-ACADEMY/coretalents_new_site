import { Fragment, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowSquareOut, Browsers, CaretRight, SidebarSimple, SignOut, SquaresFour } from '@phosphor-icons/react';
import { useAuth } from './auth';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: SquaresFour, end: true },
  { to: '/admin/popups', label: 'Popups', icon: Browsers },
];

const COLLAPSED = 'ct_admin_sidebar';

// Breadcrumb from the URL: /admin/popups/new -> Popups > New popup
function crumbs(pathname) {
  const parts = pathname.replace(/^\/admin\/?/, '').split('/').filter(Boolean);
  if (!parts.length) return [{ label: 'Dashboard' }];
  const out = [];
  if (parts[0] === 'popups') {
    out.push({ label: 'Popups', to: parts[1] ? '/admin/popups' : undefined });
    if (parts[1]) out.push({ label: parts[1] === 'new' ? 'New popup' : 'Edit popup' });
  }
  return out;
}

// Sidebar + top bar around every signed-in admin page. The sidebar collapses to
// icons on desktop and slides over the page on small screens.
export default function AdminLayout() {
  const { admin, signOut } = useAuth();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(COLLAPSED) === '1'; } catch { return false; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); window.scrollTo(0, 0); }, [pathname]);

  function toggle() {
    if (window.matchMedia('(max-width: 767px)').matches) { setMobileOpen((v) => !v); return; }
    setCollapsed((v) => {
      try { localStorage.setItem(COLLAPSED, v ? '0' : '1'); } catch { /* storage blocked */ }
      return !v;
    });
  }

  const trail = crumbs(pathname);

  return (
    <div className="a-shell" data-collapsed={collapsed || undefined} data-mobile-open={mobileOpen || undefined}>
      <aside className="a-sidebar" aria-label="Admin">
        <Link to="/admin" className="a-side-brand">
          <span className="a-side-mark" aria-hidden="true">CT</span>
          <span className="a-side-text"><strong>CoreTalents</strong><small>Admin panel</small></span>
        </Link>

        <nav className="a-side-nav">
          <p className="a-side-label">Manage</p>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className="a-side-item" title={label}>
              <Icon size={18} /><span>{label}</span>
            </NavLink>
          ))}
          <p className="a-side-label">Site</p>
          <a className="a-side-item" href="/" target="_blank" rel="noopener noreferrer" title="View site">
            <ArrowSquareOut size={18} /><span>View site</span>
          </a>
        </nav>

        <div className="a-side-foot">
          <span className="a-avatar" aria-hidden="true">{(admin?.email || 'A')[0].toUpperCase()}</span>
          <span className="a-side-text"><strong>Admin</strong><small>{admin?.email}</small></span>
          <button type="button" className="a-icon-btn" onClick={signOut} aria-label="Sign out" title="Sign out">
            <SignOut size={16} />
          </button>
        </div>
      </aside>
      <button type="button" className="a-side-scrim" aria-label="Close menu" tabIndex={-1} onClick={() => setMobileOpen(false)} />

      <div className="a-main">
        <header className="a-topbar">
          <button type="button" className="a-icon-btn" onClick={toggle} aria-label="Toggle sidebar">
            <SidebarSimple size={18} />
          </button>
          <span className="a-topbar-sep" aria-hidden="true" />
          <nav className="a-crumbs" aria-label="Breadcrumb">
            {trail.map((c, i) => (
              <Fragment key={c.label}>
                {i > 0 && <CaretRight size={12} aria-hidden="true" />}
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </Fragment>
            ))}
          </nav>
        </header>
        <div className="a-content"><Outlet /></div>
      </div>
    </div>
  );
}
