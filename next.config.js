/** @type {import('next').NextConfig} */
const R2_HOST = 'https://pub-2c2ab767f0b9414ebcdd2064565c379e.r2.dev';

const nextConfig = {
  // 把 R2 的资源代理到本站域名下。
  // 全景查看器（WebGL）加载纹理时必须走 CORS，而 R2 公开域名默认不返回 CORS 头；
  // 走同源路径就没有跨域问题。换存储域名时只改上面的 R2_HOST。
  async rewrites() {
    return [
      { source: '/r2/:path*', destination: `${R2_HOST}/:path*` },
    ];
  },
};

module.exports = nextConfig;
