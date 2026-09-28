// GA4 event helper - safe if GA4 is absent.
const LIVE = import.meta.env.VITE_LIVE === 'true';

export function track(event, params = {}) {
  params.source_page = window.location.pathname;
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
  if (!LIVE) console.log('[track]', event, params);
}

// Outbound click tracking for WhatsApp and phone links, anywhere on the page.
export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.indexOf('wa.me') > -1) track('whatsapp_click', { context: a.dataset.context || 'general' });
    else if (href.indexOf('tel:') === 0) track('phone_click', {});
  });
}

// Capture UTM params once per session.
export function captureUtm() {
  const q = window.location.search;
  try {
    if (q.indexOf('utm_') > -1 && !sessionStorage.getItem('ct_utm')) {
      sessionStorage.setItem('ct_utm', q.replace(/^\?/, ''));
    }
  } catch { /* storage blocked */ }
}

export function getUtm() {
  try { return sessionStorage.getItem('ct_utm') || ''; } catch { return ''; }
}
