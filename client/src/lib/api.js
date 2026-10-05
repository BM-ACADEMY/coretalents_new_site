const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

// POST a form submission directly to n8n.
export function sendLead(data) {
  return fetch(N8N_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => { if (!res.ok) throw new Error('bad response'); return res; });
}
