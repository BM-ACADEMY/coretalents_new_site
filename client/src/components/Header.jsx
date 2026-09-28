import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CaretDown, List, X } from '@phosphor-icons/react';
import { SERVICES, ROLES, LOCATIONS } from '../data/content';

function Dropdown({ label, base, items }) {
  return (
    <div className="has-drop">
      <NavLink to={`/${base}`}>{label}<CaretDown size={12} weight="bold" aria-hidden="true" /></NavLink>
      <div className="drop">
        {items.map((i) => <NavLink key={i.slug} to={`/${base}/${i.slug}`}>{i.nav}</NavLink>)}
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // close the mobile menu on every route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="logo" to="/" aria-label="CoreTalents home">
          <img src="/logo-header.png" width="875" height="136" alt="CoreTalents - Smart hiring that builds strong teams" />
        </Link>
        <button className="menu-toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
          Menu
        </button>
        <nav className={open ? 'nav open' : 'nav'}>
          <Dropdown label="Services" base="services" items={SERVICES} />
          <Dropdown label="Roles" base="roles" items={ROLES} />
          <Dropdown label="Locations" base="locations" items={LOCATIONS} />
          <NavLink to="/how-we-work">How we work</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/insights">Insights</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="header-cta">
          <Link className="btn btn-outline" to="/empanelment">Empanel free</Link>
          <Link className="btn btn-primary" to="/contact">Share requirement</Link>
        </div>
      </div>
    </header>
  );
}
