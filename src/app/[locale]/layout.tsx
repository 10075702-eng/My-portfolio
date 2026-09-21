import { notFound } from 'next/navigation'; import { SiteHeader } from '@/components/site-header'; import { locales, type Locale } from '@/config/i18n';
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) { const { locale } = await params; if (!locales.includes(locale as Locale)) notFound(); return <><SiteHeader locale={locale as Locale}/>{children}</> }
