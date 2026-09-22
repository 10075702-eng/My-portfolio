/**
 * 全站媒体唯一入口。将 URL 替换为 /media/你的文件名，即可切换成自己的素材。
 * 360 视频：严格 2:1 且不超过 4096×2048；360 图片可为 8192×4096。
 * Hero：建议 1920×1080、8–15 秒、静音循环、3–5MB。
 */
export const media = {
  heroVideo: '/media/hero/hero.mp4',
  avatar: 'https://images.unsplash.com/photo-1542038382126-77ae2819338d?auto=format&fit=crop&w=1200&q=85',
  panoramas: { photo: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg', video: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.mp4' },
  workCovers: { echoes: '/media/covers/echoes.jpg', panorama: '/media/covers/panorama.jpg', marshal: '/media/covers/marshal.jpg', missing: '/media/covers/missing.jpg' },
  previewVideos: { echoes: 'https://cdn.coverr.co/videos/coverr-a-man-walking-through-a-forest-1574/1080p.mp4', panorama: 'https://cdn.coverr.co/videos/coverr-view-from-a-drone-1573/1080p.mp4', marshal: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-a-rocky-island-1572/1080p.mp4', missing: 'https://cdn.coverr.co/videos/coverr-a-man-walking-through-a-forest-1574/1080p.mp4' },
  shorts: [
    { id: 'coastline', title: { zh: '海岸线的风', en: 'English title to be provided.' }, duration: '00:36', aspect: 'landscape', cover: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=85', video: 'https://cdn.coverr.co/videos/coverr-view-from-a-drone-1573/1080p.mp4' },
    { id: 'night-walk', title: { zh: '夜行片段', en: 'English title to be provided.' }, duration: '00:18', aspect: 'portrait', cover: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=85', video: 'https://cdn.coverr.co/videos/coverr-a-man-walking-through-a-forest-1574/1080p.mp4' },
    { id: 'clouds', title: { zh: '云层之上', en: 'English title to be provided.' }, duration: '01:12', aspect: 'landscape', cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85', video: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-a-rocky-island-1572/1080p.mp4' },
    { id: 'vlog-01', title: { zh: 'Vlog / 周末逃离计划', en: 'English title to be provided.' }, duration: '02:04', aspect: 'portrait', cover: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=85', video: 'https://cdn.coverr.co/videos/coverr-a-man-walking-through-a-forest-1574/1080p.mp4' },
  ],
  /** 顺序固定。每张明信片单独列出，直接替换 title / front / back 即可。 */
  postcardSeries: ['大连', '凉山', '火把节', '九寨沟', '上海', '威海', '香港', '香格里拉', '生日'],
  postcards: [

    // ── 大连 ──
    { id: 'pc-01-01', series: '大连', title: { zh: "一舟入雾", en: "A Boat into the Mist" }, front: "/media/postcards/dalian-01-front.jpg", back: '', rotate: '-2deg' },
    { id: 'pc-01-02', series: '大连', title: { zh: "听风望海", en: "Listening to Wind, Watching the Sea" }, front: "/media/postcards/dalian-02-front.jpg", back: '', rotate: '1deg' },
    { id: 'pc-01-03', series: '大连', title: { zh: "城向海开", en: "The City Opens to the Sea" }, front: "/media/postcards/dalian-03-front.jpg", back: '', rotate: '2deg' },
    { id: 'pc-01-04', series: '大连', title: { zh: "岛落沧波", en: "Island Adrift on Blue" }, front: "/media/postcards/dalian-04-front.jpg", back: '', rotate: '-1deg' },
    { id: 'pc-01-05', series: '大连', title: { zh: "潜入深蓝", en: "Diving into Deep Blue" }, front: "/media/postcards/dalian-05-front.jpg", back: '', rotate: '1.5deg' },
    { id: 'pc-01-06', series: '大连', title: { zh: "潮叩石岸", en: "Tide Against the Rocks" }, front: "/media/postcards/dalian-06-front.jpg", back: '', rotate: '-1.5deg' },
    { id: 'pc-01-07', series: '大连', title: { zh: "逐云而飞", en: "Chasing the Clouds" }, front: "/media/postcards/dalian-07-front.jpg", back: '', rotate: '2.5deg' },
    { id: 'pc-01-08', series: '大连', title: { zh: "风过山海", en: "Wind Across the Hills and Sea" }, front: "/media/postcards/dalian-08-front.jpg", back: '', rotate: '-2.5deg' },

    // ── 凉山 ──
    { id: 'pc-02-01', series: '凉山', title: { zh: "云巅山客", en: "Guest on the Cloud Peak" }, front: "/media/postcards/liangshan-01-front.jpg", back: '', rotate: '-2deg' },
    { id: 'pc-02-02', series: '凉山', title: { zh: "古城岁序", en: "The Passing of Time in an Old Town" }, front: "/media/postcards/liangshan-02-front.jpg", back: '', rotate: '1deg' },
    { id: 'pc-02-03', series: '凉山', title: { zh: "山坳人家", en: "Household in the Hollow" }, front: "/media/postcards/liangshan-03-front.jpg", back: '', rotate: '2deg' },
    { id: 'pc-02-04', series: '凉山', title: { zh: "琼炉落照", en: "Fire in the Afterglow" }, front: "/media/postcards/liangshan-04-front.jpg", back: '', rotate: '-1deg' },
    { id: 'pc-02-05', series: '凉山', title: { zh: "碧水藏山", en: "Hills Held in Green Water" }, front: "/media/postcards/liangshan-05-front.jpg", back: '', rotate: '1.5deg' },

    // ── 火把节 ──
    { id: 'pc-03-01', series: '火把节', title: { zh: "围火成圆", en: "A Circle Around the Fire" }, front: "/media/postcards/huobajie-01-front.jpg", back: '', rotate: '-2deg' },
    { id: 'pc-03-02', series: '火把节', title: { zh: "火心共舞", en: "Dancing Around the Flame" }, front: "/media/postcards/huobajie-02-front.jpg", back: '', rotate: '1deg' },
    { id: 'pc-03-03', series: '火把节', title: { zh: "火聚人间", en: "Fire Gathers the People" }, front: "/media/postcards/huobajie-03-front.jpg", back: '', rotate: '2deg' },
    { id: 'pc-03-04', series: '火把节', title: { zh: "烈焰成歌", en: "Blaze into Song" }, front: "/media/postcards/huobajie-04-front.jpg", back: '', rotate: '-1deg' },
    { id: 'pc-03-05', series: '火把节', title: { zh: "薪火不息", en: "The Flame Never Dies" }, front: "/media/postcards/huobajie-05-front.jpg", back: '', rotate: '1.5deg' },
    { id: 'pc-03-06', series: '火把节', title: { zh: "衣绣山河", en: "Mountains and Rivers in Embroidery" }, front: "/media/postcards/huobajie-06-front.jpg", back: '', rotate: '-1.5deg' },
    { id: 'pc-03-07', series: '火把节', title: { zh: "银冠向风", en: "Silver Crown Against the Wind" }, front: "/media/postcards/huobajie-07-front.jpg", back: '', rotate: '2.5deg' },
    { id: 'pc-03-08', series: '火把节', title: { zh: "黄伞成行", en: "Rows of Yellow Umbrellas" }, front: "/media/postcards/huobajie-08-front.jpg", back: '', rotate: '-2.5deg' },

    // ── 九寨沟 ──
    { id: 'pc-04-01', series: '九寨沟', title: { zh: "大地调色", en: "The Earth's Palette" }, front: "/media/postcards/jiuzhaigou-01-front.jpg", back: '', rotate: '-2deg' },
    { id: 'pc-04-02', series: '九寨沟', title: { zh: "林隙见海", en: "Lake Through the Trees" }, front: "/media/postcards/jiuzhaigou-02-front.jpg", back: '', rotate: '1deg' },
    { id: 'pc-04-03', series: '九寨沟', title: { zh: "水写长诗", en: "A Long Poem in Water" }, front: "/media/postcards/jiuzhaigou-03-front.jpg", back: '', rotate: '2deg' },
    { id: 'pc-04-04', series: '九寨沟', title: { zh: "翠染秋山", en: "Green Dyeing Autumn Hills" }, front: "/media/postcards/jiuzhaigou-04-front.jpg", back: '', rotate: '-1deg' },
    { id: 'pc-04-05', series: '九寨沟', title: { zh: "翠海叠梦", en: "Emerald Lake, Layered Dream" }, front: "/media/postcards/jiuzhaigou-05-front.jpg", back: '', rotate: '1.5deg' },
    { id: 'pc-04-06', series: '九寨沟', title: { zh: "镜下生境", en: "Habitat Under the Lens" }, front: "/media/postcards/jiuzhaigou-06-front.jpg", back: '', rotate: '-1.5deg' },
    { id: 'pc-04-07', series: '九寨沟', title: { zh: "雪谷藏蓝", en: "Blue Hidden in the Snow Valley" }, front: "/media/postcards/jiuzhaigou-07-front.jpg", back: '', rotate: '2.5deg' },

    // ── 上海 ──
    { id: 'pc-05-01', series: '上海', title: { zh: "云端三峰", en: "Three Peaks in the Clouds" }, front: "/media/postcards/shanghai-01-front.jpg", back: '', rotate: '-2deg' },
    { id: 'pc-05-02', series: '上海', title: { zh: "暮染申城", en: "Dusk Over Shanghai" }, front: "/media/postcards/shanghai-02-front.jpg", back: '', rotate: '1deg' },
    { id: 'pc-05-03', series: '上海', title: { zh: "百年一望", en: "A Century in One Look" }, front: "/media/postcards/shanghai-03-front.jpg", back: '', rotate: '2deg' },
    { id: 'pc-05-04', series: '上海', title: { zh: "街巷仰城", en: "Looking Up From the Lane" }, front: "/media/postcards/shanghai-04-front.jpg", back: '', rotate: '-1deg' },
    { id: 'pc-05-05', series: '上海', title: { zh: "金城俯瞰", en: "Golden City From Above" }, front: "/media/postcards/shanghai-05-front.jpg", back: '', rotate: '1.5deg' },
    { id: 'pc-05-06', series: '上海', title: { zh: "霓虹之渊", en: "The Neon Deep" }, front: "/media/postcards/shanghai-06-front.jpg", back: '', rotate: '-1.5deg' },

    // ── 威海 ──
    { id: 'pc-06-01', series: '威海', title: { zh: "巨轮沐晖", en: "Great Ship in the Light" }, front: "/media/postcards/weihai-01-front.jpg", back: '', rotate: '-2deg' },
    { id: 'pc-06-02', series: '威海', title: { zh: "港湾归舟", en: "Homecoming at the Harbour" }, front: "/media/postcards/weihai-02-front.jpg", back: '', rotate: '1deg' },
    { id: 'pc-06-03', series: '威海', title: { zh: "湾畔人家", en: "Homes Along the Bay" }, front: "/media/postcards/weihai-03-front.jpg", back: '', rotate: '2deg' },
    { id: 'pc-06-04', series: '威海', title: { zh: "百舸栖湾", en: "A Hundred Boats at Rest" }, front: "/media/postcards/weihai-04-front.jpg", back: '', rotate: '-1deg' },
    { id: 'pc-06-05', series: '威海', title: { zh: "碧海孤航", en: "Alone on the Blue" }, front: "/media/postcards/weihai-05-front.jpg", back: '', rotate: '1.5deg' },
    { id: 'pc-06-06', series: '威海', title: { zh: "静海泊舟", en: "Still Sea, Moored Boat" }, front: "/media/postcards/weihai-06-front.jpg", back: '', rotate: '-1.5deg' },

    // ── 香港 ──
    { id: 'pc-07-01', series: '香港', title: { zh: "万家不夜", en: "A City That Never Sleeps" }, front: "/media/postcards/xianggang-01-front.jpg", back: '', rotate: '-2deg' },
    { id: 'pc-07-02', series: '香港', title: { zh: "大澳舟行", en: "Boat Through Tai O" }, front: "/media/postcards/xianggang-02-front.jpg", back: '', rotate: '1deg' },
    { id: 'pc-07-03', series: '香港', title: { zh: "巷口有猫", en: "A Cat at the Alley Mouth" }, front: "/media/postcards/xianggang-03-front.jpg", back: '', rotate: '2deg' },
    { id: 'pc-07-04', series: '香港', title: { zh: "市井港气", en: "Street Market Hong Kong" }, front: "/media/postcards/xianggang-04-front.jpg", back: '', rotate: '-1deg' },
    { id: 'pc-07-05', series: '香港', title: { zh: "港城之间", en: "Between Harbour and City" }, front: "/media/postcards/xianggang-05-front.jpg", back: '', rotate: '1.5deg' },
    { id: 'pc-07-06', series: '香港', title: { zh: "港湾如织", en: "Harbour Like Woven Thread" }, front: "/media/postcards/xianggang-06-front.jpg", back: '', rotate: '-1.5deg' },
    { id: 'pc-07-07', series: '香港', title: { zh: "舟行暮港", en: "Boat Through the Evening Harbour" }, front: "/media/postcards/xianggang-07-front.jpg", back: '', rotate: '2.5deg' },
    { id: 'pc-07-08', series: '香港', title: { zh: "街尽见海", en: "The Sea at the End of the Street" }, front: "/media/postcards/xianggang-08-front.jpg", back: '', rotate: '-2.5deg' },

    // ── 香格里拉 ──
    { id: 'pc-08-01', series: '香格里拉', title: { zh: "云起飞来", en: "Clouds Rising In" }, front: "/media/postcards/xianggelila-01-front.jpg", back: '', rotate: '-2deg' },
    { id: 'pc-08-02', series: '香格里拉', title: { zh: "寺与天近", en: "The Monastery Near the Sky" }, front: "/media/postcards/xianggelila-02-front.jpg", back: '', rotate: '1deg' },
    { id: 'pc-08-03', series: '香格里拉', title: { zh: "山有岁痕", en: "Years Written on the Mountain" }, front: "/media/postcards/xianggelila-03-front.jpg", back: '', rotate: '2deg' },
    { id: 'pc-08-04', series: '香格里拉', title: { zh: "群山开处", en: "Where the Mountains Open" }, front: "/media/postcards/xianggelila-04-front.jpg", back: '', rotate: '-1deg' },
    { id: 'pc-08-05', series: '香格里拉', title: { zh: "雪境人间", en: "Human World in Snow" }, front: "/media/postcards/xianggelila-05-front.jpg", back: '', rotate: '1.5deg' },
    { id: 'pc-08-06', series: '香格里拉', title: { zh: "风诵经幡", en: "Prayer Flags Chanting in the Wind" }, front: "/media/postcards/xianggelila-06-front.jpg", back: '', rotate: '-1.5deg' },

    // ── 生日 ──
    { id: 'pc-09-01', series: '生日', title: { zh: "21岁生日1", en: "21st Birthday I" }, front: "/media/postcards/shengri-01-front.jpg", back: '', rotate: '-2deg' },
    { id: 'pc-09-02', series: '生日', title: { zh: "21岁生日2", en: "21st Birthday II" }, front: "/media/postcards/shengri-02-front.jpg", back: '', rotate: '1deg' },
  ],
  socials: { instagram: '#', xiaohongshu: '#', email: 'mailto:hello@example.com' },
} as const;
