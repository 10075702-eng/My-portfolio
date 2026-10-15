import { PhotosLibrary } from '@/components/photos-library';
import { PhotoSpiral } from '@/components/photo-spiral';
import type { Locale } from '@/config/i18n';
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;const l=locale as Locale;return <main><PhotoSpiral locale={l}/><section id="photo-archive" className="page-pad pb-24 pt-28"><p className="ex-eyebrow mb-10">THE ARCHIVE / {l==='zh'?'完整图库':'ALL PHOTOGRAPHS'}</p><PhotosLibrary locale={l}/></section></main>;}
