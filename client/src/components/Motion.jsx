import { Fragment, useEffect, useRef, useState } from 'react';
import {
  motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform,
  useVelocity, animate,
} from 'motion/react';
import Lenis from 'lenis';

const EASE = [0.16, 1, 0.3, 1];

// ---------- smooth scroll ----------
// One Lenis instance for the whole app. Off under prefers-reduced-motion,
// in which case scrollTop() falls back to the native window scroll.
let lenis = null;

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)) });
    let id = requestAnimationFrame(function raf(time) { lenis.raf(time); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); lenis.destroy(); lenis = null; };
  }, []);
}

// Freeze / release page scrolling (used while the mobile menu is open).
export function lockScroll(on) {
  if (!lenis) return;
  if (on) lenis.stop(); else lenis.start();
}

export function scrollTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

// ---------- page chrome ----------
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

// Navy + yellow panels that sweep off the screen when a new route mounts.
export function PageCurtain({ id }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="curtain" key={id} aria-hidden="true">
      <motion.div className="curtain-panel curtain-navy"
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.08 }} />
      <motion.div className="curtain-panel curtain-yellow"
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: EASE }} />
    </div>
  );
}

export function PageFade({ id, children }) {
  return (
    <motion.div key={id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}>
      {children}
    </motion.div>
  );
}

// ---------- text ----------
// Words slide up out of a clipped line, one after another, when scrolled into view.
// `accent` paints the last word in the brand yellow.
export function SplitText({ as = 'h1', text, className, delay = 0, stagger = 0.06, accent = false }) {
  const Tag = motion[as];
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text}
      initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className={accent && i === words.length - 1 ? 'split-word split-accent' : 'split-word'} aria-hidden="true">
            <motion.span className="split-inner"
              variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: EASE } } }}>
              {w}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}

// Fades + lifts its child in after `delay`, on mount.
export function Rise({ children, delay = 0, y = 20, className, as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay }}>
      {children}
    </Tag>
  );
}

// "12,700+" -> counts 0 -> 12,700 then keeps the "+". Non-numeric text is shown as is.
export function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const m = /^([^\d]*)([\d,]+)(.*)$/.exec(value);
  const [shown, setShown] = useState(m ? `${m[1]}0${m[3]}` : value);

  useEffect(() => {
    if (!m || !inView) return undefined;
    const target = Number(m[2].replace(/,/g, ''));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(value); return undefined; }
    const ctrl = animate(0, target, {
      duration: 1.8, ease: EASE,
      onUpdate: (v) => setShown(`${m[1]}${Math.round(v).toLocaleString('en-IN')}${m[3]}`),
    });
    return () => ctrl.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{shown}</span>;
}

// ---------- interaction ----------
// Pulls its child a little towards the pointer. Fine pointers only.
export function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function move(e) {
    // mouse only, and not on narrow layouts where full-width buttons would get pulled off the edge
    if (e.pointerType !== 'mouse' || window.innerWidth < 961) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function leave() { x.set(0); y.set(0); }

  return (
    <motion.span ref={ref} className="magnetic" style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  );
}

// Child drifts vertically as the section scrolls past.
export function Parallax({ children, distance = 60, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return <motion.div ref={ref} className={className} style={{ y }}>{children}</motion.div>;
}

// Trailing ring + dot that follow the mouse. The ring grows over links and
// shows a label over anything with data-cursor="…". Mouse pointers only; the
// native cursor stays visible.
export function Cursor() {
  const [on, setOn] = useState(false);
  const [mode, setMode] = useState({ hover: false, label: '' });
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!fine.matches) return undefined;
    setOn(true);
    function move(e) {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target.closest?.('[data-cursor], a, button, label, select');
      const label = t?.closest?.('[data-cursor]')?.dataset.cursor || '';
      setMode((m) => (m.hover === !!t && m.label === label ? m : { hover: !!t, label }));
    }
    const leave = () => { x.set(-100); y.set(-100); };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); };
  }, [x, y]);

  if (!on) return null;
  const cls = ['cursor-ring', mode.hover && 'is-hover', mode.label && 'has-label'].filter(Boolean).join(' ');
  return (
    <>
      <motion.div className={cls} style={{ x: rx, y: ry }} aria-hidden="true"><span>{mode.label}</span></motion.div>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
    </>
  );
}

// Card that tilts towards the pointer in 3D, with a light glare that follows it.
export function Tilt({ children, className, max = 8, ...rest }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glare = useTransform([sx, sy], ([gx, gy]) => `radial-gradient(520px circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,.55), transparent 45%)`);

  function move(e) {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function leave() { px.set(0.5); py.set(0.5); }

  return (
    <motion.div ref={ref} className={className} style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
      <motion.span className="tilt-glare" style={{ background: glare }} aria-hidden="true" />
    </motion.div>
  );
}

// Full-bleed ribbon ticker. Drifts on its own and speeds up with scroll
// velocity; scrolling up flips its direction. Items render twice so the loop
// is seamless (x wraps between 0 and -50%).
export function Marquee({ items, reverse = false, speed = 4, tone = 'yellow', tilt = 0 }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const dir = useRef(reverse ? 1 : -1);
  const box = useRef(null);
  const onScreen = useInView(box, { margin: '100px 0px' });

  useAnimationFrame((_, delta) => {
    if (reduce || !onScreen) return;
    const b = boost.get();
    if (b < -0.05) dir.current = reverse ? -1 : 1;
    else if (b > 0.05) dir.current = reverse ? 1 : -1;
    const next = x.get() + dir.current * speed * (delta / 1000) * (1 + Math.abs(b));
    x.set(((next % 50) - 50) % 50); // keep in (-50, 0]
  });

  const transform = useTransform(x, (v) => `translateX(${v}%)`);
  const row = items.map((t, i) => (
    <span className="ribbon-item" key={i}>{t}<span className="ribbon-star" aria-hidden="true">✦</span></span>
  ));
  return (
    <div ref={box} className={`ribbon ribbon-${tone}`} style={{ rotate: `${tilt}deg` }}>
      <motion.div className="ribbon-track" style={{ transform }}>
        <div className="ribbon-group">{row}</div>
        <div className="ribbon-group" aria-hidden="true">{row}</div>
      </motion.div>
    </div>
  );
}
