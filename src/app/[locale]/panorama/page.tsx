import { PanoramaLibrary } from '@/components/panorama-library';
import { type Locale } from '@/config/i18n';
import { panoramaLibraryMeta } from '@/config/works';

export default async function Panorama({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const meta = panoramaLibraryMeta[l];

  return (
    <main className="page-pad min-h-screen pt-32 pb-24">
      <p className="mono text-[10px] tracking-[.2em] text-acid">360° PHOTO LIBRARY</p>
      <h1 className="mt-4 text-5xl tracking-[-.08em] md:text-7xl">{meta.title}</h1>
      <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65">{meta.summary}</p>
      <div className="mt-14"><PanoramaLibrary locale={l} /></div>
    </main>
  );
}
