const API_URL = import.meta.env.VITE_API_URL || '';
const LIVE = import.meta.env.VITE_LIVE === 'true';

// POST a form submission to the Express API, which saves it and forwards to n8n.
export function sendLead(data) {
  if (!LIVE) {
    console.log('[form submission - test mode]', data);
    return new Promise((r) => setTimeout(r, 500));
  }
  return fetch(`${API_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => { if (!res.ok) throw new Error('bad response'); return res; });
}
