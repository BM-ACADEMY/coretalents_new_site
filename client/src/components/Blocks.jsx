import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { STATS, PROCESS } from '../data/content';
import { Illustration } from './Art';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SplitText, Rise, CountUp, Magnetic, Parallax, Tilt } from './Motion';

export function CtaBand({ heading, text, primary = 'Share your requirement' }) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <SplitText as="h2" text={heading} />
        <p>{text}</p>
        <div className="cta-actions">
          <Magnetic><Link className="btn btn-primary btn-lg" to="/contact">{primary}<ArrowRight size={18} weight="bold" aria-hidden="true" /></Link></Magnetic>
          <Magnetic><Link className="btn btn-ghost btn-lg" to="/empanelment">Empanel free - no obligation</Link></Magnetic>
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
          <div className="stat-num"><CountUp value={num} /></div>
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

// Once the grid is in view, the steps glide in from the left one after another
// (time-based, not scrubbed with scroll, so it stays smooth).
function Step({ title, desc, when, i }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className="step"
      initial={reduce ? false : { opacity: 0, x: -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
      <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
      <h3>{title.replace(/^\d+\.\s*/, '')}</h3>
      <p>{desc}</p>
      <div className="when">{when}</div>
    </motion.div>
  );
}

export function ProcessGrid() {
  return (
    <div className="process">
      {PROCESS.map(([title, desc, when], i) => <Step key={title} title={title} desc={desc} when={when} i={i} />)}
    </div>
  );
}

// Each page's `art` name maps to a looping clip in public/video.
const HEAD_VIDEO = {
  hire: 'svc-recruitment',
  'people-search': 'svc-bulk',
  'location-search': 'ph-city',
  researching: 'ph-laptop',
  'screening-resumes': 'svc-language',
  agreement: 'ph-signing',
  'meet-the-team': 'svc-recruitment',
  'contact-us': 'svc-language',
  searching: 'svc-promotion',
};

// Dark framed banner for inner pages. With `art` a looping video fills the
// right side and fades into the navy under the text; without it the text is centred.
export function PageHead({ crumb, title, lead, art }) {
  const text = (
    <div className="page-head-text">
      {crumb && <Rise delay={0.25}><Breadcrumb items={crumb} /></Rise>}
      <SplitText text={title} delay={0.35} stagger={0.045} accent />
      {lead && <Rise as="p" className="lead" delay={0.65}>{lead}</Rise>}
    </div>
  );
  return (
    <div className={art ? 'page-head has-art' : 'page-head'}>
      <div className="ph-frame">
        {art && (
          <motion.div className="ph-media" aria-hidden="true"
            initial={{ clipPath: 'inset(0 0 0 100%)' }} animate={{ clipPath: 'inset(0 0 0 0%)' }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}>
            <LoopVideo name={HEAD_VIDEO[art] || 'svc-recruitment'} className="ph-video" eager />
          </motion.div>
        )}
        <div className="ph-grid" aria-hidden="true" />
        <div className="hero-orbs" aria-hidden="true"><span /><span /><span /></div>
        <div className="wrap">{text}</div>
      </div>
    </div>
  );
}

// Long-form page body with a sticky "On this page" index built from its h2s.
export function Prose({ children }) {
  const ref = useRef(null);
  const [heads, setHeads] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const hs = [...ref.current.querySelectorAll(':scope > h2')];
    hs.forEach((h, i) => {
      if (!h.id) h.id = `s${i + 1}-${h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    });
    setHeads(hs.map((h) => ({ id: h.id, text: h.getAttribute('aria-label') || h.textContent })));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(hs.indexOf(e.target)); });
    }, { rootMargin: '0px 0px -70% 0px' });
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  function go(e, id) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const withToc = heads.length > 2;
  return (
    <div className={withToc ? 'wrap prose-grid' : 'wrap'}>
      {withToc && (
        <aside className="toc" aria-label="On this page">
          <p className="toc-title">On this page</p>
          <div className="toc-bar"><span style={{ height: `${((active + 1) / heads.length) * 100}%` }} /></div>
          <ol>
            {heads.map((h, i) => (
              <li key={h.id} className={i === active ? 'on' : ''}>
                <a href={`#${h.id}`} onClick={(e) => go(e, h.id)}><span>{String(i + 1).padStart(2, '0')}</span>{h.text}</a>
              </li>
            ))}
          </ol>
        </aside>
      )}
      <div className="narrow prose" ref={ref}>{children}</div>
    </div>
  );
}

