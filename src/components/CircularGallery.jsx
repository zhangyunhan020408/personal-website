import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

class Media {
  constructor({
    geometry, gl, image, index, length, renderer, scene, screen,
    viewport, bend, borderRadius = 0, vertical = false, showLabels = false,
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;
    this.vertical = vertical;
    this.showLabels = showLabels;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float cardAlpha = 1.0 - smoothstep(-0.002, 0.002, d);

          vec2 shadowCenter = vec2(0.5, 0.435);
          float shadowD = roundedBoxSDF(
            vUv - shadowCenter,
            vec2(0.49 - uBorderRadius),
            uBorderRadius + 0.02
          );
          float shadowAlpha = (1.0 - smoothstep(-0.12, 0.05, shadowD)) * 0.34;
          shadowAlpha *= (1.0 - cardAlpha);

          float alpha = cardAlpha + shadowAlpha;
          vec3 rgb = mix(vec3(0.0), color.rgb, cardAlpha);
          gl_FragColor = vec4(rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  update(scroll, direction) {
    if (this.vertical) {
      this.plane.position.y = this.offset - scroll.current - this.extra;
      const y = this.plane.position.y;

      // 弧线：离中心越远横向偏移越大，但远处递减避免甩出视口
      if (this.bend === 0) {
        this.plane.position.x = 0;
      } else {
        const H = this.viewport.height / 2;
        const t = Math.min(1, Math.abs(y) / H);
        const maxOffset = this.viewport.width * (0.16 + this.bend * 0.012);
        const rise = 1 - Math.cos(t * Math.PI * 0.5);
        const falloff = 1 - 0.42 * t;
        const arc = rise * maxOffset * falloff;
        this.plane.position.x = this.bend > 0 ? arc : -arc;
      }

      this.plane.rotation.x = 0;
      this.plane.rotation.y = 0;
      this.plane.rotation.z = 0;

      const planeOffset = this.plane.scale.y / 2;
      const viewportOffset = this.viewport.height / 2;
      this.isBefore = this.plane.position.y + planeOffset < -viewportOffset;
      this.isAfter = this.plane.position.y - planeOffset > viewportOffset;

      if (direction === 'up' && this.isBefore) {
        this.extra -= this.spanTotal;
        this.isBefore = this.isAfter = false;
      }
      if (direction === 'down' && this.isAfter) {
        this.extra += this.spanTotal;
        this.isBefore = this.isAfter = false;
      }
    } else {
      this.plane.position.x = this.offset - scroll.current - this.extra;
      const x = this.plane.position.x;
      const H = this.viewport.width / 2;

      if (this.bend === 0) {
        this.plane.position.y = 0;
      } else {
        const B_abs = Math.abs(this.bend);
        const R = (H * H + B_abs * B_abs) / (2 * B_abs);
        const effectiveX = Math.min(Math.abs(x), H * 0.95);
        const arc = R - Math.sqrt(Math.max(0, R * R - effectiveX * effectiveX));
        this.plane.position.y = this.bend > 0 ? -arc : arc;
      }

      this.plane.rotation.x = 0;
      this.plane.rotation.y = 0;
      this.plane.rotation.z = 0;

      const planeOffset = this.plane.scale.x / 2;
      const viewportOffset = this.viewport.width / 2;
      this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
      this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

      if (direction === 'right' && this.isBefore) {
        this.extra -= this.spanTotal;
        this.isBefore = this.isAfter = false;
      }
      if (direction === 'left' && this.isAfter) {
        this.extra += this.spanTotal;
        this.isBefore = this.isAfter = false;
      }
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    const scale = this.screen.height / 1500;

    if (this.vertical) {
      this.plane.scale.x = (this.viewport.width * (520 * scale)) / this.screen.width;
      this.plane.scale.y = (this.viewport.height * (390 * scale)) / this.screen.height;
    } else {
      this.plane.scale.y = (this.viewport.height * (900 * scale)) / this.screen.height;
      this.plane.scale.x = (this.viewport.width * (700 * scale)) / this.screen.width;
    }

    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 0.35;
    this.span = (this.vertical ? this.plane.scale.y : this.plane.scale.x) + this.padding;
    this.spanTotal = this.span * this.length;
    this.offset = this.span * this.index;
  }
}

class App {
  constructor(container, { items, bend, borderRadius, scrollSpeed, scrollEase, vertical, showLabels }) {
    this.container = container;
    this.vertical = vertical;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, borderRadius, showLabels);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.position.z = 10;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 1, widthSegments: 1 });
  }

  createMedias(items, bend, borderRadius, showLabels) {
    const galleryItems = (items?.length ? items : []).concat(items?.length ? items : []);
    this.medias = galleryItems.map((data, index) => new Media({
      geometry: this.planeGeometry,
      gl: this.gl,
      image: data.image,
      index,
      length: galleryItems.length,
      renderer: this.renderer,
      scene: this.scene,
      screen: this.screen,
      viewport: this.viewport,
      bend,
      borderRadius,
      vertical: this.vertical,
      showLabels,
    }));
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    const pos = e.touches ? e.touches[0] : e;
    this.start = this.vertical ? pos.clientY : pos.clientX;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const pos = e.touches ? e.touches[0] : e;
    const current = this.vertical ? pos.clientY : pos.clientX;
    const distance = (this.start - current) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias?.[0]) return;
    const span = this.medias[0].span;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / span);
    const item = span * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);

    const aspect = this.screen.width / this.screen.height;
    const viewHeight = 8;
    const viewWidth = viewHeight * aspect;
    this.camera.orthographic({
      left: -viewWidth / 2,
      right: viewWidth / 2,
      top: viewHeight / 2,
      bottom: -viewHeight / 2,
      near: 0.1,
      far: 100,
    });
    this.viewport = { width: viewWidth, height: viewHeight };
    this.medias?.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.vertical
      ? (this.scroll.current > this.scroll.last ? 'up' : 'down')
      : (this.scroll.current > this.scroll.last ? 'right' : 'left');
    this.medias?.forEach((media) => media.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    this.container.addEventListener('wheel', this.boundOnWheel, { passive: false });
    this.container.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    this.container.addEventListener('touchstart', this.boundOnTouchDown, { passive: true });
    this.container.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    this.container.addEventListener('touchend', this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    this.container.removeEventListener('wheel', this.boundOnWheel);
    this.container.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    this.container.removeEventListener('touchstart', this.boundOnTouchDown);
    this.container.removeEventListener('touchmove', this.boundOnTouchMove);
    this.container.removeEventListener('touchend', this.boundOnTouchUp);
    this.renderer?.gl?.canvas?.parentNode?.removeChild(this.renderer.gl.canvas);
  }
}

export default function CircularGallery({
  items = [],
  bend = 0.6,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  direction = 'vertical',
  showLabels = false,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !items.length) return;
    const app = new App(containerRef.current, {
      items,
      bend,
      borderRadius,
      scrollSpeed,
      scrollEase,
      vertical: direction === 'vertical',
      showLabels,
    });
    return () => app.destroy();
  }, [items, bend, borderRadius, scrollSpeed, scrollEase, direction, showLabels]);

  return <div className="circular-gallery" ref={containerRef} />;
}
