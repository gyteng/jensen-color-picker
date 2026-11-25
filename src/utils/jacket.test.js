import test from 'node:test'
import assert from 'node:assert/strict'
import { tintLeatherPixel, prepareJacketTint, applyJacketTint } from './jacket.js'

test('预计算换色与原算法逐像素一致，重复换色不累积误差', () => {
  let seed = 123456
  const randomByte = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed >>> 24
  }
  const original = new Uint8ClampedArray(4096 * 4)
  const mask = new Uint8ClampedArray(original.length)
  for (let i = 0; i < original.length; i += 4) {
    original.set([randomByte(), randomByte(), randomByte(), randomByte()], i)
    mask[i + 3] = i % 12 === 0 ? 0 : i % 12 === 4 ? 255 : randomByte()
  }
  const prepared = prepareJacketTint(original, mask)
  const output = new Uint8ClampedArray(original)
  for (const target of [[0, 0, 0], [255, 255, 255], [247, 207, 70], [20, 90, 230], [0, 0, 0]]) {
    applyJacketTint(original, output, prepared, target)
    const expected = new Uint8ClampedArray(original)
    for (let i = 0; i < original.length; i += 4) {
      if (mask[i + 3]) expected.set(tintLeatherPixel(original[i], original[i + 1], original[i + 2], target, mask[i + 3] / 255), i)
    }
    assert.deepEqual(output, expected)
  }
})

test('换色范围外的像素保持原样', () => {
  assert.deepEqual(tintLeatherPixel(233, 175, 123, [10, 90, 200], 0), [233, 175, 123])
})

test('皮衣随目标色变化，并保留暗部到亮部的层次', () => {
  for (const target of [[247, 207, 70], [20, 90, 230], [255, 255, 255], [0, 0, 0]]) {
    const shades = [20, 60, 110, 180].map(value => tintLeatherPixel(value, value, value, target))
    assert.ok(shades.every(rgb => rgb.every(value => value >= 0 && value <= 255)))
    assert.ok(shades[3].reduce((a, b) => a + b) > shades[0].reduce((a, b) => a + b))
  }
  const blue = tintLeatherPixel(80, 75, 70, [20, 90, 230])
  assert.ok(blue[2] > blue[1] && blue[1] > blue[0])
  assert.ok(tintLeatherPixel(90, 90, 90, [0, 0, 0])[0] > tintLeatherPixel(20, 20, 20, [0, 0, 0])[0], '黑色皮衣的暗部仍有纹理层次')
})
