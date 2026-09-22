'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { FilmPlayer } from './film-player';
import type { Locale } from '@/config/i18n';

type Work = { slug: string; title: string; category: string; year: string; cover: string; previewVideo?: string; video?: string };

export function WorkCard({ work, locale, index }: { work: Work; locale: Locale; index?: number }) {
  const [previewing, setPreviewing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preview = useRef<HTMLVideoElement>(null);
  const supportsHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const stopPreview = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (preview.current) {
      preview.current.pause();
      preview.current.currentTime = 0;
    }
    setPreviewing(false);
  };
  const startPreview = () => {
    if (!work.previewVideo || !supportsHover()) return;
    timer.current = setTimeout(() => {
      setPreviewing(true);
      preview.current?.play().catch(() => setPreviewing(false));
    }, 800);
  };
  const openPlayer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    stopPreview();
    setPlaying(true);
  };

  return <>
    <article onMouseEnter={startPreview} onMouseLeave={stopPreview} className="group block shrink-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <Link href={`/${locale}/work/${work.slug}`} onBlur={stopPreview} className="block h-full w-full">
          <img src={work.cover} alt="" className={`h-full w-full object-cover transition duration-500 ${previewing ? 'opacity-0' : 'opacity-100'}`} />
          {work.previewVideo && <video ref={preview} muted loop playsInline preload="metadata" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${previewing ? 'opacity-100' : 'opacity-0'}`}><source src={work.previewVideo} /></video>}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 text-xs">{String((index ?? 0) + 1).padStart(2, '0')}</span>
        </Link>
        {work.video && <>
          <div className="pointer-events-none absolute inset-0 bg-black/25 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />
          <button type="button" onClick={openPlayer} aria-label={locale === 'zh' ? `播放《${work.title}》` : `Play ${work.title}`} className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-xl transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 md:hover:scale-105">
            <span aria-hidden="true" className="ml-0.5 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-black" />
          </button>
        </>}
      </div>
      <Link href={`/${locale}/work/${work.slug}`} className="flex justify-between pt-3 text-xs">
        <div><h3 className="text-sm font-medium text-mist">{work.title}</h3><p className="mt-1 text-white/40">{work.category}</p></div>
        <span className="text-white/40">{work.year}</span>
      </Link>
    </article>
    {playing && work.video && <FilmPlayer source={work.video} poster={work.cover} title={work.title} locale={locale} modal onClose={() => setPlaying(false)} />}
  </>;
}
