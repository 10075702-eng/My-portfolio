'use client';

import { useEffect, useMemo, useState } from 'react';
import { SafeImage } from './postcards-wall';
import { photos, photoPlaces, photoRegions, type PhotoItem } from '@/config/photos';
import type { Locale } from '@/config/i18n';

export function PhotosLibrary({ locale }: { locale: Locale }) {
  const [region, setRegion] = useState('all');
  const [selected, setSelected] = useState<PhotoItem | null>(null);
  const [imageState, setImageState] = useState<'loading' | 'ready' | 'failed'>('loading');
  const regions = useMemo(() => [...new Set(photos.map(item => item.region))], []);
  const visible = region === 'all' ? photos : photos.filter(item => item.region === region);
  const places = useMemo(() => [...new Set(visible.map(item => item.place))], [visible]);
  const current = selected ? visible.filter(item => item.region === selected.region && item.place === selected.place) : [];
  const index = selected ? current.findIndex(item => item.id === selected.id) : -1;
  const title = (item: PhotoItem) => item.title[locale] || item.title.zh;
  const placeName = (place: string) => photoPlaces[place]?.[locale] || place;
  const categoryLabel = (category: PhotoItem['category']) => category === 'still' ? (locale === 'zh' ? '静帧' : 'Still') : (locale === 'zh' ? '照片' : 'Photograph');

  const select = (item: PhotoItem) => {
    setImageState('loading');
    setSelected(item);
  };
  const move = (offset: number) => {
    const next = current[index + offset];
    if (next) select(next);
  };
  const renderMasonry = (items: PhotoItem[]) => <div className="shorts-masonry">
    {items.map(item => <button key={item.id} onClick={() => select(item)} className="mb-5 block w-full break-inside-avoid text-left">
      <div className="overflow-hidden bg-zinc-900" style={{ aspectRatio: `${item.w} / ${item.h}` }}>
        <SafeImage src={item.thumb} alt={title(item)} fallback={locale === 'zh' ? <>图片加载失败</> : <>Image unavailable</>} />
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <p className="text-sm">{title(item)}</p>
        <span className="shrink-0 text-[11px] text-white/40">{categoryLabel(item.category)}</span>
      </div>
    </button>)}
  </div>;

  useEffect(() => {
    if (!selected) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [selected, current, index]);

  useEffect(() => {
    if (!selected) return;
    [current[index - 1], current[index + 1]].filter(Boolean).forEach(item => {
      const image = new Image();
      image.src = item.src;
    });
  }, [selected?.id, current, index]);

  return <>
    <div className="flex flex-wrap gap-2">
      <button onClick={() => setRegion('all')} className={`rounded-full border px-3 py-1.5 text-xs ${region === 'all' ? 'border-acid text-acid' : 'border-white/25'}`}>{locale === 'zh' ? '全部' : 'All'}</button>
      {regions.map(item => <button key={item} onClick={() => setRegion(item)} className={`rounded-full border px-3 py-1.5 text-xs ${region === item ? 'border-acid text-acid' : 'border-white/25'}`}>{photoRegions[item][locale]}</button>)}
    </div>

    {places.map(place => {
      const items = visible.filter(item => item.place === place);
      const photoItems = items.filter(item => item.category === 'photo');
      const stillItems = items.filter(item => item.category === 'still');
      return <section key={place} className="mt-10 md:mt-16">
        <h2 className="mono mb-4 text-[11px] tracking-[.14em] text-white/85 md:mb-5">
          {placeName(place)} <span className="px-2 text-white/40">·</span><span className="text-white/40">{items.length}</span>
        </h2>
        {photoItems.length > 0 && renderMasonry(photoItems)}
        {stillItems.length > 0 && <div className={photoItems.length > 0 ? 'mt-7' : undefined}>{renderMasonry(stillItems)}</div>}
      </section>;
    })}

    {!visible.length && <p className="mt-16 text-center text-sm text-white/45">{locale === 'zh' ? '这个地区暂时还没有照片。' : 'There are no photographs in this region yet.'}</p>}

    {selected && <div role="dialog" aria-modal="true" aria-label={title(selected)} className="fixed inset-0 z-[70] grid place-items-center bg-black/95 p-0 md:p-8">
      <div className="flex h-dvh w-full max-w-6xl flex-col md:h-full">
        <header className="flex items-start justify-between gap-5 px-4 py-3 md:px-0">
          <div>
            <p className="text-sm">{title(selected)}</p>
            <p className="mt-1 text-xs text-white/50">{photoRegions[selected.region][locale]} · {placeName(selected.place)} · {categoryLabel(selected.category)}</p>
            {selected.note[locale] && <p className="mt-2 text-xs text-white/65">{selected.note[locale]}</p>}
          </div>
          <button onClick={() => setSelected(null)} className="shrink-0 rounded-full border border-white/40 px-3 py-2 text-xs">{locale === 'zh' ? '关闭 ×' : 'Close ×'}</button>
        </header>
        <div className="relative min-h-0 flex-1 bg-zinc-950">
          <img src={selected.src} alt={title(selected)} onLoad={() => setImageState('ready')} onError={() => setImageState('failed')} className={`h-full w-full object-contain transition ${imageState === 'ready' ? 'opacity-100' : 'opacity-0'}`} />
          {imageState === 'loading' && <div className="absolute inset-0 grid place-items-center text-xs text-white/65">{locale === 'zh' ? '正在载入图片…' : 'Loading image…'}</div>}
          {imageState === 'failed' && <div className="absolute inset-0 grid place-items-center text-xs text-white/65">{locale === 'zh' ? '图片载入失败，请检查素材地址。' : 'Image failed to load. Please check the media URL.'}</div>}
        </div>
        <footer className="flex justify-between px-4 py-3 md:px-0">
          <button disabled={index <= 0} onClick={() => move(-1)} className="text-xs disabled:opacity-20">←</button>
          <button disabled={index >= current.length - 1} onClick={() => move(1)} className="text-xs disabled:opacity-20">→</button>
        </footer>
      </div>
    </div>}
  </>;
}
