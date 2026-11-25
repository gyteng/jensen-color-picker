export const presets = [
  { hex: '#f7cf46', name: '向日葵黄' },
  { hex: '#e99d48', name: '落日橙' },
  { hex: '#d87568', name: '珊瑚红' },
  { hex: '#dca5b5', name: '樱花粉' },
  { hex: '#a39ac8', name: '薰衣草紫' },
  { hex: '#82b4c6', name: '天空蓝' },
  { hex: '#91ad7b', name: '鼠尾草绿' },
  { hex: '#b9ad91', name: '燕麦米' },
  { hex: '#ffffff', name: '雪白色' },
  { hex: '#b6404f', name: '石榴红' },
  { hex: '#e64b3c', name: '朱砂红' },
  { hex: '#913d50', name: '葡萄酒红' },
  { hex: '#ed7d91', name: '草莓粉' },
  { hex: '#f2c4ce', name: '玫瑰粉' },
  { hex: '#db6b36', name: '南瓜橙' },
  { hex: '#f3b38f', name: '蜜桃橙' },
  { hex: '#c88b35', name: '琥珀金' },
  { hex: '#efd876', name: '柠檬黄' },
  { hex: '#f3e5bd', name: '奶油黄' },
  { hex: '#c4c865', name: '青柠绿' },
  { hex: '#a9c89a', name: '抹茶绿' },
  { hex: '#54875c', name: '森林绿' },
  { hex: '#286253', name: '翡翠绿' },
  { hex: '#a8d8be', name: '薄荷绿' },
  { hex: '#54b3a7', name: '湖水绿' },
  { hex: '#3c858b', name: '孔雀青' },
  { hex: '#a8d9de', name: '冰川蓝' },
  { hex: '#5296c2', name: '海洋蓝' },
  { hex: '#395e9a', name: '宝石蓝' },
  { hex: '#253b65', name: '午夜蓝' },
  { hex: '#7e77b1', name: '鸢尾紫' },
  { hex: '#725281', name: '葡萄紫' },
  { hex: '#d0b6d8', name: '丁香紫' },
  { hex: '#98745e', name: '焦糖棕' },
  { hex: '#61483f', name: '巧克力棕' },
  { hex: '#c9b8a5', name: '奶茶色' },
  { hex: '#858c8f', name: '雾霾灰' },
  { hex: '#c9cdd0', name: '月光银' },
  { hex: '#272a2d', name: '曜石黑' },
]

// 按 HSL 色相分类；低饱和度颜色优先按明度归入黑、灰、白。
export function colorFamily(hex) {
  const channels = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255)
  const [r, g, b] = channels
  const max = Math.max(...channels)
  const min = Math.min(...channels)
  const delta = max - min
  const lightness = (max + min) / 2
  if (lightness < 0.12) return '黑'
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  if (saturation < 0.15) return lightness > 0.85 ? '白' : '灰'
  let hue = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4
  hue = (hue * 60 + 360) % 360
  if (hue < 15 || hue >= 345) return '红'
  if (hue < 45) return '橙'
  if (hue < 70) return '黄'
  if (hue < 165) return '绿'
  if (hue < 195) return '青'
  if (hue < 255) return '蓝'
  if (hue < 290) return '紫'
  return '粉'
}

