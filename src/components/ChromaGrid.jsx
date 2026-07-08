import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export default function ChromaGrid({
  items = [],
  className = '',
  radius = 180,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}) {
  const rootRef = useRef(null);
  const colorRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x, y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    // Reveal the color layer around the cursor
    gsap.to(colorRef.current, { opacity: 1, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    // Fade the color layer out -> whole grid returns to grayscale
    gsap.to(colorRef.current, { opacity: 0, duration: fadeOut, overwrite: true });
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ '--r': `${radius}px` }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* Base layer: always grayscale */}
      <div className="chroma-layer chroma-layer-gray">
        {items.map((c, i) => (
          <div className="chroma-cell" key={`g-${i}`}>
            <img src={c.image} alt={c.title} loading="lazy" draggable={false} />
          </div>
        ))}
      </div>

      {/* Color layer: revealed only within the spotlight around the cursor */}
      <div ref={colorRef} className="chroma-layer chroma-layer-color">
        {items.map((c, i) => (
          <div className="chroma-cell" key={`c-${i}`}>
            <img src={c.image} alt="" aria-hidden="true" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
