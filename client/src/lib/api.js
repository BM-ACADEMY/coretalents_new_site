const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

// POST a form submission directly to n8n.
export function sendLead(data) {
  return fetch(N8N_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => { if (!res.ok) throw new Error('bad response'); return res; });
}

// Uploaded images come back as "/uploads/..." paths on the API server.
export function assetUrl(path) {
  return path ? `${API_URL}${path}` : '';
}

// Popups the admin has switched on.
export function fetchActivePopups() {
  return fetch(`${API_URL}/api/popups/active`)
    .then((res) => { if (!res.ok) throw new Error('bad response'); return res.json(); })
    .then((data) => data.popups || []);
}
