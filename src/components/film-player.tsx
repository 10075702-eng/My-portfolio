'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from '@/config/i18n';

type Props = { source: string; poster?: string; title: string; locale: Locale; modal?: boolean; onClose?: () => void };

export function FilmPlayer({ source, poster, title, locale, modal = false, onClose }: Props) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!modal) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', closeOnEscape);
    video.current?.play().catch(() => {});

    return () => {
      const element = video.current;
      element?.pause();
      element?.removeAttribute('src');
      element?.load();
      document.body.style.overflow = priorOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [modal, onClose]);

  const player = <video ref={video} src={source} poster={poster} controls playsInline preload="metadata" className={modal ? 'h-full w-full bg-black object-contain' : 'w-full bg-black'} aria-label={title} />;

  if (!modal) return player;

  return <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[80] grid place-items-center bg-black/95 p-0 md:p-8">
    <div className="flex h-dvh w-full max-w-6xl flex-col md:h-full">
      <header className="flex items-center justify-between gap-5 px-4 py-3 md:px-0"><p className="text-sm">{title}</p><button type="button" onClick={onClose} className="shrink-0 rounded-full border border-white/40 px-3 py-2 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-acid">{locale === 'zh' ? '关闭 ×' : 'Close ×'}</button></header>
      <div className="min-h-0 flex-1">{player}</div>
    </div>
  </div>;
}
