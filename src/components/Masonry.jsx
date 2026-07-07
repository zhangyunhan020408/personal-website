import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler));
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

function buildGrid(items, columns, width) {
  if (!width) return { grid: [], totalHeight: 0 };

  const colHeights = new Array(columns).fill(0);
  const columnWidth = width / columns;

  const gridItems = items.map((child) => {
    const col = colHeights.indexOf(Math.min(...colHeights));
    const x = columnWidth * col;
    const height = child.height / 2;
    const y = colHeights[col];

    colHeights[col] += height;

    return { ...child, x, y, w: columnWidth, h: height };
  });

  return { grid: gridItems, totalHeight: Math.max(...colHeights, 0) };
}

function MasonryItems({
  grid,
  colorShiftOnHover,
  scaleOnHover,
  hoverScale,
  dataKeyPrefix = '',
}) {
  const handleMouseEnter = (e, item) => {
    const selector = `[data-key="${dataKeyPrefix}${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
      }
    }
  };

  const handleMouseLeave = (e, item) => {
    const selector = `[data-key="${dataKeyPrefix}${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, { opacity: 0, duration: 0.3 });
      }
    }
  };

  return grid.map((item) => (
    <div
      key={`${dataKeyPrefix}${item.id}`}
      data-key={`${dataKeyPrefix}${item.id}`}
      className="item-wrapper"
      onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
      onMouseEnter={(e) => handleMouseEnter(e, item)}
      onMouseLeave={(e) => handleMouseLeave(e, item)}
    >
      <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
        {colorShiftOnHover && (
          <div
            className="color-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
              opacity: 0,
              pointerEvents: 'none',
              borderRadius: '8px',
            }}
          />
        )}
      </div>
    </div>
  ));
}

export default function Masonry({
  items,
  columns: columnsOverride,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  autoScroll = false,
  scrollSpeed = 28,
}) {
  const responsiveColumns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );
  const columns = columnsOverride ?? responsiveColumns;

  const [containerRef, { width }] = useMeasure();
  const trackRef = useRef(null);
  const scrollTweenRef = useRef(null);
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);
  const entranceDone = useRef(false);

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y + 120 };

    switch (animateFrom) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: item.y + 160 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 120 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, totalHeight } = useMemo(
    () => buildGrid(items, columns, width),
    [columns, items, width]
  );

  const startAutoScroll = () => {
    if (!autoScroll || !trackRef.current || totalHeight <= 0) return;

    scrollTweenRef.current?.kill();
    gsap.set(trackRef.current, { y: 0 });
    scrollTweenRef.current = gsap.to(trackRef.current, {
      y: -totalHeight,
      duration: totalHeight / scrollSpeed,
      ease: 'none',
      repeat: -1,
    });
  };

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    const entranceItems = autoScroll
      ? grid.map((item) => ({ ...item, id: `a-${item.id}` }))
      : grid;

    entranceItems.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: initialPos.x,
            y: initialPos.y,
            width: item.w,
            height: item.h,
            scale: 0.88,
            ...(blurToFocus && { filter: 'blur(8px)' }),
          },
          {
            opacity: 1,
            ...animationProps,
            scale: 1,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.75,
            ease: 'back.out(1.35)',
            delay: index * stagger,
            onComplete:
              autoScroll && index === entranceItems.length - 1
                ? () => {
                    if (!entranceDone.current) {
                      entranceDone.current = true;
                      startAutoScroll();
                    }
                  }
                : undefined,
          }
        );
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: 'auto',
        });
      }
    });

    // Position the duplicated (b-) list used for the seamless infinite loop.
    // These items are not part of the entrance animation, so set them directly.
    if (autoScroll) {
      grid.forEach((item) => {
        gsap.set(`[data-key="b-${item.id}"]`, {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          opacity: 1,
        });
      });
    }

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, autoScroll, totalHeight, scrollSpeed]);

  useEffect(() => () => scrollTweenRef.current?.kill(), []);

  const itemProps = {
    colorShiftOnHover,
    scaleOnHover,
    hoverScale,
  };

  if (autoScroll) {
    return (
      <div ref={containerRef} className="masonry-viewport">
        <div ref={trackRef} className="masonry-track">
          <div className="list" style={{ height: totalHeight }}>
            <MasonryItems grid={grid} dataKeyPrefix="a-" {...itemProps} />
          </div>
          <div className="list" style={{ height: totalHeight }} aria-hidden="true">
            <MasonryItems grid={grid} dataKeyPrefix="b-" {...itemProps} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="list" style={{ height: totalHeight || 'auto' }}>
      <MasonryItems grid={grid} {...itemProps} />
    </div>
  );
}
