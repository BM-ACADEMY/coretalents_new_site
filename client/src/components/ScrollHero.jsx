import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import { Magnetic, SplitText, Rise } from './Motion';

// Pinned home hero. The section is several screens tall; while it scrolls past,
// the frame stays fixed, the video scrubs with the scroll position and the copy
// moves through three stages. Under prefers-reduced-motion it is a plain,
// single-screen hero on the poster frame.

// same stages as the weekly funnel report (Sourced → Screened → Interviewed → Joined)
const STEPS = ['Source', 'Screen', 'Interview', 'Join'];

// Portrait crop on phones, 1080p elsewhere (decoding 1440p frames while seeking
// on every scroll tick is what made the hero stutter).
function pickSource() {
  return window.matchMedia('(max-width: 760px)').matches ? '/video/homevideo-m.mp4' : '/video/homevideo.mp4';
}

// Seeks the video to follow `progress`. Only runs while the hero is on screen,
// and only seeks when the target is at least one frame away and the previous
// seek has finished, so the decoder never queues up work.
function useScrubVideo(ref, sectionRef, progress, enabled) {
  useEffect(() => {
    const v = ref.current;
    if (!v || !enabled) return undefined;
    v.src = pickSource();
    v.load();
    // iOS only allows seeking after a user-agent play() has started
    v.play().then(() => v.pause()).catch(() => {});

    const FRAME = 1 / 24;
    let id = 0;
    const tick = () => {
      if (v.duration && !v.seeking) {
        const target = progress.get() * (v.duration - 0.05);
        if (Math.abs(v.currentTime - target) >= FRAME) v.currentTime = target;
      }
      id = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(id);
      if (e.isIntersecting) id = requestAnimationFrame(tick);
    });
    io.observe(sectionRef.current);
    return () => { io.disconnect(); cancelAnimationFrame(id); };
  }, [ref, sectionRef, progress, enabled]);
}

// Maps the section's scroll (offsets must stay inside 0..1) to a stage's
// visibility: 0 = hidden below, 1 = shown, 2 = hidden above.
function useStage(p, input, states) {
  const pick = (a) => states.map((s) => a[s]);
  const opacity = useTransform(p, input, pick([0, 1, 0]));
  const y = useTransform(p, input, pick([60, 0, -60]));
  return { opacity, y };
}

function CtaPair() {
  return (
    <div className="hero-actions">
      <Magnetic><Link className="btn btn-primary btn-lg" to="/contact">Share your requirement<ArrowRight size={18} weight="bold" aria-hidden="true" /></Link></Magnetic>
      <Magnetic><Link className="btn btn-glass btn-lg" to="/empanelment">Empanel free</Link></Magnetic>
    </div>
  );
}

export default function ScrollHero() {
  const reduce = useReducedMotion();
  // on a first load, hold the intro until the loader logo has flown into the header
  const [intro] = useState(() => (document.getElementById('preloader') ? 1.3 : 0));
  const section = useRef(null);
  const video = useRef(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // Spring-smoothed copy of the scroll. Everything below reads it, which also keeps
  // these transforms on the JS path (native scroll timelines mis-handle them).
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 32, restDelta: 0.0005 });
  const [stage, setStage] = useState(0);

  useScrubVideo(video, section, p, !reduce);
  useMotionValueEvent(p, 'change', (v) => setStage(v < 0.36 ? 0 : v < 0.68 ? 1 : 2));

  // video window opens from a rounded card to full bleed, and eases in
  const frameScale = useTransform(p, [0, 0.22], [0.93, 1]);
  const radius = useTransform(p, [0, 0.22], [32, 0]);
  const scale = useTransform(p, [0, 1], [1.06, 1]);
  const shade = useTransform(p, [0, 0.5, 1], [0.5, 0.62, 0.75]);
  const cue = useTransform(p, [0, 0.06], [1, 0]);
  const bar = p; // rail fill drawn with scaleY

  // stage 1 is visible from the start, so it only fades out
  const s1 = useStage(p, [0, 0.26, 0.36], [1, 1, 2]);
  const s2 = useStage(p, [0.34, 0.44, 0.6, 0.7], [0, 1, 1, 2]);
  const s3 = useStage(p, [0.68, 0.78, 1], [0, 1, 1]);
  const stepFill = useTransform(p, [0.39, 0.52], [0.5, STEPS.length + 0.5]);
  const [lit, setLit] = useState(0);
  useMotionValueEvent(stepFill, 'change', (v) => setLit(Math.min(STEPS.length, Math.floor(v))));

  if (reduce) {
    return (
      <section className="scroll-hero is-static">
        <div className="sh-frame">
          <img className="sh-video" src="/video/homevideo-poster.webp" alt="" />
          <div className="sh-shade" style={{ opacity: 0.7 }} />
          <div className="wrap sh-stage">
            <h1>Hire faster, at volume, across Tamil Nadu</h1>
            <p className="lead">From one specialist role to a hundred seats on a floor. You pay only when a candidate actually joins.</p>
            <CtaPair />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="scroll-hero" ref={section}>
      <div className="sh-sticky">
        <motion.div className="sh-frame" style={{ scale: frameScale, borderRadius: radius }}>
          <motion.video ref={video} className="sh-video" style={{ scale }}
            muted playsInline preload="auto" poster="/video/homevideo-poster.webp" aria-hidden="true" />
          <motion.div className="sh-shade" style={{ opacity: shade }} />

          <motion.div className="wrap sh-stage" style={s1} aria-hidden={stage !== 0}>
            <Rise className="hero-kicker" delay={intro + 0.3}><span className="pulse-dot" />Hiring across Tamil Nadu &amp; Puducherry</Rise>
            <SplitText text="Hire faster, at volume, across Tamil Nadu" delay={intro + 0.45} />
            <Rise as="p" className="lead" delay={intro + 0.9}>From one specialist role to a hundred seats on a floor. We source, screen and deliver candidates in Puducherry, Chennai and across South India.</Rise>
            <Rise delay={intro + 1.05}><CtaPair /></Rise>
          </motion.div>

          <motion.div className="wrap sh-stage" style={s2} aria-hidden={stage !== 1}>
            <p className="sh-eyebrow">How a mandate moves</p>
            <h2 className="sh-title sh-title-lines"><span>One requirement in.</span><span>Joined candidates out.</span></h2>
            <ol className="sh-steps">
              {STEPS.map((s, i) => (
                <li key={s} className={i < lit ? 'on' : ''}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>
              ))}
            </ol>
          </motion.div>

          <motion.div className="wrap sh-stage" style={s3} aria-hidden={stage !== 2}>
            <p className="sh-eyebrow">The only number that matters</p>
            <h2 className="sh-title">You pay only when<br />a candidate <em>joins.</em></h2>
            <p className="lead">No fee for profiles, interviews or empanelment. Written proposal and firm rates within 24 hours.</p>
            <CtaPair />
          </motion.div>

          <motion.div className="scroll-cue" style={{ opacity: cue }} aria-hidden="true">
            <span className="mouse"><span className="wheel" /></span>
            <span>Scroll</span>
          </motion.div>

          <div className="sh-rail" aria-hidden="true">
            <motion.span style={{ scaleY: bar }} />
            {[0, 1, 2].map((i) => <i key={i} className={stage >= i ? 'on' : ''} style={{ top: `${i * 50}%` }} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
