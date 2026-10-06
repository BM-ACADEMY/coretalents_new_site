import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initClickTracking, captureUtm } from './lib/track';
import '@fontsource-variable/geist';
import './styles/style.css';

captureUtm();
initClickTracking();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// The first-load loader in index.html plays a short logo-reveal clip. Once the clip
// has finished and the page has loaded, the logo flies into the header.
function fadePreloader(el) {
  el.classList.add('done');
  el.addEventListener('transitionend', () => el.remove(), { once: true });
  setTimeout(() => el.remove(), 800); // fallback if transitionend never fires
}

// The clip ends on the logo. The real logo image sits exactly on top of it, takes
// over, then flies up and shrinks into the header logo's place while the clip and
// the loader background clear, and hands over to the real header logo.
function flyPreloader(el) {
  const logo = el.querySelector('img');
  const target = document.querySelector('.site-header .logo img');
  if (logo) logo.style.transformOrigin = '0 0';
  const from = logo?.getBoundingClientRect();
  const to = target?.getBoundingClientRect();
  if (!from?.width || !to?.width || to.bottom < 0) { fadePreloader(el); return; }

  const EASE = 'cubic-bezier(.76,0,.24,1)';
  const scale = to.width / from.width;
  target.style.opacity = '0';
  el.classList.add('flying');

  logo.animate([
    { transform: 'translate(0,0) scale(1)' },
    { transform: `translate(0,-12px) scale(1.06)`, offset: 0.18 },
    { transform: `translate(${to.left - from.left}px,${to.top - from.top}px) scale(${scale})` },
  ], { duration: 1100, easing: EASE, fill: 'forwards' });

  const bg = el.querySelector('.pl-bg').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: 450, easing: EASE, fill: 'forwards' });
  bg.finished.then(() => {
    target.style.opacity = '';
    el.remove();
  });
}

// Resolves when the loader clip has played through. Never holds the page for
// long: a refused autoplay, a broken file or a download that never starts all let it go.
const MIN_MS = 900;    // the loader shows at least this long, so it does not just flash
const START_MS = 2000; // a clip that has not started this long after the page loaded is skipped
function clipPlayed(el, reduce) {
  const video = el.querySelector('video');
  if (!video || reduce || video.ended || video.error) return Promise.resolve();
  return new Promise((resolve) => {
    video.addEventListener('ended', resolve, { once: true });
    video.addEventListener('error', resolve, { once: true });
    video.play().catch(resolve);
    setTimeout(() => {
      if (video.currentTime === 0) resolve();
      else setTimeout(resolve, (video.duration - video.currentTime) * 1000 + 500); // in case it stalls part-way
    }, START_MS);
  });
}

function hidePreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const minShown = new Promise((resolve) => { setTimeout(resolve, Math.max(0, MIN_MS - performance.now())); });
  Promise.all([clipPlayed(el, reduce), minShown]).then(() => {
    if (reduce || !el.animate) fadePreloader(el);
    else flyPreloader(el);
  });
}
if (document.readyState === 'complete') hidePreloader();
else window.addEventListener('load', hidePreloader, { once: true });
