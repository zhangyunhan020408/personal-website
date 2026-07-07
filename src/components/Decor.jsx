import { motion } from 'framer-motion';

/**
 * Halo — a soft blurred pastel gradient blob used to make the page feel airy.
 * Purely decorative background element inspired by the reference posters.
 */
export function Halo({
  size = 520,
  colors = ['rgba(255,90,60,0.20)', 'rgba(255,201,168,0.10)'],
  className = '',
  style = {},
  blur = 70,
}) {
  return (
    <div
      aria-hidden
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 30%, ${colors[0]} 0%, ${colors[1]} 45%, transparent 72%)`,
        filter: `blur(${blur}px)`,
        ...style,
      }}
    />
  );
}

/** GhostNumber — giant faint background number for rhythm & breathing room. */
export function GhostNumber({ children, fill = false, className = '', style = {} }) {
  return (
    <span
      aria-hidden
      className={`${fill ? 'ghost-fill' : 'ghost-number'} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}

/** ScriptNote — handwritten annotation accent (Caveat), like the poster's red circled notes. */
export function ScriptNote({ children, className = '', color = '#FF5A3C', style = {} }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "'Caveat', cursive",
        fontWeight: 700,
        color,
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Kicker — small uppercase eyebrow label using the display font. */
export function Kicker({ children, color = '#FF5A3C', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase ${className}`}
      style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.22em', color }}
    >
      <span className="w-5 h-px" style={{ background: color, opacity: 0.6 }} />
      {children}
    </span>
  );
}

/** Confetti — a few tiny colored shapes scattered for a lively e-commerce feel. */
export function Confetti({ className = '' }) {
  const bits = [
    { c: '#FF5A3C', t: 'triangle', top: '8%', left: '4%', r: -18, s: 12 },
    { c: '#A9C7FF', t: 'square', top: '22%', left: '92%', r: 24, s: 10 },
    { c: '#9DE7C6', t: 'triangle', top: '70%', left: '6%', r: 40, s: 11 },
    { c: '#FFC9A8', t: 'dot', top: '82%', left: '90%', r: 0, s: 9 },
    { c: '#FF5A3C', t: 'dot', top: '40%', left: '96%', r: 0, s: 7 },
    { c: '#A9C7FF', t: 'triangle', top: '58%', left: '2%', r: -30, s: 9 },
  ];
  return (
    <div aria-hidden className={`absolute inset-0 pointer-events-none ${className}`}>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ top: b.top, left: b.left }}
          animate={{ y: [0, -10, 0], rotate: [b.r, b.r + 12, b.r] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          {b.t === 'triangle' ? (
            <span
              style={{
                display: 'block',
                width: 0,
                height: 0,
                borderLeft: `${b.s / 2}px solid transparent`,
                borderRight: `${b.s / 2}px solid transparent`,
                borderBottom: `${b.s}px solid ${b.c}`,
                transform: `rotate(${b.r}deg)`,
              }}
            />
          ) : b.t === 'square' ? (
            <span
              style={{
                display: 'block',
                width: b.s,
                height: b.s,
                borderRadius: 2,
                background: b.c,
                transform: `rotate(${b.r}deg)`,
              }}
            />
          ) : (
            <span
              style={{ display: 'block', width: b.s, height: b.s, borderRadius: '50%', background: b.c }}
            />
          )}
        </motion.span>
      ))}
    </div>
  );
}
