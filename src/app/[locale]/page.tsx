import { ExhibitionHome } from '@/components/exhibition-home';
import type { Locale } from '@/config/i18n';
export default async function Home({params}:{params:Promise<{locale:string}>}) { const {locale}=await params; return <ExhibitionHome locale={locale as Locale}/>; }
