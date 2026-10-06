import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import PopupView from './PopupView';
import PopupEffect from './PopupEffect';
import { assetUrl, fetchActivePopups } from '../lib/api';
import { track } from '../lib/track';
import { converted, markSeen, seenIds } from '../lib/popupSeen';
import { lockScroll } from './Motion';

// pages where the visitor is already converting - never interrupt them
const SKIP_PAGES = ['/contact', '/empanelment'];
// ignore exits in the first few seconds (a stray trip to the tab bar is not intent)
const MIN_MS = 5000;
// exit intent needs a real mouse: there is no such signal on touch
const DESKTOP = '(min-width: 761px) and (hover: hover) and (pointer: fine)';

// at most one popup per page load
let shownThisLoad = false;

// Shows the popups switched on in the admin panel. Each has a trigger - exit
// intent (desktop) or a delay (all devices) - and each visitor sees it once.
export default function SitePopup() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const [popups, setPopups] = useState([]);
  const [current, setCurrent] = useState(null);
  const box = useRef(null);
  const lastFocus = useRef(null);
  const skip = SKIP_PAGES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    let alive = true;
    fetchActivePopups().then((list) => {
      if (!alive) return;
      list.forEach((p) => { if (p.imageUrl) new Image().src = assetUrl(p.imageUrl); });
      setPopups(list);
    }).catch(() => { /* API down - the site works without popups */ });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (skip || !popups.length) return undefined;
    const waiting = (trigger) => popups.find((p) => p.trigger === trigger && !seenIds().includes(p.id));

    function show(trigger) {
      if (shownThisLoad || converted() || document.querySelector('.form-success')) return;
      const next = waiting(trigger);
      if (!next) return;
      shownThisLoad = true;
      markSeen(next.id);
      lastFocus.current = document.activeElement;
      setCurrent(next);
      track('popup_shown', { popup: next.name, trigger });
    }

    const timed = waiting('timer');
    const timer = timed ? setTimeout(() => show('timer'), timed.delay * 1000) : null;

    function onOut(e) {
      if (e.relatedTarget || e.clientY > 10 || performance.now() < MIN_MS) return;
      show('exit');
    }
    const desktop = window.matchMedia(DESKTOP).matches;
    if (desktop) document.addEventListener('mouseout', onOut);

    return () => {
      clearTimeout(timer);
      if (desktop) document.removeEventListener('mouseout', onOut);
    };
  }, [popups, skip]);

  // navigating away (button, back) takes the popup with it
  useEffect(() => { setCurrent(null); }, [pathname]);

  useEffect(() => {
    if (!current) return undefined;
    lockScroll(true);
    (box.current?.querySelector('[data-autofocus]') || box.current?.querySelector('button'))?.focus();
    return () => lockScroll(false);
  }, [current]);

  function close(reason) {
    track('popup_dismissed', { popup: current.name, reason });
    setCurrent(null);
    lastFocus.current?.focus?.();
  }

  function onAction() {
    track('popup_clicked', { popup: current.name });
    setCurrent(null);
  }

  // keep Tab inside the dialog; Escape closes it
  function onKeyDown(e) {
    if (e.key === 'Escape') { close('escape'); return; }
    if (e.key !== 'Tab') return;
    const items = box.current.querySelectorAll('a[href],button');
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  return createPortal(
    <AnimatePresence>
      {current && (
        <motion.div className="site-pop" role="dialog" aria-modal="true"
          aria-labelledby={current.type === 'content' ? 'sitePopTitle' : undefined}
          aria-label={current.type === 'image' ? (current.imageAlt || 'Announcement') : undefined}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          onKeyDown={onKeyDown}
          onClick={(e) => { if (e.target === e.currentTarget) close('backdrop'); }}>
          <PopupView popup={current} imageSrc={assetUrl(current.imageUrl)} titleId="sitePopTitle"
            onClose={close} onAction={onAction}
            cardProps={{
              ref: box,
              initial: reduce ? false : { y: 16, scale: 0.97 },
              animate: { y: 0, scale: 1 },
              exit: reduce ? undefined : { y: 10, scale: 0.98 },
              transition: { type: 'spring', stiffness: 260, damping: 24 },
            }} />
          <PopupEffect effect={current.effect} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
