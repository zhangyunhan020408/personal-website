import { useRef, useState, useCallback } from 'react';

export default function ImageReveal({ before, after, refImage, hint = '移动鼠标，对比场景迁移效果' }) {
  const containerRef = useRef(null);
  const [revealX, setRevealX] = useState(null);
  const [refExpanded, setRefExpanded] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (refExpanded) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setRevealX(Math.max(2, Math.min(98, x)));
  }, [refExpanded]);

  const handleMouseLeave = useCallback(() => {
    if (refExpanded) return;
    setRevealX(null);
  }, [refExpanded]);

  const toggleRef = useCallback((e) => {
    e.stopPropagation();
    setRefExpanded((v) => !v);
    if (!refExpanded) setRevealX(null);
  }, [refExpanded]);

  const isActive = revealX !== null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden select-none"
      style={{
        width: '100%',
        height: '100%',
        minHeight: 380,
        cursor: refExpanded ? 'pointer' : 'col-resize',
      }}
    >
      {/* Before image (default, fills everything) */}
      <img
        src={before}
        alt="迁移前"
        draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          userSelect: 'none',
        }}
      />

      {/* After image — clipped to left of divider */}
      <div
        style={{
          position: 'absolute', inset: 0,
          clipPath: isActive ? `inset(0 ${100 - revealX}% 0 0)` : 'inset(0 100% 0 0)',
          transition: isActive ? 'none' : 'clip-path 0.4s ease',
        }}
      >
        <img
          src={after}
          alt="迁移后"
          draggable={false}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Divider line */}
      {isActive && !refExpanded && (
        <div
          style={{
            position: 'absolute', top: 0, bottom: 0,
            left: `${revealX}%`,
            width: 2,
            background: '#ffffff',
            boxShadow: '0 0 8px rgba(0,0,0,0.25)',
            pointerEvents: 'none',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 32, height: 32,
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 3,
            }}
          >
            <span style={{ display: 'block', width: 2, height: 12, borderRadius: 2, background: '#1E4035' }} />
            <span style={{ display: 'block', width: 2, height: 12, borderRadius: 2, background: '#1E4035' }} />
          </div>
        </div>
      )}

      {/* Labels */}
      {isActive && !refExpanded && revealX > 10 && (
        <div
          style={{
            position: 'absolute', bottom: 12, left: 12,
            background: 'rgba(0,0,0,0.38)',
            color: '#fff', fontSize: 11, fontWeight: 600,
            padding: '3px 9px', borderRadius: 99,
            letterSpacing: '0.06em', pointerEvents: 'none',
            backdropFilter: 'blur(4px)',
          }}
        >
          原始棚拍
        </div>
      )}
      {isActive && !refExpanded && revealX < 90 && (
        <div
          style={{
            position: 'absolute', bottom: 12, right: 12,
            background: 'rgba(30,64,53,0.82)',
            color: '#fff', fontSize: 11, fontWeight: 600,
            padding: '3px 9px', borderRadius: 99,
            letterSpacing: '0.06em', pointerEvents: 'none',
            backdropFilter: 'blur(4px)',
          }}
        >
          场景迁移后
        </div>
      )}

      {/* 风格参考图 — 右上角小缩略图 */}
      {refImage && !refExpanded && (
        <button
          type="button"
          onClick={toggleRef}
          aria-label="展开风格参考图"
          style={{
            position: 'absolute', top: 12, right: 12,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
            gap: 4, padding: 0, border: 'none', background: 'transparent',
            cursor: 'pointer', zIndex: 10,
          }}
        >
          <img
            src={refImage}
            alt="风格参考图"
            draggable={false}
            style={{
              width: 72, height: 96,
              objectFit: 'cover', objectPosition: 'center top',
              borderRadius: 6,
              boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
              border: '1.5px solid rgba(255,255,255,0.7)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.28)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.22)';
            }}
          />
          <span
            style={{
              background: 'rgba(0,0,0,0.42)',
              color: '#fff', fontSize: 10, fontWeight: 600,
              padding: '2px 7px', borderRadius: 99,
              letterSpacing: '0.06em',
              backdropFilter: 'blur(4px)',
            }}
          >
            风格参考图
          </span>
        </button>
      )}

      {/* 放大后的风格参考图 */}
      {refImage && refExpanded && (
        <div
          onClick={toggleRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 20,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.52)',
            backdropFilter: 'blur(3px)',
            cursor: 'pointer',
            animation: 'refFadeIn 0.22s ease',
          }}
        >
          <img
            src={refImage}
            alt="风格参考图"
            draggable={false}
            style={{
              maxWidth: '58%',
              maxHeight: '78%',
              objectFit: 'contain',
              borderRadius: 8,
              boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
              border: '2px solid rgba(255,255,255,0.85)',
              animation: 'refScaleIn 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
          <span
            style={{
              marginTop: 10,
              background: 'rgba(0,0,0,0.5)',
              color: '#fff', fontSize: 11, fontWeight: 600,
              padding: '4px 12px', borderRadius: 99,
              letterSpacing: '0.06em',
              backdropFilter: 'blur(4px)',
            }}
          >
            风格参考图 · 点击收起
          </span>
        </div>
      )}

      {/* 底部提示条 */}
      {!refExpanded && (
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '6px 12px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.18), transparent)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, letterSpacing: '0.04em' }}>
            {hint}
          </span>
        </div>
      )}

      <style>{`
        @keyframes refFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes refScaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
