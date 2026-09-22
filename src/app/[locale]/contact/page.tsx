import { type Locale } from '@/config/i18n';

const copy = {
  zh: {
    label: "让我们做点什么",
    title: "一起发生。",
    emailLabel: "邮箱",
    phoneLabel: "电话",
  },
  en: {
    label: "LET'S MAKE SOMETHING",
    title: "Let's make it happen.",
    emailLabel: "Email",
    phoneLabel: "Phone",
  },
};

const emails = [
  { label: '10075702@network.rca.ac.uk', href: 'mailto:10075702@network.rca.ac.uk' },
  { label: '2996577861@qq.com', href: 'mailto:2996577861@qq.com' },
];

const phones = [
  { label: '+44 7942 286486', href: 'tel:+447942286486' },
  { label: '+86 136 3835 5132', href: 'tel:+8613638355132' },
];

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const c = copy[l];

  return (
    <main className="page-pad flex min-h-screen flex-col bg-acid pt-32 pb-10 text-ink">
      <p className="mono text-[10px]">{c.label}</p>

      <h1 className="my-auto text-6xl md:text-8xl">{c.title}</h1>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <p className="mono text-[10px] opacity-55">{c.emailLabel}</p>
          <div className="mt-3 space-y-2">
            {emails.map((e) => (
              <a key={e.href} href={e.href} className="block text-lg transition hover:opacity-60">
                {e.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mono text-[10px] opacity-55">{c.phoneLabel}</p>
          <div className="mt-3 space-y-2">
            {phones.map((p) => (
              <a key={p.href} href={p.href} className="block text-lg transition hover:opacity-60">
                {p.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
