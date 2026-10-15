'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { exhibitionCopy } from '@/config/exhibition';
import type { Locale } from '@/config/i18n';

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const router = useRouter();
  const c = exhibitionCopy[locale];
  const links = [['work', c.films], ['moving-images', c.moving], ['panorama', c.panorama], ['photos', c.photography], ['postcards', c.postcards], ['about', locale === 'zh' ? '关于我' : 'About'], ['contact', locale === 'zh' ? '联系' : 'Contact']];
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [open]);
  return <header ref={root} className="ex-header" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
    <Link className="ex-wordmark" href={`/${locale}`}>JUNHANG ZHOU<span>影像创作者 / IMAGE MAKER</span></Link>
    <div className="flex items-center gap-3">
      <button className="ex-nav-button" onClick={() => { const next = locale === 'zh' ? 'en' : 'zh'; localStorage.setItem('zjx-locale', next); router.push(path.replace(`/${locale}`, `/${next}`)); }}>{locale === 'zh' ? 'EN' : '中文'}</button>
      <button ref={trigger} aria-expanded={open} aria-controls="site-index" className="ex-nav-button" onClick={() => setOpen(!open)}>{open ? c.close : c.menu} {open ? '−' : '+'}</button>
    </div>
    {open && <nav id="site-index" aria-label={c.menu} className="ex-menu">
      {links.map(([href, label], i) => <Link key={href} href={`/${locale}/${href}`} onClick={() => setOpen(false)}><small>0{i + 1}</small>{label}<span>↗</span></Link>)}
    </nav>}
  </header>;
}
