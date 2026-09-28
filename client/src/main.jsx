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
// Shown for at least 600ms so it does not just flash on fast connections.
function hidePreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  const wait = Math.max(0, 600 - performance.now());
  setTimeout(() => {
    el.classList.add('done');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
    setTimeout(() => el.remove(), 800); // fallback if transitionend never fires
  }, wait);
}
if (document.readyState === 'complete') hidePreloader();
else window.addEventListener('load', hidePreloader, { once: true });
