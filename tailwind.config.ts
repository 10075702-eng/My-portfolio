import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { fontFamily: { sans: ['var(--font-sans)', 'sans-serif'], display: ['var(--font-display)', 'serif'] }, colors: { ink: '#07090b', mist: '#f1f1ee', acid: '#d9ff3f' } } }, plugins: [] };
export default config;
