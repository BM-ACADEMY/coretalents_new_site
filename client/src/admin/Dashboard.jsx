import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';
import { listPopups } from './api';
import { Alert, Badge, PageHead } from './ui';
import { triggerText } from './popupText';

export default function Dashboard() {
  const [popups, setPopups] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    listPopups().then(setPopups).catch((err) => setError(err.message));
  }, []);

  const list = popups || [];
  const live = list.filter((p) => p.active);
  const stats = [
    { label: 'Popups', value: list.length, note: 'created in total' },
    { label: 'Live now', value: live.length, note: 'switched on and showing on the site' },
    { label: 'Image popups', value: list.filter((p) => p.type === 'image').length, note: 'click-through images' },
    { label: 'Content popups', value: list.filter((p) => p.type === 'content').length, note: 'heading, text and a button' },
  ];

  return (
    <>
      <PageHead title="Dashboard" text="What is showing on the site right now.">
        <Link className="a-btn a-btn-primary" to="/admin/popups/new"><Plus size={16} weight="bold" />New popup</Link>
      </PageHead>
      <Alert>{error}</Alert>

      <div className="a-stats">
        {stats.map((s) => (
          <div className="a-card a-stat" key={s.label}>
            <p className="a-stat-label">{s.label}</p>
            <p className="a-stat-value">{popups ? s.value : '–'}</p>
            <p className="a-hint">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="a-card">
        <div className="a-card-head">
          <h2 className="a-h2">Live popups</h2>
          <Link className="a-link" to="/admin/popups">Manage all</Link>
        </div>
        {popups && !live.length && (
          <p className="a-empty-line">No popup is switched on. Visitors will not see one until you turn a popup on.</p>
        )}
        {live.map((p) => (
          <Link className="a-row" to={`/admin/popups/${p.id}`} key={p.id}>
            <span className="a-row-main"><strong>{p.name}</strong><small>{triggerText(p)}</small></span>
            <Badge>{p.type === 'image' ? 'Image' : 'Content'}</Badge>
            <Badge tone="live">Live</Badge>
          </Link>
        ))}
      </div>
    </>
  );
}
