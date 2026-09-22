export const locales = ['zh', 'en'] as const;
export type Locale = typeof locales[number];

export const ui = {
  zh: {
    nav: { work: '作品', shorts: '短视频与 Vlog', panorama: '全景展厅', photos: '照片与静帧', postcards: '明信片墙', about: '关于', contact: '联系' },
    language: 'English', getInTouch: '发起合作', selectedWork: '精选作品', earlyWork: '早期作品', makingOf: '作品如何制作', backToWork: '返回所有作品',
    postcards: '明信片', wantsLabel: '人想要', loading: '正在读取评分数据…', rate: '为它打分', want: '我想要', wanted: '已标记想要', noRating: '尚无评分', languagePrompt: '请选择浏览语言',
    shorts: { all: '全部', category: '分类', year: '年份', insta360: '影石作品', personal: '个人创作', vlog: 'Vlog', short: '短视频' },
  },
  en: {
    nav: { work: 'Work', shorts: 'Shorts & Vlogs', panorama: 'Panorama', photos: 'Photographs & Stills', postcards: 'Postcards', about: 'About', contact: 'Contact' },
    language: '中文', getInTouch: 'Get in Touch', selectedWork: 'Selected Work', earlyWork: 'Early Work', makingOf: 'Making Of', backToWork: 'Back to all work',
    postcards: 'postcards', wantsLabel: 'wanted', loading: 'Loading postcard data…', rate: 'Rate this postcard', want: 'Want one', wanted: 'Wanted', noRating: 'No ratings yet', languagePrompt: 'Choose your language',
    shorts: { all: 'All', category: 'Category', year: 'Year', insta360: 'Insta360 Works', personal: 'Personal Work', vlog: 'Vlogs', short: 'Shorts' },
  },
} as const;

export const seriesNames: Record<string, Record<Locale, string>> = {
  '大连': { zh: '大连', en: 'Dalian' }, '凉山': { zh: '凉山', en: 'Liangshan' }, '火把节': { zh: '火把节', en: 'Torch Festival' }, '九寨沟': { zh: '九寨沟', en: 'Jiuzhaigou' }, '上海': { zh: '上海', en: 'Shanghai' }, '威海': { zh: '威海', en: 'Weihai' }, '香港': { zh: '香港', en: 'Hong Kong' }, '香格里拉': { zh: '香格里拉', en: 'Shangri-La' }, '生日': { zh: '生日', en: 'Birthday' },
};

export const t = (locale: Locale) => ui[locale];
