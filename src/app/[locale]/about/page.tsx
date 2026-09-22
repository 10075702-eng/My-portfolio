import { media } from '@/config/media';
import { type Locale } from '@/config/i18n';

const copy = {
  zh: {
    label: '关于 周俊行',
    title: '以镜头为起点，漫游真实与虚拟。',
    body: [
      '我是周俊行。四川美术学院影视摄影与制作本科毕业，现就读于皇家艺术学院 Digital Direction 硕士课程。',
      '我的创作从实拍开始。无人机与全景相机是我最常用的两种工具——一个把视角带离地面，一个把视角放进空间内部。近两年我作为影石 Insta360 的签约创作者，持续用全景相机记录旅途与城市。',
      '从实拍得到的素材，我不会停在记录。我把它们带进虚拟制作：用 Unreal Engine 与 Blender 重建场景，让未建成的地皮成为实景，让火星的地表从零开始生长。「先在世界里采集，再在虚拟空间中重建」，是我目前工作的主线。',
      '我关心的是：当影像不再受物理世界的限制时，它还能保留多少真实。',
    ],
  },
  en: {
    label: 'ABOUT JUNHANG ZHOU',
    title: 'Starting from the lens, drifting between the real and the virtual.',
    body: [
      'I am Junhang Zhou. I completed my BA in Film Photography and Production at Sichuan Fine Arts Institute, and I am now studying Digital Direction at the Royal College of Art.',
      'My practice begins with shooting. Drones and panoramic cameras are my two main tools — one lifts the view away from the ground, the other places it inside a space. For the past two years I have worked as a signed creator for Insta360, recording journeys and cities with a 360 camera.',
      'I do not stop at what I capture. I take the footage into virtual production: rebuilding scenes in Unreal Engine and Blender, turning unbuilt land into finished streets, growing a Martian surface from nothing. Collecting in the world and rebuilding in virtual space — that is the through-line of my current work.',
      'What interests me is this: when an image is no longer bound by the physical world, how much of the real does it keep?',
    ],
  },
};

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const c = copy[l];

  return (
    <main className="page-pad min-h-screen pt-32 pb-24">
      <p className="mono text-[10px] text-acid">{c.label}</p>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <h1 className="text-4xl leading-tight tracking-[-.04em] md:text-6xl">{c.title}</h1>
        <img
          src={media.avatar}
          alt="Junhang Zhou"
          className="aspect-[4/5] w-full object-cover grayscale"
        />
      </div>

      <div className="mt-16 max-w-3xl space-y-6 text-sm leading-8 text-white/70">
        {c.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </main>
  );
}
