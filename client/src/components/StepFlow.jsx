import { useEffect, useRef, useState } from 'react';
import { Illustration } from './Art';

// Illustrated step-by-step flow. Steps rise in one after another and the dotted
// connector draws across when the row scrolls into view; then a highlight walks
// through the steps, lifting each illustration in turn.
// Pauses off-screen; static under prefers-reduced-motion.

const STEP_MS = 2400;

export default function StepFlow({ steps }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [played, setPlayed] = useState(false);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setPlayed(true); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting) setPlayed(true);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    // start after the entry animation, then walk through the steps
    const start = setTimeout(() => setActive((a) => (a < 0 ? 0 : a)), 1400);
    const tick = setInterval(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => { clearTimeout(start); clearInterval(tick); };
  }, [inView, steps.length]);

  return (
    <ol ref={ref} className={played ? 'stepflow play' : 'stepflow'}>
      {steps.map((s, i) => (
        <li key={i} className={i === active ? 'sf-step is-active' : 'sf-step'} style={{ '--i': i }}>
          <div className="sf-stage">
            <Illustration name={s.art} className="art sf-art" />
          </div>
          <span className="sf-num">{i + 1}</span>
          <p className="sf-text">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