const namedColors = [
  ['#000000', '墨黑'], ['#292421', '乌木黑'], ['#454545', '炭灰'],
  ['#696969', '石墨灰'], ['#808080', '中灰'], ['#a9a9a9', '银灰'],
  ['#d3d3d3', '云灰'], ['#f5f5f5', '烟白'], ['#ffffff', '雪白'],
  ['#ff0000', '正红'], ['#8b0000', '暗红'], ['#800000', '栗红'],
  ['#a52a2a', '赭红'], ['#b22222', '砖红'], ['#c41e3a', '猩红'],
  ['#dc143c', '绯红'], ['#e34234', '朱红'], ['#ff4500', '橙红'],
  ['#fa8072', '鲑红'], ['#f08080', '浅珊瑚'], ['#cd5c5c', '印度红'],
  ['#800020', '酒红'], ['#e6005c', '玫红'], ['#ff1493', '深粉'],
  ['#ff69b4', '热粉'], ['#ffb6c1', '浅粉'], ['#ffc0cb', '樱粉'],
  ['#db7093', '苍玫红'], ['#c71585', '紫罗兰红'], ['#ffcccc', '蜜桃粉'],
  ['#ff7f50', '珊瑚橙'], ['#ff8c00', '深橙'], ['#ffa500', '橙黄'],
  ['#ffdab9', '蜜桃色'], ['#d2691e', '巧克力'], ['#a0522d', '赭石'],
  ['#8b4513', '鞍棕'], ['#d2b48c', '沙棕'], ['#f4a460', '沙褐'],
  ['#ffff00', '柠檬黄'], ['#ffd700', '金黄'], ['#daa520', '金菊黄'],
  ['#b8860b', '暗金'], ['#eee8aa', '麦秆黄'], ['#fffacd', '奶油黄'],
  ['#f5deb3', '小麦色'], ['#f5f5dc', '米白'], ['#808000', '橄榄绿'],
  ['#556b2f', '深橄榄'], ['#6b8e23', '橄榄褐'], ['#228b22', '森林绿'],
  ['#008000', '叶绿'], ['#006400', '深绿'], ['#00ff00', '荧光绿'],
  ['#7cfc00', '草绿'], ['#9acd32', '黄绿'], ['#90ee90', '浅绿'],
  ['#98fb98', '薄荷绿'], ['#2e8b57', '海绿'], ['#3cb371', '中海绿'],
  ['#20b2aa', '浅海绿'], ['#008080', '水鸭青'], ['#00ced1', '深湖蓝'],
  ['#40e0d0', '绿松石'], ['#7fffd4', '碧绿'], ['#00ffff', '青'],
  ['#e0ffff', '淡青'], ['#00bfff', '深天蓝'], ['#87ceeb', '天蓝'],
  ['#4682b4', '钢蓝'], ['#5f9ea0', '灰蓝'], ['#b0c4de', '淡钢蓝'],
  ['#0000ff', '正蓝'], ['#000080', '海军蓝'], ['#191970', '午夜蓝'],
  ['#4169e1', '皇家蓝'], ['#1e90ff', '道奇蓝'], ['#6495ed', '矢车菊蓝'],
  ['#add8e6', '浅蓝'], ['#b0e0e6', '粉蓝'], ['#4b0082', '靛紫'],
  ['#800080', '紫'], ['#8a2be2', '蓝紫'], ['#9400d3', '深紫'],
  ['#9932cc', '兰花紫'], ['#ba55d3', '中兰紫'], ['#da70d6', '兰紫'],
  ['#ee82ee', '紫罗兰'], ['#dda0dd', '梅紫'], ['#e6e6fa', '薰衣草'],
  ['#ff00ff', '洋红'], ['#d8bfd8', '蓟紫'],
]

// 在 Lab 空间比较颜色，使明暗和色相的差异更贴近人眼感受。
function toLab(hex) {
  const [r, g, b] = [1, 3, 5].map(index => {
    const channel = parseInt(hex.slice(index, index + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  const xyz = [
    (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047,
    r * 0.2126729 + g * 0.7151522 + b * 0.072175,
    (r * 0.0193339 + g * 0.119192 + b * 0.9503041) / 1.08883,
  ].map(value => value > 0.008856 ? Math.cbrt(value) : 7.787 * value + 16 / 116)
  return [116 * xyz[1] - 16, 500 * (xyz[0] - xyz[1]), 200 * (xyz[1] - xyz[2])]
}

const palette = namedColors.map(([hex, name]) => ({ name, lab: toLab(hex) }))

function nearestColorName(hex) {
  const lab = toLab(hex)
  return palette.reduce((nearest, color) => {
    const distance = color.lab.reduce((sum, value, index) => sum + (value - lab[index]) ** 2, 0)
    return distance < nearest.distance ? { name: color.name, distance } : nearest
  }, { name: '', distance: Infinity }).name
}

export function readableAccent(hex) {
  const channels = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16))
  const luminance = rgb => rgb.reduce((sum, value, index) => {
    const channel = value / 255
    return sum + [0.2126, 0.7152, 0.0722][index] * (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  }, 0)
  const background = luminance([8, 8, 8])
  if ((luminance(channels) + 0.05) / (background + 0.05) >= 4.5) return hex
  let low = 0, high = 1
  for (let i = 0; i < 12; i++) {
    const mid = (low + high) / 2
    const mixed = channels.map(channel => Math.round(channel + (255 - channel) * mid))
    if ((luminance(mixed) + 0.05) / (background + 0.05) >= 4.5) high = mid
    else low = mid
  }
  return `#${channels.map(channel => Math.round(channel + (255 - channel) * high).toString(16).padStart(2, '0')).join('')}`
}

export function colorName(hex) {
  const preset = presets.find(item => item.hex === hex.toLowerCase())
  if (preset) return preset.name
  const name = nearestColorName(hex)
  return name.endsWith('色') ? name : `${name}色`
}

export function colorSurname(hex) {
  if (hex.toLowerCase() === '#f7cf46') return '黄'
  const preset = presets.find(item => item.hex === hex.toLowerCase())
  return preset ? preset.name.replace(/色$/, '') : nearestColorName(hex).replace(/色$/, '')
}
