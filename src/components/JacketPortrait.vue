<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import portrait from '../jensen-portrait.webp'
import fallbackPortrait from '../../jensen-portrait.png'
import { jacketOutline, jacketExclusions, prepareJacketTint, applyJacketTint } from '../utils/jacket.js'

const props = defineProps({ color: { type: String, required: true } })
const canvas = ref(null)
const ready = ref(false)
const portraitSource = ref(portrait)
let fallbackAttempted = false
let original, output, prepared, frame, context

function render() {
  if (!original || !canvas.value) return
  const target = props.color.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16))
  applyJacketTint(original.data, output.data, prepared, target)
  context.putImageData(output, 0, 0)
  ready.value = true
}

function handleImageError() {
  if (!fallbackAttempted) {
    fallbackAttempted = true
    portraitSource.value = fallbackPortrait
  }
}

function load(event) {
  const image = event.target
  const { naturalWidth: width, naturalHeight: height } = image
  canvas.value.width = width
  canvas.value.height = height
  context = canvas.value.getContext('2d', { willReadFrequently: true })
  context.drawImage(image, 0, 0)
  original = context.getImageData(0, 0, width, height)
  const layer = document.createElement('canvas')
  layer.width = width
  layer.height = height
  const selection = layer.getContext('2d')
  selection.scale(width / 1312, height / 1200)
  selection.fill(new Path2D(jacketOutline))
  selection.globalCompositeOperation = 'destination-out'
  jacketExclusions.forEach(path => selection.fill(new Path2D(path)))
  const mask = selection.getImageData(0, 0, width, height)
  prepared = prepareJacketTint(original.data, mask.data)
  output = new ImageData(new Uint8ClampedArray(original.data), width, height)
  render()
}

watch(() => props.color, () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(render)
})
onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <img v-show="!ready" :src="portraitSource" width="1312" height="1199" alt="黄仁勋卡通肖像" @load="load" @error="handleImageError">
  <canvas v-show="ready" ref="canvas" class="jacket-portrait" role="img" :aria-label="`黄仁勋卡通肖像，皮衣颜色 ${color}`"></canvas>
</template>
