import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { WhatsAppIcon } from './Art';
import Header from './Header';
import Footer from './Footer';
import { waLink } from '../lib/links';

// Fade sections in as they enter the viewport. CSS only animates .reveal
// when the user has not asked for reduced motion.
function useReveal(pathname) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const els = document.querySelectorAll('main > section:not(.hero)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    els.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
    return () => io.disconnect();
  }, [pathname]);
}

export default function Layout() {
  const { pathname } = useLocation();

  // new page starts at the top, and a hovered dropdown closes after navigating
  useEffect(() => {
    // instant, so the CSS smooth-scroll does not animate a page change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.activeElement?.blur?.();
  }, [pathname]);

  useReveal(pathname);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <a className="wa-float" href={waLink()} data-context="floating" aria-label="WhatsApp us" title="WhatsApp us">
        <WhatsAppIcon size={30} />
      </a>
      <div className="mobile-bar">
        <a className="btn btn-wa" href={waLink()} data-context="mobile-bar">
          <WhatsAppIcon size={18} />WhatsApp
        </a>
        <Link className="btn btn-primary" to="/contact">Share requirement</Link>
      </div>
    </>
  );
}
