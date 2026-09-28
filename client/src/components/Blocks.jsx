import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { STATS, PROCESS } from '../data/content';
import { Illustration } from './Art';

export function CtaBand({ heading, text, primary = 'Share your requirement' }) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>{heading}</h2>
        <p>{text}</p>
        <div className="cta-actions">
          <Link className="btn btn-primary btn-lg" to="/contact">{primary}<ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
          <Link className="btn btn-ghost btn-lg" to="/empanelment">Empanel free - no obligation</Link>
        </div>
      </div>
    </section>
  );
}

// Proof numbers shown beside the home hero
export function HeroProof() {
  return (
    <div className="hero-proof">
      {STATS.map(([num, label, note]) => (
        <div key={label}>
          <div className="stat-num">{num}</div>
          <div className="stat-label">{label}</div>
          {note && <div className="stat-note">{note}</div>}
        </div>
      ))}
    </div>
  );
}

// rows[0] is the header row
export function Table({ rows }) {
  const [head, ...body] = rows;
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{head.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
        <tbody>{body.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

// items: [{ label, to }] - the last item is the current page and has no link
export function Breadcrumb({ items }) {
  const all = [{ label: 'Home', to: '/' }, ...items];
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      {all.map((item, i) => (
        <span key={i}>
          {i > 0 && ' / '}
          {i < all.length - 1 ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function ProcessGrid() {
  return (
    <div className="process">
      {PROCESS.map(([title, desc, when]) => (
        <div className="step" key={title}>
          <h3>{title}</h3>
          <p>{desc}</p>
          <div className="when">{when}</div>
        </div>
      ))}
    </div>
  );
}

// With `art` the head is a text + illustration split; without it the text is centred.
export function PageHead({ crumb, title, lead, art }) {
  const text = (
    <div className="page-head-text">
      {crumb && <Breadcrumb items={crumb} />}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
  return (
    <div className={art ? 'page-head has-art' : 'page-head'}>
      <div className="wrap">
        {text}
        {art && <div className="page-head-art"><Illustration name={art} eager /></div>}
      </div>
    </div>
  );
}

export function Card({ title, text, to, accent }) {
  return (
    <div className={accent ? 'card card-accent' : 'card'}>
      <h3>{title}</h3>
      <p>{text}</p>
      <Link className="card-link" to={to}>Read more<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
    </div>
  );
}

// Full-width clickable rows - used for the roles list on the home page
export function RowList({ items }) {
  return (
    <div className="row-list">
      {items.map((i) => (
        <div className="row-item" key={i.to}>
          <h3><Link to={i.to}>{i.title}</Link></h3>
          <p>{i.text}</p>
          <span className="row-arrow" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span>
        </div>
      ))}
    </div>
  );
}

export function Tags({ base, items, labelKey = 'nav' }) {
  return (
    <p>
      {items.map((i, idx) => (
        <span key={i.slug}>
          {idx > 0 && ' '}
          <Link className="tag" to={`/${base}/${i.slug}`}>{i[labelKey]}</Link>
        </span>
      ))}
    </p>
  );
}
