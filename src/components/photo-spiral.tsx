'use client';
import { useEffect, useRef, useState } from 'react';
import { photoSpiralFeatured, exhibitionCopy } from '@/config/exhibition';
import type { Locale } from '@/config/i18n';

export function PhotoSpiral({ locale }: { locale: Locale }) {
  const section = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const copy = exhibitionCopy[locale];
  useEffect(() => {
    let stopped = false;
    let dispose: (() => void) | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      import('./photo-helix-scene').then(({ mountPhotoHelix }) => {
        if (stopped || !host.current || !section.current) return;
        try {
          dispose = mountPhotoHelix(host.current, section.current, photoSpiralFeatured,
            () => setStatus('ready'), () => setStatus('fallback'));
        } catch { setStatus('fallback'); }
      }).catch(() => { if (!stopped) setStatus('fallback'); });
    }, { rootMargin: '200px' });
    observer.observe(section.current!);
    return () => { stopped = true; observer.disconnect(); dispose?.(); };
  }, []);
  return <section ref={section} className="ex-helix-scroll">
    <div className="ex-helix-stage">
      <div className="ex-helix-backdrop" aria-hidden="true">PHOTOGRAPHS</div>
      <div ref={host} className="ex-helix-canvas" aria-hidden="true" />
      {status !== 'ready' && <div className="ex-helix-fallback">
        <img src={photoSpiralFeatured[0].thumb} alt="" />
        <span>{status === 'loading' ? (locale === 'zh' ? '正在展开影像…' : 'Unfolding the photographs…') : (locale === 'zh' ? '可直接进入完整图库浏览' : 'Explore the full archive below')}</span>
      </div>}
      <div className="ex-helix-heading"><p className="ex-eyebrow">FRAGMENTS OF PLACES</p><h1>{copy.photography}</h1><a href="#photo-archive" className="ex-text-button">{copy.gallery} ↗</a></div>
      <p className="ex-helix-hint ex-eyebrow">{copy.scroll} ↓</p>
    </div>
  </section>;
}


