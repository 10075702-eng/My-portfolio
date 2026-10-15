'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { homeFilms, exhibitionCopy, galleryTeasers } from '@/config/exhibition';
import type { Locale } from '@/config/i18n';

export function ExhibitionHome({ locale }: { locale: Locale }) {
 const [index,setIndex]=useState(0);
 const [paused,setPaused]=useState(false);
 const video=useRef<HTMLVideoElement>(null);
 const film=homeFilms[index]; const copy=exhibitionCopy[locale];
 useEffect(()=>{ if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true); },[]);
 useEffect(()=>{ if(paused) video.current?.pause(); else video.current?.play().catch(()=>{}); },[index,paused]);
 return <main>
  <section className="ex-home">
   <img className="ex-home-bg" src={film.cover} alt="" />
   <video key={film.id} ref={video} className="ex-home-bg ex-video-enter" src={film.video} poster={film.cover} muted playsInline preload="metadata" autoPlay={!paused} onEnded={()=>setIndex(i=>(i+1)%homeFilms.length)} />
   <div className="ex-home-shade" />
   <div className="ex-home-copy"><p className="ex-eyebrow">JUNHANG ZHOU — IMAGE MAKER</p><h1>{copy.title}</h1><p>{copy.subtitle}</p></div>
   <div className="ex-home-bottom"><span className="ex-eyebrow hidden md:block">01 — FIELD OF VIEW<br/>{film.title[locale]}</span>
    <div className="ex-film-picker">{homeFilms.map((item,i)=><button key={item.id} aria-label={item.title[locale]} aria-pressed={index===i} onClick={()=>setIndex(i)}><img src={item.cover} alt="" /><span>{String(i+1).padStart(2,'0')}</span></button>)}</div>
    <button className="ex-text-button" onClick={()=>setPaused(x=>!x)}>{paused?copy.play:copy.pause} {paused?'▷':'Ⅱ'}</button>
   </div>
  </section>
  <section className="ex-portals page-pad" id="galleries">
   <div className="ex-portals-heading"><p className="ex-eyebrow">AN OPEN COLLECTION</p><h2>{copy.explore}</h2></div>
   {[['moving-images',copy.moving,'01'],['panorama',copy.panorama,'02'],['photos',copy.photography,'03'],['work',copy.films,'04'],['postcards',copy.postcards,'05']].map(([href,label,n])=>
    <Link className="ex-portal" key={href} href={`/${locale}/${href}`}>
      <img src={galleryTeasers[href][0]} alt="" loading="lazy"/>
      <div className="ex-portal-shade"/>
      <span className="ex-portal-number ex-eyebrow">{n} / 05</span>
      <div className="ex-portal-caption"><h3>{label}</h3><span className="ex-eyebrow">{copy.explore}</span></div>
      <span className="ex-portal-arrow" aria-hidden="true">↗</span>
    </Link>)}
  </section>
 </main>;
}


