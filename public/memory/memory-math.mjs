export const RAD = Math.PI / 180;
export const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
export const wrap = n => ((n + 180) % 360 + 360) % 360 - 180;
export const damp = (from, to, rate, dt) => from + (to - from) * (1 - Math.exp(-rate * dt));
export function direction(yaw, pitch) { const y=yaw*RAD,p=pitch*RAD; return [Math.sin(y)*Math.cos(p),Math.sin(p),Math.cos(y)*Math.cos(p)]; }
export function distance(a,b) { return Math.acos(clamp(a.reduce((s,n,i)=>s+n*b[i],0),-1,1))/RAD; }
export function rayAt(x,y,width,height,yaw,pitch,lens) {
  let dx=(2*x/width-1)*width/height*lens,dy=(1-2*y/height)*lens,dz=1;
  const n=Math.hypot(dx,dy,dz);dx/=n;dy/=n;dz/=n;
  const cp=Math.cos(pitch*RAD),sp=Math.sin(pitch*RAD),cy=Math.cos(yaw*RAD),sy=Math.sin(yaw*RAD);
  const py=dy*cp+dz*sp,pz=dz*cp-dy*sp;
  return [dx*cy+pz*sy,py,pz*cy-dx*sy];
}
export function traceStrength(age) { return .12 + .66 * Math.exp(-Math.max(0,age)/65); }
export function pickFocus(angles, current=-1) {
  const next=angles.indexOf(Math.min(...angles));
  if(angles[next]>32)return -1;
  return current>=0 && angles[current]<35 && angles[current] < angles[next]+3 ? current : next;
}
