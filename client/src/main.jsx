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

// Fade out the first-load loader from index.html once the page and its images have loaded.
// Shown for at least 900ms so it does not just flash on fast connections.
function fadePreloader(el) {
  el.classList.add('done');
  el.addEventListener('transitionend', () => el.remove(), { once: true });
  setTimeout(() => el.remove(), 800); // fallback if transitionend never fires
}

// The loader logo flies up and shrinks into the header logo's place while the
// loader background clears, then hands over to the real header logo.
function flyPreloader(el) {
  const logo = el.querySelector('img');
  const target = document.querySelector('.site-header .logo img');
  if (logo) { logo.style.animation = 'none'; logo.style.transformOrigin = '0 0'; } // measure it at rest
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

function hidePreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  const wait = Math.max(0, 900 - performance.now());
  setTimeout(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !el.animate) fadePreloader(el);
    else flyPreloader(el);
  }, wait);
}
if (document.readyState === 'complete') hidePreloader();
else window.addEventListener('load', hidePreloader, { once: true });
