'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { exhibitionVideos, exhibitionCopy } from '@/config/exhibition';
import type { ShortItem } from '@/config/media';
import type { Locale } from '@/config/i18n';
import { FilmPlayer } from './film-player';

function Poster({item,locale,onOpen}:{item:ShortItem;locale:Locale;onOpen:()=>void}) {
 const [hover,setHover]=useState(false); const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const clear=()=>{if(timer.current) clearTimeout(timer.current);setHover(false);};
 useEffect(()=>()=>{if(timer.current) clearTimeout(timer.current);},[]);
 return <button className={'ex-poster '+(item.aspect==='portrait'?'is-portrait':'')} onMouseEnter={()=>{if(matchMedia('(hover: hover)').matches) timer.current=setTimeout(()=>setHover(true),700);}} onMouseLeave={clear} onBlur={clear} onClick={()=>{clear();onOpen();}}>
  <div className="ex-poster-media"><img loading="lazy" src={item.cover} alt="" />{hover&&<video src={item.video} muted autoPlay loop playsInline preload="metadata" onTimeUpdate={e=>{if(e.currentTarget.currentTime>10)e.currentTarget.currentTime=0;}}/>}<span className="ex-poster-play">↗</span></div>
  <div className="ex-poster-caption"><h2>{item.title[locale]}</h2><span>{item.year} / {item.duration}</span></div>
  <p className="ex-eyebrow">{item.type==='vlog'?'VLOG':item.device||'PERSONAL WORK'}</p>
 </button>;
}
function CounterScroll({ items, locale, onOpen }: { items: ShortItem[]; locale: Locale; onOpen: (item: ShortItem) => void }) {
  const section = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = section.current!, view = viewport.current!, a = left.current!, b = right.current!;
    const desktop = matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let travel = [0, 0];
    let distance = 0;
    const paint = () => {
      if (!desktop.matches) { a.style.transform = ''; b.style.transform = ''; return; }
      const progress = Math.max(0, Math.min(1, (30 - host.getBoundingClientRect().top) / Math.max(1, distance)));
      a.style.transform = `translateY(${-travel[0] * progress}px)`;
      b.style.transform = `translateY(${-travel[1] * (1 - progress)}px)`;
    };
    const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(paint); };
    const measure = () => {
      travel = [Math.max(0, a.scrollHeight - view.clientHeight), Math.max(0, b.scrollHeight - view.clientHeight)];
      distance = Math.max(...travel);
      host.style.height = desktop.matches ? `${view.clientHeight + distance}px` : '';
      update();
    };
    const observer = new ResizeObserver(measure);
    [view, a, b].forEach(el => observer.observe(el));
    desktop.addEventListener('change', measure);
    window.addEventListener('scroll', update, { passive: true });
    measure();
    return () => { observer.disconnect(); desktop.removeEventListener('change', measure); window.removeEventListener('scroll', update); cancelAnimationFrame(frame); };
  }, [items]);
  return <div ref={section} className="ex-counter-scroll">
    <div ref={viewport} className="ex-counter-viewport">
      {[0, 1].map(column => <div ref={column === 0 ? left : right} key={column} className="ex-counter-track">
        {items.filter((_, i) => i % 2 === column).map(item => <Poster key={item.id} item={item} locale={locale} onOpen={() => onOpen(item)} />)}
      </div>)}
    </div>
  </div>;
}
export function MovingGallery({locale}:{locale:Locale}) {
 const [category,setCategory]=useState('all'); const [selected,setSelected]=useState<ShortItem|null>(null);const copy=exhibitionCopy[locale];
 const close=useCallback(()=>setSelected(null),[]);
 const items=exhibitionVideos.filter(x=>category==='all'||(category==='vlog'?x.type==='vlog':x.category===category&&x.type!=='vlog'));
 return <main className="ex-moving"><header className="ex-gallery-heading"><p className="ex-eyebrow">A COLLECTION IN MOTION</p><h1>{copy.moving}<span>({String(items.length).padStart(2,'0')})</span></h1><p className="ex-eyebrow">{copy.scroll} ↓</p></header>
 <nav lang={locale} className="ex-category-rail" aria-label={copy.moving}><span className="ex-rail-mark">JZ.</span>{(['all','insta360','personal','vlog'] as const).map(key=><button key={key} aria-pressed={category===key} onClick={()=>{setCategory(key);window.scrollTo({top:0,behavior:'smooth'});}}>{copy[key]}</button>)}<span className="ex-rail-end">SELECTED / 2024—26</span></nav>
 <CounterScroll key={category} items={items} locale={locale} onOpen={setSelected}/>
 {selected&&<FilmPlayer source={selected.video} poster={selected.cover} title={selected.title[locale]} locale={locale} modal onClose={close}/>}
 </main>;
}

