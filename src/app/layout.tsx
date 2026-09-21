import type { Metadata } from 'next'; import './globals.css';
export const metadata: Metadata = { title: '周俊行 / Junhang Zhou · 影像作品集', description: '影像创作者 · 擅长摄影、无人机航拍与三维虚拟制作' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body><div className="film-grain"/>{children}</body></html> }
