'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { media, type ShortItem } from '@/config/media';
import { SafeImage } from './postcards-wall';
import { t, type Locale } from '@/config/i18n';

export function ShortsGallery({ locale }: { locale: Locale }) {
  const copy = t(locale).shorts;
  const [category, setCategory] = useState<'all' | ShortItem['category']>('all');
  const [year, setYear] = useState<'all' | ShortItem['year']>('all');
  const [selected, setSelected] = useState<ShortItem | null>(null);
  const video = useRef<HTMLVideoElement>(null);

  const categoryItems = category === 'all' ? media.shorts : media.shorts.filter(item => item.category === category);
  const years = useMemo(() => [...new Set(categoryItems.map(item => item.year))].sort(), [categoryItems]);
  const items = year === 'all' ? categoryItems : categoryItems.filter(item => item.year === year);
  const label = (item: ShortItem) => item.title[locale] || item.title.zh;

  useEffect(() => {
    if (year !== 'all' && !years.includes(year)) setYear('all');
  }, [category, years, year]);

  useEffect(() => {
    if (!selected) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', close);
    video.current?.play().catch(() => {});
    return () => {
      video.current?.pause();
      document.body.style.overflow = prior;
      window.removeEventListener('keydown', close);
    };
  }, [selected]);

  const categoryLabels = { all: copy.all, insta360: copy.insta360, personal: copy.personal };

  return <>
    <div>
      <p className="mono mb-3 text-[10px] tracking-[.16em] text-white/45">{copy.category}</p>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'insta360', 'personal'] as const).map(value => <button key={value} onClick={() => setCategory(value)} className={`shrink-0 rounded-full border px-4 py-2 text-xs ${category === value ? 'border-acid bg-acid text-black' : 'border-white/30'}`}>{categoryLabels[value]}</button>)}
      </div>
    </div>
    <div className="mt-5">
      <p className="mono mb-3 text-[10px] tracking-[.16em] text-white/45">{copy.year}</p>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', ...years] as const).map(value => <button key={value} onClick={() => setYear(value)} className={`shrink-0 rounded-full border px-4 py-2 text-xs ${year === value ? 'border-acid text-acid' : 'border-white/30'}`}>{value === 'all' ? copy.all : value}</button>)}
      </div>
    </div>

    <div className="shorts-masonry mt-10">
      {items.map(item => <button key={item.id} onClick={() => setSelected(item)} className="mb-5 block w-full break-inside-avoid text-left">
        <div className={`relative overflow-hidden bg-zinc-900 ${item.aspect === 'portrait' ? 'aspect-[9/16]' : item.aspect === 'square' ? 'aspect-square' : 'aspect-video'}`}>
          <SafeImage src={item.cover} alt={label(item)} fallback={locale === 'zh' ? <>待放入封面<br />/media/shorts/</> : <>Cover to be added<br />/media/shorts/</>} />
          <span className="mono absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-1 text-[10px]">{item.duration}</span>
        </div>
        <p className="mt-2 text-sm">{label(item)}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px]">
          <span className="text-acid">{copy[item.type]}</span>
          {item.device && <><span className="text-white/35">·</span><span className="text-white/40">{item.device}</span></>}
        </div>
      </button>)}
    </div>

    {selected && <div role="dialog" aria-modal="true" className="fixed inset-0 z-[70] grid place-items-center bg-black/95 p-0 md:p-8">
      <div className={`flex h-dvh w-full flex-col md:h-full ${selected.aspect === 'portrait' ? 'max-w-[560px]' : 'max-w-6xl'}`}>
        <header className="flex justify-between gap-5 px-4 py-3 md:px-0"><p className="text-sm">{label(selected)}</p><button onClick={() => setSelected(null)} className="shrink-0 rounded-full border border-white/40 px-3 py-2 text-xs">{locale === 'zh' ? '关闭 ×' : 'Close ×'}</button></header>
        <video ref={video} autoPlay controls playsInline preload="metadata" className="min-h-0 w-full flex-1 bg-black object-contain">
          <source src={selected.video} type="video/mp4" />
        </video>
        <div className="px-4 py-3 text-xs md:px-0"><span className="text-acid">{copy[selected.type]}</span>{selected.device && <><span className="px-1.5 text-white/35">·</span><span className="text-white/40">{selected.device}</span></>}<span className="text-white/60"> · {selected.duration}</span></div>
      </div>
    </div>}
  </>;
}
