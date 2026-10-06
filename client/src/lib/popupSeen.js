// Which popups this visitor has already been shown, and whether they have
// submitted a form. Each popup shows once; after a form submit none show.
const SEEN = 'ct_popup_seen';
const CONVERTED = 'ct_converted';

export function seenIds() {
  try {
    const ids = JSON.parse(localStorage.getItem(SEEN) || '[]');
    return Array.isArray(ids) ? ids : [];
  } catch { return []; }
}

export function markSeen(id) {
  try { localStorage.setItem(SEEN, JSON.stringify([...new Set([...seenIds(), id])])); } catch { /* storage blocked */ }
}

export function converted() {
  try { return !!localStorage.getItem(CONVERTED); } catch { return false; }
}

export function markConverted() {
  try { localStorage.setItem(CONVERTED, '1'); } catch { /* storage blocked */ }
}
