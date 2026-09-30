import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { WhatsAppIcon } from './Art';
import Header from './Header';
import Footer from './Footer';
import { waLink } from '../lib/links';
import { useSmoothScroll, scrollTop, ScrollProgress, PageCurtain, PageFade, Cursor } from './Motion';

// Grids whose children rise in one after another once their section is in view.
// (.process steps slide in on their own - see Blocks.jsx.)
const STAGGER = '.bento, .cards, .row-list, .check-grid, .check-list, .hero-proof, .post-list, tbody';

// Plain-text section headings are split into words that rise one after
// another; the last word gets a yellow marker that sweeps in behind it.
const SPLIT = 'main :is(.section-head, .coverage, .prose, .form-grid, .form-side) > h2:not([aria-label])';

function splitHeading(h) {
  if (h.children.length) return;
  const words = h.textContent.trim().split(/\s+/);
  h.setAttribute('aria-label', words.join(' '));
  h.textContent = '';
  words.forEach((w, i) => {
    const outer = document.createElement('span');
    outer.className = i === words.length - 1 ? 'w hl' : 'w';
    outer.setAttribute('aria-hidden', 'true');
    outer.style.setProperty('--w', i);
    const inner = document.createElement('span');
    inner.textContent = w;
    outer.append(inner);
    if (i) h.append(' ');
    h.append(outer);
  });
  h.classList.add('h-split');
}

// Fade sections in as they enter the viewport, and stagger the items inside
// them. CSS only animates .reveal when the user has not asked for reduced motion.
function useReveal(pathname) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    document.querySelectorAll(SPLIT).forEach(splitHeading);
    const els = document.querySelectorAll('main section:not(.hero):not(.scroll-hero), main .prose > :is(p, ul, ol, .table-wrap, .callout), main h2.h-split');
    document.querySelectorAll(`main ${STAGGER.split(', ').join(', main ')}`).forEach((grid) => {
      grid.classList.add('stagger');
      [...grid.children].forEach((c, i) => c.style.setProperty('--i', Math.min(i, 12)));
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    els.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
    return () => io.disconnect();
  }, [pathname]);
}

// Cards follow the pointer with a soft yellow spotlight (CSS reads --mx / --my).
function useSpotlight() {
  useEffect(() => {
    const bg = document.querySelector('.bg-fx');
    function move(e) {
      bg?.style.setProperty('--gx', `${e.clientX}px`);
      bg?.style.setProperty('--gy', `${e.clientY}px`);
      const el = e.target.closest?.('.card, .row-item, .step, .check-grid li, .post');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }
    document.addEventListener('pointermove', move, { passive: true });
    return () => document.removeEventListener('pointermove', move);
  }, []);
}

export default function Layout() {
  const { pathname } = useLocation();

  useSmoothScroll();
  useSpotlight();

  // new page starts at the top, and a hovered dropdown closes after navigating
  useEffect(() => {
    scrollTop();
    document.activeElement?.blur?.();
  }, [pathname]);

  useReveal(pathname);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="bg-fx" aria-hidden="true"><span /><span /><span /></div>
      <ScrollProgress />
      <Header />
      <main id="main">
        <PageFade id={pathname}><Outlet /></PageFade>
      </main>
      <Footer />
      <PageCurtain id={pathname} />
      <Cursor />
      <a className="wa-float" href={waLink()} data-context="floating" aria-label="WhatsApp us" title="WhatsApp us">
        <WhatsAppIcon size={30} />
      </a>
    </>
  );
}
