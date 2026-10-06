import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilSimple, Plus, TextAa, Trash } from '@phosphor-icons/react';
import { assetUrl } from '../lib/api';
import { deletePopup, listPopups, setPopupActive } from './api';
import { Alert, Badge, ConfirmDialog, PageHead, Switch } from './ui';
import { triggerText } from './popupText';

export default function Popups() {
  const [popups, setPopups] = useState(null);
  const [error, setError] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    listPopups().then(setPopups).catch((err) => setError(err.message));
  }, []);

  // flip the switch straight away; put it back if the server refuses
  async function toggle(popup, active) {
    const set = (value) => setPopups((list) => list.map((p) => (p.id === popup.id ? { ...p, active: value } : p)));
    setError('');
    set(active);
    try { await setPopupActive(popup.id, active); } catch (err) { set(!active); setError(err.message); }
  }

  async function confirmDelete() {
    setDeleting(true);
    try {
      await deletePopup(toDelete.id);
      setPopups((list) => list.filter((p) => p.id !== toDelete.id));
      setToDelete(null);
    } catch (err) {
      setError(err.message);
      setToDelete(null);
    }
    setDeleting(false);
  }
  const cancelDelete = useCallback(() => setToDelete(null), []);

  return (
    <>
      <PageHead title="Popups" text="Create as many as you need. Only the ones switched on show on the site.">
        <Link className="a-btn a-btn-primary" to="/admin/popups/new"><Plus size={16} weight="bold" />New popup</Link>
      </PageHead>
      <Alert>{error}</Alert>

      <div className="a-card a-table-card">
        {!popups && !error && <p className="a-empty-line">Loading…</p>}
        {popups && !popups.length && (
          <div className="a-empty">
            <h2 className="a-h2">No popups yet</h2>
            <p className="a-sub">Create an image popup or a content popup, then switch it on.</p>
            <Link className="a-btn a-btn-primary" to="/admin/popups/new"><Plus size={16} weight="bold" />New popup</Link>
          </div>
        )}
        {popups && popups.length > 0 && (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Popup</th>
                  <th>Type</th>
                  <th>Shows</th>
                  <th>Goes to</th>
                  <th>Live</th>
                  <th><span className="a-sr">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {popups.map((p) => {
                  const link = p.type === 'image' ? p.linkUrl : p.buttonUrl;
                  return (
                    <tr key={p.id}>
                      <td>
                        <Link className="a-cell-main" to={`/admin/popups/${p.id}`}>
                          <span className="a-thumb">
                            {p.type === 'image' ? <img src={assetUrl(p.imageUrl)} alt="" /> : <TextAa size={18} />}
                          </span>
                          <span className="a-row-main">
                            <strong>{p.name}</strong>
                            <small>{p.type === 'image' ? `${p.width} × ${p.height} px` : p.heading}</small>
                          </span>
                        </Link>
                      </td>
                      <td><Badge>{p.type === 'image' ? 'Image' : 'Content'}</Badge></td>
                      <td className="a-muted">{triggerText(p)}</td>
                      <td className="a-muted a-cell-link">{link || '—'}</td>
                      <td>
                        <Switch checked={p.active} onChange={(v) => toggle(p, v)}
                          label={`${p.name}: ${p.active ? 'live, switch off' : 'off, switch on'}`} />
                      </td>
                      <td>
                        <div className="a-cell-actions">
                          <Link className="a-icon-btn" to={`/admin/popups/${p.id}`} aria-label={`Edit ${p.name}`} title="Edit">
                            <PencilSimple size={16} />
                          </Link>
                          <button type="button" className="a-icon-btn a-icon-danger" onClick={() => setToDelete(p)}
                            aria-label={`Delete ${p.name}`} title="Delete">
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {toDelete && (
        <ConfirmDialog title={`Delete “${toDelete.name}”?`}
          text={toDelete.type === 'image'
            ? 'The popup and its image file are removed from the server. This cannot be undone.'
            : 'The popup is removed from the server. This cannot be undone.'}
          confirmLabel="Delete popup" busy={deleting} onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </>
  );
}
