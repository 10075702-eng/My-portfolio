import * as THREE from 'three';
import { createPhotoCurve, HELIX } from '@/lib/photo-helix';
import type { PhotoItem } from '@/config/photos';

export function mountPhotoHelix(host: HTMLElement, section: HTMLElement, photos: PhotoItem[], onReady: () => void, onError: () => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x101110, 0);
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x101110, 12, 19);
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 50);
  const tilt = new THREE.Group();
  const ribbon = new THREE.Group();
  tilt.add(ribbon);
  scene.add(tilt);
  tilt.rotation.z = -.09;
  tilt.rotation.x = .06;
  const loader = new THREE.TextureLoader();
  const resources = photos.map((photo, i) => {
    const geometry = createPhotoCurve(i, photo.w / photo.h);
    const front = new THREE.MeshBasicMaterial({ color: 0x252826 });
    const back = new THREE.MeshBasicMaterial({ color: 0x151816, side: THREE.BackSide });
    const mesh = new THREE.Mesh(geometry, front);
    ribbon.add(mesh, new THREE.Mesh(geometry, back));
    return { photo, geometry, front, back, requested: false, texture: null as THREE.Texture | null };
  });
  let disposed = false;
  let frame = 0;
  let visible = true;
  let ready = false;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const render = () => {
    frame = 0;
    if (disposed || !visible) return;
    const bounds = section.getBoundingClientRect();
    const progress = reduce.matches ? .12 : THREE.MathUtils.clamp(-bounds.top / Math.max(1, section.offsetHeight - innerHeight), 0, 1);
    const travel = 1.3 + progress * (photos.length - 6) * HELIX.step * HELIX.rise;
    ribbon.position.y = travel;
    ribbon.rotation.y = -.25 - progress * Math.PI * 2;
    resources.forEach((resource, i) => {
      // Only load thumbnail textures near the visible turns, never full-resolution originals.
      if (resource.requested || Math.abs(i * HELIX.step * HELIX.rise - travel) > 6) return;
      resource.requested = true;
      const source = new URL(resource.photo.thumb, location.origin);
      const src = source.hostname === 'pub-2c2ab767f0b9414ebcdd2064565c379e.r2.dev' ? '/r2' + source.pathname : resource.photo.thumb;
      loader.load(src, texture => {
        if (disposed) { texture.dispose(); return; }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        resource.texture = texture;
        resource.front.map = texture;
        resource.front.color.set(0xffffff);
        resource.front.needsUpdate = true;
        if (!ready) { ready = true; onReady(); }
        update();
      }, undefined, () => { if (!disposed && !ready) onError(); });
    });
    renderer.render(scene, camera);
  };
  const update = () => { if (!frame && !disposed) frame = requestAnimationFrame(render); };
  const resize = () => {
    const width = host.clientWidth, height = host.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / Math.max(1, height);
    camera.position.set(0, 0, width < 600 ? 17 : 13);
    camera.updateProjectionMatrix();
    update();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) update(); });
  intersection.observe(host);
  const lost = (event: Event) => { event.preventDefault(); onError(); };
  renderer.domElement.addEventListener('webglcontextlost', lost);
  window.addEventListener('scroll', update, { passive: true });
  reduce.addEventListener('change', update);
  resize();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    intersection.disconnect();
    window.removeEventListener('scroll', update);
    reduce.removeEventListener('change', update);
    renderer.domElement.removeEventListener('webglcontextlost', lost);
    resources.forEach(r => { r.texture?.dispose(); r.geometry.dispose(); r.front.dispose(); r.back.dispose(); });
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
