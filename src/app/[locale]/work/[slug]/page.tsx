import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findFormalWork, formalWorks } from '@/config/works';
import { t, type Locale } from '@/config/i18n';
import { FilmPlayer } from '@/components/film-player';

export function generateStaticParams() {
  return ['zh', 'en'].flatMap(locale => formalWorks.map(work => ({ locale, slug: work.slug })));
}

export default async function WorkDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const work = findFormalWork(slug);
  if (!work) notFound();
  const copy = t(l);

  return (
    <main className="pb-24">
      <section className="relative flex min-h-[75vh] items-end overflow-hidden">
        <img src={work.media.cover} alt={work[l].title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-black/30" />
        <div className="page-pad relative z-10 pb-14">
          <p className="mono text-[10px] text-acid">{work[l].category} / {work.year}</p>
          <h1 className="mt-3 text-5xl md:text-8xl">{work[l].title}</h1>
          <p className="mt-5 max-w-xl text-white/75">{work[l].summary}</p>
        </div>
      </section>
      {work.media.video && <section className="page-pad pt-12 md:pt-16">
        <FilmPlayer source={work.media.video} poster={work.media.cover} title={work[l].title} locale={l} />
      </section>}
      <section className="page-pad py-20">
        <div className="max-w-3xl space-y-5 text-xl md:text-3xl">{work[l].overview.map(item => <p key={item}>{item}</p>)}</div>
        <div className="mt-10 flex flex-wrap gap-2">{work.tools.map(tool => <span key={tool} className="rounded-full border border-white/20 px-3 py-1 text-xs">{tool}</span>)}</div>
        <p className="mono mt-20 text-[10px] text-acid">MAKING OF</p>
        <h2 className="mt-3 text-4xl md:text-6xl">{copy.makingOf}</h2>
        <div className="mt-12 space-y-16">
          {work.sections.map((section, index) => (
            <article key={section.key} className="grid gap-6 border-t border-white/15 pt-5 md:grid-cols-[.4fr_1fr]">
              <div><p className="mono text-[10px] text-acid">{String(index + 1).padStart(2, '0')}</p><h3 className="mt-2 text-2xl">{section[l].title}</h3></div>
              <div>
                <p className="text-sm leading-7 text-white/65">{section[l].body}</p>
                {section.media.length === 0 && <div className="mt-6 grid min-h-48 place-items-center border border-dashed border-white/25 text-xs text-white/35">{l === 'zh' ? '此处待插入图片/视频' : 'Media to be added here'}</div>}
              </div>
            </article>
          ))}
        </div>
        <Link href={`/${l}/work`} className="mt-20 inline-block border-b border-white pb-1 text-xs">← {copy.backToWork}</Link>
      </section>
    </main>
  );
}
