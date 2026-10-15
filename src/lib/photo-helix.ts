import { PlaneGeometry } from 'three';

// Arc gap prevents neighbouring panels touching; pitch exceeds the tallest panel.
export const HELIX = { radius: 2.8, step: 1.16, arc: 1.06, rise: 0.56, maxHeight: 2.65 };
export function createPhotoCurve(index: number, aspect: number) {
  const width = Math.min(HELIX.radius * HELIX.arc, HELIX.maxHeight * aspect);
  const height = width / aspect;
  const geometry = new PlaneGeometry(width, height, 48, 8);
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const angle = index * HELIX.step + positions.getX(i) / HELIX.radius;
    positions.setXYZ(i,
      Math.sin(angle) * HELIX.radius,
      positions.getY(i) - angle * HELIX.rise,
      Math.cos(angle) * HELIX.radius);
  }
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}
