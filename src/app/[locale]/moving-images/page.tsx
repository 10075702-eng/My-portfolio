import { MovingGallery } from '@/components/moving-gallery';
import type { Locale } from '@/config/i18n';
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;return <MovingGallery locale={locale as Locale}/>;}

