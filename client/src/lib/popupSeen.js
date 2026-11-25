// Which popups this visitor has already been shown, and whether they have
// submitted a form. How often a popup may show again is its own setting
// (popup.frequency); after a form submit none show.
const SEEN = 'ct_popup_seen';
const CONVERTED = 'ct_converted';

// 'session' is remembered until the browser is closed, 'always' not at all
function store(frequency) {
  return frequency === 'always' ? null : sessionStorage;
}

function readIds(storage) {
  try {
    const ids = JSON.parse(storage.getItem(SEEN) || '[]');
    return Array.isArray(ids) ? ids : [];
  } catch { return []; }
}

export function isSeen(popup) {
  try {
    const storage = store(popup.frequency);
    return storage ? readIds(storage).includes(popup.id) : false;
  } catch { return false; }
}

export function markSeen(popup) {
  try {
    const storage = store(popup.frequency);
    if (storage) storage.setItem(SEEN, JSON.stringify([...new Set([...readIds(storage), popup.id])]));
  } catch { /* storage blocked */ }
}

export function converted() {
  try { return !!localStorage.getItem(CONVERTED); } catch { return false; }
}

export function markConverted() {
  try { localStorage.setItem(CONVERTED, '1'); } catch { /* storage blocked */ }
}