// Tilting card with a running gradient border. `index` shows a large 01, 02… mark.
export function Card({ title, text, to, accent, index }) {
  return (
    <Tilt className={accent ? 'card card-accent' : 'card'} data-cursor="Open">
      {index != null && <span className="card-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
      <h3>{title}</h3>
      <p>{text}</p>
      <Link className="card-link" to={to}>Read more<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
    </Tilt>
  );
}

// Home "What we do": full-width cards that pin one over the other while scrolling;
// each one shrinks back as the next slides up over it.
const STACK_VIDEO = {
  'recruitment-staffing': 'svc-recruitment',
  'bulk-hiring': 'svc-bulk',
  'language-specific-hiring': 'svc-language',
  'campus-fresher-hiring': 'svc-campus',
  'job-promotion': 'svc-promotion',
};

// Muted loop that only plays while on screen (and, with `active={false}`,
// stays paused - used for stack cards that are covered by the next one).
function LoopVideo({ name, className = 'stack-video', eager = false, active = true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const v = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (visible && active) v.play().catch(() => {}); else v.pause();
  }, [visible, active]);
  // Below-the-fold posters are only requested once the card is about a screen
  // away, so they do not compete with the first screen's images.
  const [near, setNear] = useState(eager);
  useEffect(() => {
    if (near) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } },
      { rootMargin: '800px 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [near]);
  return (
    <video ref={ref} className={className} src={`/video/${name}.mp4`} poster={near ? `/video/${name}.webp` : undefined}
      muted loop playsInline preload={eager ? 'auto' : 'none'} aria-hidden="true" />
  );
}

function StackCard({ item, i, total, progress, active }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, i === total - 1 ? 0 : 0.35]);
  return (
    <div className="stack-slot" style={{ top: `calc(110px + ${i * 22}px)` }}>
      <motion.article className={`stack-card tone-${i % 3}`} style={{ scale }} data-cursor="Open">
        <div className="stack-copy">
          <span className="stack-num">{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <h3>{item.nav}</h3>
          <p>{item.desc}</p>
          <Link className="card-link" to={`/services/${item.slug}`}>Explore service<ArrowUpRight size={16} weight="bold" aria-hidden="true" /></Link>
        </div>
        <div className="stack-media">
          <LoopVideo name={STACK_VIDEO[item.slug] || 'svc-recruitment'} active={active} />
        </div>
        <motion.span className="stack-dim" style={{ opacity: dim }} aria-hidden="true" />
      </motion.article>
    </div>
  );
}

export function ServiceStack({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // only the card on top plays its video
  const [top, setTop] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setTop(Math.min(items.length - 1, Math.floor(v * items.length))));
  return (
    <div className="stack" ref={ref}>
      {items.map((s, i) => <StackCard key={s.slug} item={s} i={i} total={items.length} progress={scrollYProgress} active={i === top} />)}
    </div>
  );
}

// Full-width clickable rows - used for the roles list on the home page
function Row({ item, n }) {
  return (
    <div className="row-item" data-cursor="View">
      <span className="row-num" aria-hidden="true">{String(n + 1).padStart(2, '0')}</span>
      <h3><Link to={item.to}>{item.title}</Link></h3>
      <p>{item.text}</p>
      <span className="row-arrow" aria-hidden="true"><ArrowUpRight size={18} weight="bold" /></span>
    </div>
  );
}

export function RowList({ items }) {
  return (
    <div className="row-list">
      {items.map((item, n) => <Row key={item.to} item={item} n={n} />)}
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
