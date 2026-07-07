import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

function parseTransform(str) {
  const rot = str.match(/rotate\(([-0-9.]+)deg\)/);
  const tx  = str.match(/translateX\(([-0-9.]+)px\)/);
  const ty  = str.match(/translateY\(([-0-9.]+)px\)/);
  return {
    rotation: rot ? parseFloat(rot[1]) : 0,
    x: tx ? parseFloat(tx[1]) : 0,
    y: ty ? parseFloat(ty[1]) : 0,
  };
}

export default function BounceCards({
  className = '',
  images = [],
  containerWidth  = 480,
  containerHeight = 360,
  animationDelay   = 0.5,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles  = [],
}) {
  const containerRef = useRef(null);
  const selectedRef  = useRef(null);
  const [, forceUpdate] = useState(0);

  // Mount: GSAP owns all transforms
  useEffect(() => {
    const ctx = gsap.context(() => {
      images.forEach((_, i) => {
        const el = containerRef.current?.querySelector(`.card-${i}`);
        if (!el) return;
        const { x, y, rotation } = parseTransform(transformStyles[i] || 'none');
        gsap.set(el, { x, y, rotation, scale: 0, zIndex: i + 1 });
      });
      gsap.to('.card', {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
      });
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetAll = () => {
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const { x, y, rotation } = parseTransform(transformStyles[i] || 'none');
      gsap.to(target, { x, y, rotation, scale: 1, opacity: 1, zIndex: i + 1, duration: 0.45, ease: 'back.out(1.4)', overwrite: 'auto' });
    });
    selectedRef.current = null;
    forceUpdate(n => n + 1);
  };

  const handleClick = (idx) => {
    if (selectedRef.current === idx) { resetAll(); return; }
    selectedRef.current = idx;
    forceUpdate(n => n + 1);
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      if (i === idx) {
        gsap.to(target, { x: 0, y: 0, rotation: 0, scale: 2.1, zIndex: 20, opacity: 1, duration: 0.55, ease: 'back.out(1.5)', overwrite: 'auto' });
      } else {
        const { x, y, rotation } = parseTransform(transformStyles[i] || 'none');
        const dist = Math.sqrt(x * x + y * y) || 1;
        gsap.to(target, { x: x + (x / dist) * 40, y: y + (y / dist) * 30, rotation, scale: 0.82, opacity: 0.45, zIndex: i + 1, duration: 0.45, ease: 'back.out(1.4)', overwrite: 'auto' });
      }
    });
  };

  const handleEnter = (idx) => {
    if (selectedRef.current !== null) return;
    const q = gsap.utils.selector(containerRef);
    gsap.killTweensOf(q(`.card-${idx}`));
    gsap.to(q(`.card-${idx}`), { scale: 1.12, duration: 0.3, ease: 'back.out(1.6)', overwrite: 'auto' });
  };

  const handleLeave = (idx) => {
    if (selectedRef.current !== null) return;
    const q = gsap.utils.selector(containerRef);
    gsap.killTweensOf(q(`.card-${idx}`));
    gsap.to(q(`.card-${idx}`), { scale: 1, duration: 0.3, ease: 'back.out(1.4)', overwrite: 'auto' });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{ width: containerWidth, height: containerHeight, position: 'relative' }}
      onClick={(e) => { if (e.target === e.currentTarget) resetAll(); }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx}`}
          onClick={() => handleClick(idx)}
          onMouseEnter={() => handleEnter(idx)}
          onMouseLeave={() => handleLeave(idx)}
          style={{ cursor: selectedRef.current === idx ? 'zoom-out' : 'zoom-in' }}
        >
          <img className="image" src={src} alt={`poster-${idx + 1}`} />
        </div>
      ))}
    </div>
  );
}
