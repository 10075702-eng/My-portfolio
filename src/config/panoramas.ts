import type { Locale } from './i18n';

/** 360 照片必须是严格 2:1 等距圆柱投影（equirectangular）；可使用 8192×4096，查看器会显示加载提示。 */
export type PanoramaItem = {
  id: string;
  device: 'drone' | 'camera';
  region: string;
  title: { zh: string; en: string };
  /**
   * 这张全景的「记录」——写地点背景 / 拍摄时刻 / 为什么值得留，一两句就够。
   * 留空则弹层里不显示这一行。
   */
  note: { zh: string; en: string };
  src: string;
  thumb: string;
};

/** 设备切换按钮的标签 + 切换后显示的说明文字 */
export const panoramaDevices: Record<'drone' | 'camera', { label: Record<Locale, string>; description: Record<Locale, string> }> = {
  drone: {
    label: { zh: '全景无人机', en: 'Panoramic Drone' },
    description: { zh: "全景无人机把视角带到身体到不了的地方。航线在高空展开，一次快门收进整片地貌——山脉的起伏、河流的走向、城市与旷野的交界。这里记录的是地形之间的关系。", en: "The panoramic drone takes the view where the body cannot go. Flying a route high above the ground, a single shutter release gathers a whole landscape: the rise and fall of mountains, the course of a river, the border between city and open country. What is recorded here is the relationship between landforms." },
  },
  camera: {
    label: { zh: '全景相机', en: 'Panoramic Camera' },
    description: { zh: "全景相机留在地面。它站在人群里、走进建筑中，保留下一个地点原本的样子——光线落下的角度、空间的大小、声音折返回来的距离。这里记录的不是俯瞰的地貌，而是身处其中的感受。", en: "The panoramic camera stays on the ground. Standing among people or stepping inside a building, it keeps a place as it was: the angle of the light, the size of the space, the distance sound travels back from. What is recorded here is not a landscape seen from above, but the feeling of standing inside it." },
  },
};

/** 设备说明文字：切换设备时显示在按钮下方 */
export const deviceIntros: Record<'drone' | 'camera', Record<Locale, string>> = {
  drone: panoramaDevices.drone.description,
  camera: panoramaDevices.camera.description,
};

/** 地区中英对照。新增地区在这里加一行即可。 */
export const panoramaRegions: Record<string, Record<Locale, string>> = {
  '新疆': { zh: '新疆', en: 'Xinjiang' },
  '郑州': { zh: '郑州', en: 'Zhengzhou' },
  '九寨沟': { zh: '九寨沟', en: 'Jiuzhaigou' },
  '重庆': { zh: '重庆', en: 'Chongqing' },
  '大英博物馆': { zh: '大英博物馆', en: 'British Museum' },
  '大连': { zh: '大连', en: 'Dalian' },
};

export const panoramas: PanoramaItem[] = [
  {
    id: "tianshan-01",
    device: 'drone',
    region: "新疆",
    title: { zh: "天山天池", en: "Tianshan Tianchi" },
    note: { zh: '', en: '' },
    src: '/r2/panoramas/tianshan-01.jpg',
    thumb: '/r2/thumbs/tianshan-01.jpg',
  },
  {
    id: "tianshan-02",
    device: 'drone',
    region: "新疆",
    title: { zh: "天山天池", en: "Tianshan Tianchi" },
    note: { zh: '', en: '' },
    src: '/r2/panoramas/tianshan-02.jpg',
    thumb: '/r2/thumbs/tianshan-02.jpg',
  },
  {
    id: "sailimu-01",
    device: 'drone',
    region: "新疆",
    title: { zh: "赛里木湖", en: "Sayram Lake" },
    note: { zh: '', en: '' },
    src: '/r2/panoramas/sailimu-01.jpg',
    thumb: '/r2/thumbs/sailimu-01.jpg',
  },
  {
    id: "jiuzhaigou-01",
    device: 'drone',
    region: "九寨沟",
    title: { zh: "九寨沟", en: "Jiuzhaigou" },
    note: { zh: '', en: '' },
    src: '/r2/panoramas/jiuzhaigou-01.jpg',
    thumb: '/r2/thumbs/jiuzhaigou-01.jpg',
  },
  {
    id: "jiuzhaigou-02",
    device: 'drone',
    region: "九寨沟",
    title: { zh: "九寨沟", en: "Jiuzhaigou" },
    note: { zh: '', en: '' },
    src: '/r2/panoramas/jiuzhaigou-02.jpg',
    thumb: '/r2/thumbs/jiuzhaigou-02.jpg',
  },
  {
    id: "shancheng-01",
    device: 'drone',
    region: "重庆",
    title: { zh: "山城步道", en: "Mountain City Trail" },
    note: { zh: '', en: '' },
    src: '/r2/panoramas/shancheng-01.jpg',
    thumb: '/r2/thumbs/shancheng-01.jpg',
  },
  {
    id: "shancheng-02",
    device: 'drone',
    region: "重庆",
    title: { zh: "山城步道", en: "Mountain City Trail" },
    note: { zh: '', en: '' },
    src: '/r2/panoramas/shancheng-02.jpg',
    thumb: '/r2/thumbs/shancheng-02.jpg',
  },
  {
    id: "huanghe-01",
    device: 'drone',
    region: "郑州",
    title: { zh: "黄河迎宾馆", en: "Yellow River Guest House" },
    note: { zh: '', en: '' },
    src: '/r2/panoramas/huanghe-01.jpg',
    thumb: '/r2/thumbs/huanghe-01.jpg',
  },
];
