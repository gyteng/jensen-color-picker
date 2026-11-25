import test from 'node:test'
import assert from 'node:assert/strict'
import { colorFamily, colorName, colorSurname, presets, readableAccent } from './colors.js'

test('预设及自定义颜色映射到合理的姓名首字', () => {
  for (const [hex, expected] of [
    ['#f7cf46', '黄'], ['#82b4c6', '蓝'], ['#ffffff', '白'],
    ['#0000ff', '蓝'], ['#ff0000', '红'], ['#00ff00', '绿'],
    ['#000000', '黑'], ['#808080', '灰'], ['#ff00ff', '粉'],
  ]) assert.equal(colorFamily(hex), expected, hex)
})

test('默认姓名为黄仁勋，其他预设保留完整名称', () => {
  assert.equal(colorSurname('#f7cf46'), '黄')
  assert.equal(colorSurname('#A39AC8'), '薰衣草紫')
  assert.equal(colorSurname('#FFFFFF'), '雪白')
})

test('自定义颜色匹配丰富的色名，显示名称与姓名一致', () => {
  for (const [hex, name] of [
    ['#800000', '栗红'], ['#ffcccc', '蜜桃粉'], ['#0000ff', '正蓝'],
    ['#000000', '墨黑'], ['#228b22', '森林绿'], ['#ffd700', '金黄'],
    ['#4b0082', '靛紫'], ['#ffdab9', '蜜桃'],
  ]) {
    assert.equal(colorSurname(hex), name, hex)
    assert.equal(colorName(hex), `${name}色`, hex)
  }
})

test('预设名称和自定义名称与颜色一致', () => {
  assert.equal(colorName('#FFFFFF'), '雪白色')
  assert.equal(colorName('#0000ff'), '正蓝色')
  assert.equal(new Set(presets.map(preset => preset.hex)).size, presets.length)
  assert.equal(colorSurname('#54875c'), '森林绿')
  assert.equal(colorName('#c9b8a5'), '奶茶色')
})

test('标题颜色在深色背景上保持可读，亮色保持原样', () => {
  const luminance = hex => [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0)
  for (const hex of ['#000000', '#272a2d', '#253b65', ...presets.map(item => item.hex)]) {
    assert.ok((luminance(readableAccent(hex)) + 0.05) / (luminance('#080808') + 0.05) >= 4.5, hex)
  }
  assert.equal(readableAccent('#f7cf46'), '#f7cf46')
})
