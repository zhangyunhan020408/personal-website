import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Two columns of images scrolling in opposite directions.
 * Pure CSS + Framer Motion — no external 3D dependencies.
 */
export default function SerlioGallery({ images = [] }) {
  const containerRef = useRef(null);

  // Split images evenly into two columns
  const col1 = images.filter((_, i) => i % 2 === 0);
  const col2 = images.filter((_, i) => i % 2 !== 0);

  // Duplicate for seamless loop
  const loop1 = [...col1, ...col1];
  const loop2 = [...col2, ...col2];

  const CARD_H = 175;
  const GAP    = 0;
  const UNIT   = CARD_H + GAP;   // px per image

  const animate1 = { y: [0, -UNIT * col1.length] };
  const animate2 = { y: [-UNIT * col2.length, 0] };
  const transition = (delay = 0) => ({
    duration: col1.length * 3.2,
    ease: 'linear',
    repeat: Infinity,
    delay,
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        gap: 0,
        padding: 0,
        background: '#FFFFFF',
        position: 'relative',
      }}
    >
      {/* Top fade */}
      <div style={{
        position: 'absolute', inset: '0 0 auto 0', height: 40, zIndex: 2,
        background: 'linear-gradient(to bottom, #fff, transparent)',
        pointerEvents: 'none',
      }} />
      {/* Bottom fade */}
      <div style={{
        position: 'absolute', inset: 'auto 0 0 0', height: 40, zIndex: 2,
        background: 'linear-gradient(to top, #fff, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Column 1 — scroll up */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <motion.div
          animate={animate1}
          transition={transition(0)}
          style={{ display: 'flex', flexDirection: 'column', gap: GAP }}
        >
          {loop1.map((src, i) => (
            <ImageTile key={i} src={src} height={CARD_H} />
          ))}
        </motion.div>
      </div>

      {/* Column 2 — scroll down */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <motion.div
          animate={animate2}
          transition={transition(1.5)}
          style={{ display: 'flex', flexDirection: 'column', gap: GAP }}
        >
          {loop2.map((src, i) => (
            <ImageTile key={i} src={src} height={CARD_H} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ImageTile({ src, height }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, filter: 'grayscale(0)' }}
      style={{
        width: '100%',
        height,
        borderRadius: 10,
        overflow: 'hidden',
        flexShrink: 0,
        filter: 'grayscale(0.5)',
        transition: 'filter 0.35s ease',
      }}
    >
      <img
        src={src}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        draggable={false}
      />
    </motion.div>
  );
}
