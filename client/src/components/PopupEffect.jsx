import { useEffect, useRef } from 'react';

// Effects the admin can choose for a popup. Keys are stored in the database.
export const EFFECTS = [
  ['none', 'None'],
  ['cannons', 'Side cannons'],
  ['burst', 'Centre burst'],
  ['rain', 'Confetti rain'],
  ['fireworks', 'Fireworks'],
];

const COLORS = ['#ffc700', '#12395e', '#ffdd55', '#1d6fc4', '#ffffff', '#f2734a'];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

// one paper piece; speeds are px per second
function piece(x, y, angle, speed, extra) {
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    w: rand(6, 11), h: rand(8, 16),
    rot: rand(0, Math.PI * 2), vr: rand(-9, 9),
    flip: rand(0, Math.PI * 2), vflip: rand(5, 12),
    color: pick(COLORS), round: Math.random() > 0.75,
    delay: 0, life: rand(2.2, 3.4), drag: 0.9, gravity: 1,
    ...extra,
  };
}

// Build the particles for an effect inside a w x h area. `base` scales speed to the area.
function spawn(effect, w, h) {
  const base = Math.max(h, 480);
  const out = [];
  if (effect === 'cannons') {
    // two volleys from the left and right edges, shot up and inwards
    [0, 0.35].forEach((delay) => {
      for (let i = 0; i < 55; i += 1) {
        const up = rand(0.2, 1.25); // radians above horizontal
        out.push(piece(0, h * 0.7, -up, base * rand(0.9, 1.9), { delay }));
        out.push(piece(w, h * 0.7, Math.PI + up, base * rand(0.9, 1.9), { delay }));
      }
    });
  } else if (effect === 'burst') {
    for (let i = 0; i < 120; i += 1) {
      out.push(piece(w / 2, h / 2, rand(0, Math.PI * 2), base * rand(0.3, 1.3), { delay: rand(0, 0.1) }));
    }
  } else if (effect === 'rain') {
    for (let i = 0; i < 140; i += 1) {
      out.push(piece(rand(0, w), -20, Math.PI / 2 + rand(-0.25, 0.25), base * rand(0.2, 0.45), {
        delay: rand(0, 1.8), life: 6, drag: 1, gravity: 0.12,
      }));
    }
  } else if (effect === 'fireworks') {
    for (let b = 0; b < 6; b += 1) {
      const x = rand(w * 0.12, w * 0.88);
      const y = rand(h * 0.12, h * 0.5);
      const color = pick(COLORS);
      for (let i = 0; i < 44; i += 1) {
        out.push(piece(x, y, (i / 44) * Math.PI * 2, base * rand(0.3, 0.6), {
          delay: b * 0.32, life: rand(0.9, 1.3), drag: 0.12, gravity: 0.18,
          color, round: true, w: 5, h: 5, vr: 0, vflip: 0, flip: 0,
        }));
      }
    }
  }
  return out;
}

// Plays a confetti-style effect once on a canvas laid over its positioned parent
// (the page for a live popup, the stage in the admin preview). Decorative only:
// it ignores clicks and does not run when the visitor asks for reduced motion.
export default function PopupEffect({ effect }) {
  const canvas = useRef(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el || !effect || effect === 'none') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const { width: w, height: h } = el.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.width = w * dpr;
    el.height = h * dpr;
    const ctx = el.getContext('2d');
    ctx.scale(dpr, dpr);

    const base = Math.max(h, 480);
    let parts = spawn(effect, w, h);
    let last = performance.now();
    let id = requestAnimationFrame(function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      parts = parts.filter((p) => p.life > 0 && p.y < h + 40);
      parts.forEach((p) => {
        if (p.delay > 0) { p.delay -= dt; return; }
        p.life -= dt;
        const slow = p.drag ** dt;
        p.vx *= slow;
        p.vy = p.vy * slow + base * 1.5 * p.gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.flip += p.vflip * dt;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 0.5));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const hh = p.h * Math.cos(p.flip); // paper turning over as it falls
          ctx.fillRect(-p.w / 2, -hh / 2, p.w, hh);
        }
        ctx.restore();
      });
      if (parts.length) id = requestAnimationFrame(frame);
    });
    return () => { cancelAnimationFrame(id); ctx.clearRect(0, 0, w, h); };
  }, [effect]);

  if (!effect || effect === 'none') return null;
  return <canvas ref={canvas} className="pop-fx" aria-hidden="true" />;
}
