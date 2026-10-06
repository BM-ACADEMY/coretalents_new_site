import { API_URL } from '../lib/api';

const KEY = 'ct_admin_token';

export function getToken() {
  try { return localStorage.getItem(KEY) || ''; } catch { return ''; }
}
export function setToken(token) {
  try { localStorage.setItem(KEY, token); } catch { /* storage blocked */ }
}
export function clearToken() {
  try { localStorage.removeItem(KEY); } catch { /* storage blocked */ }
}

// called when the server says the session is no longer valid
let onExpired = null;
export function setExpiredHandler(fn) { onExpired = fn; }

// JSON or FormData request to /api/admin. Throws an Error with a message fit to show.
async function request(path, { method = 'GET', body } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  let payload = body;
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${API_URL}/api/admin${path}`, { method, headers, body: payload });
  } catch {
    throw new Error('Cannot reach the server. Check that it is running.');
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && path !== '/login') { clearToken(); onExpired?.(); }
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

export const login = (email, password) => request('/login', { method: 'POST', body: { email, password } });
export const me = () => request('/me');

export const listPopups = () => request('/popups').then((d) => d.popups);
export const getPopup = (id) => request(`/popups/${id}`).then((d) => d.popup);
export const createPopup = (form) => request('/popups', { method: 'POST', body: form }).then((d) => d.popup);
export const updatePopup = (id, form) => request(`/popups/${id}`, { method: 'PUT', body: form }).then((d) => d.popup);
export const setPopupActive = (id, active) => request(`/popups/${id}/active`, { method: 'PATCH', body: { active } }).then((d) => d.popup);
export const deletePopup = (id) => request(`/popups/${id}`, { method: 'DELETE' });
