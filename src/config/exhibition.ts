import { media } from './media';
import { photos } from './photos';
import { panoramas } from './panoramas';

// 第一版展厅选片清单。修改 ID 即可替换，原始资料完整保留。
export const movingImageIds = ['drone-04','drone-01','x5-26-01','ace-01','ace-02','ace-08','ace-09','own-24-03','own-24-06','own-25-02','vlog-06','vlog-04'];
export const exhibitionVideos = movingImageIds.flatMap(id => { const item = media.shorts.find(x => x.id === id); return item ? [item] : []; });
export const homeFilms = ['drone-04','drone-01','x5-26-01','ace-08'].flatMap(id => { const item = media.shorts.find(x => x.id === id); return item ? [item] : []; });
export const photoSpiralFeatured = photos.filter((_, i) => i % 8 === 0).slice(0, 21);
// 首页入口只使用缩略图，不预加载影片或 8K 全景。
export const galleryTeasers: Record<string, string[]> = {
 'moving-images': homeFilms.slice(0, 3).map(item => item.cover),
 panorama: panoramas.slice(0, 2).map(item => item.thumb),
 photos: photoSpiralFeatured.slice(0, 3).map(item => item.thumb),
 work: [media.workCovers.echoes, media.workCovers.marshal, media.workCovers.missing],
 postcards: media.postcards.slice(0, 3).map(item => item.front),
};
export const exhibitionCopy = {
 zh: { title:'让视线，自由一点。', subtitle:'周俊行 · 摄影 / 航拍 / 虚拟制作', explore:'进入展厅', pause:'暂停背景', play:'播放背景', moving:'视频展厅', all:'全部影像', insta360:'影石作品', personal:'个人创作', vlog:'Vlogs', photography:'照片与静帧', gallery:'进入完整图库', panorama:'全景展厅', postcards:'明信片', films:'主要作品', menu:'目录', close:'关闭', scroll:'滚动探索' },
 en: { title:'A different way of seeing.', subtitle:'Junhang Zhou · Photography / Aerial / Virtual Production', explore:'Explore the galleries', pause:'Pause background', play:'Play background', moving:'Moving Images', all:'All films', insta360:'Insta360 Works', personal:'Personal Work', vlog:'Vlogs', photography:'Photographs & Stills', gallery:'Open the archive', panorama:'Panorama', postcards:'Postcards', films:'Selected Films', menu:'Index', close:'Close', scroll:'Scroll to explore' }
};

