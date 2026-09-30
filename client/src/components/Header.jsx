import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, CaretDown, List, X } from '@phosphor-icons/react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { SERVICES, ROLES, LOCATIONS } from '../data/content';
import { WhatsAppIcon } from './Art';
import { waLink } from '../lib/links';
import { lockScroll } from './Motion';

// Desktop: hover dropdown. Mobile menu: the caret button expands the sub-links in place.
function Dropdown({ label, base, items }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  return (
    <div className={open ? 'has-drop is-open' : 'has-drop'}>
      <div className="drop-head">
        <NavLink to={`/${base}`}>{label}<CaretDown size={12} weight="bold" aria-hidden="true" /></NavLink>
        <button type="button" className="drop-toggle" aria-expanded={open} aria-label={`Show ${label.toLowerCase()}`}
          onClick={() => setOpen(!open)}>
          <CaretDown size={16} weight="bold" aria-hidden="true" />
        </button>
      </div>
      <div className="drop">
        {items.map((i) => <NavLink key={i.slug} to={`/${base}/${i.slug}`}>{i.nav}</NavLink>)}
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  // close the mobile menu on every route change
  useEffect(() => { setOpen(false); setHidden(false); }, [pathname]);

  // lock the page behind the open mobile menu; Esc closes it
  useEffect(() => {
    if (!open) return undefined;
    document.documentElement.classList.add('menu-open');
    lockScroll(true);
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    // wheel / touch outside the menu panel must not move the page underneath
    const block = (e) => { if (!e.target.closest?.('.nav')) e.preventDefault(); };
    window.addEventListener('keydown', esc);
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    return () => {
      document.documentElement.classList.remove('menu-open');
      lockScroll(false);
      window.removeEventListener('keydown', esc);
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
    };
  }, [open]);

  // slide away while scrolling down, come back on the way up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    if (open) return;
    if (y > 240 && y > prev + 4) setHidden(true);
    else if (y < prev - 4) setHidden(false);
  });

  const cls = ['site-header', scrolled && 'scrolled', hidden && 'hide', open && 'menu-is-open'].filter(Boolean).join(' ');

  return (
    <header className={cls} onFocusCapture={() => setHidden(false)}>
      <div className="wrap header-inner">
        <Link className="logo" to="/" aria-label="CoreTalents home">
          <img src="/logo-header.png" width="875" height="136" alt="CoreTalents - Smart hiring that builds strong teams" />
        </Link>
        <button className="menu-toggle" aria-expanded={open} aria-label="Menu" onClick={() => { setHidden(false); setOpen(!open); }}>
          {open ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
          {open ? 'Close' : 'Menu'}
        </button>
        <nav className={open ? 'nav open' : 'nav'} data-lenis-prevent>
          <Dropdown label="Services" base="services" items={SERVICES} />
          <Dropdown label="Roles" base="roles" items={ROLES} />
          <Dropdown label="Locations" base="locations" items={LOCATIONS} />
          <NavLink to="/how-we-work">How we work</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/insights">Insights</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact" className="nav-only-m">Contact</NavLink>
          {/* calls to action - shown only inside the mobile menu */}
          <div className="nav-cta">
            <Link className="btn btn-primary btn-lg" to="/contact">Share requirement<ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
            <Link className="btn btn-outline btn-lg" to="/empanelment">Empanel free</Link>
            <a className="btn btn-wa btn-lg" href={waLink()} data-context="mobile-menu"><WhatsAppIcon size={18} />WhatsApp us</a>
          </div>
        </nav>
        <div className="header-cta">
          <Link className="btn btn-outline" to="/empanelment">Empanel free</Link>
          <Link className="btn btn-primary" to="/contact">Share requirement</Link>
        </div>
      </div>
    </header>
  );
}
