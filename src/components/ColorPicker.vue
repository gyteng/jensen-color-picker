<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { colorName, presets } from '../utils/colors.js'

const props = defineProps({ color: { type: String, required: true } })
const emit = defineEmits(['update:color'])
const name = computed(() => colorName(props.color))
const copyLabel = ref('复制色值 ↗')
let copyTimer

async function copyColor() {
  try {
    await navigator.clipboard.writeText(props.color.toUpperCase())
    copyLabel.value = '已复制 ✓'
  } catch {
    copyLabel.value = '复制失败，请选中色值复制'
  }
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => { copyLabel.value = '复制色值 ↗' }, 2000)
}
onBeforeUnmount(() => clearTimeout(copyTimer))
</script>

<template>
  <div class="picker">
    <div class="picker-head"><span class="small-label">选择你的颜色</span><span class="small-label">{{ presets.length }} 种预设</span></div>
    <div class="swatches" role="group" aria-label="预设颜色">
      <button v-for="preset in presets" :key="preset.hex" class="swatch" type="button"
        :style="{ '--swatch': preset.hex }" :title="preset.name" :aria-label="preset.name" :aria-pressed="color === preset.hex"
        @click="emit('update:color', preset.hex)"></button>
      <label class="custom" title="自定义颜色"><input type="color" :value="color" aria-label="选择自定义颜色" @input="emit('update:color', $event.target.value)"></label>
    </div>
    <div class="color-info" aria-live="polite">
      <div class="color-chip" aria-hidden="true"></div>
      <div><div class="color-name">{{ name }}</div><div class="color-hex">{{ color.toUpperCase() }}</div></div>
      <button class="copy" type="button" @click="copyColor">{{ copyLabel }}</button>
    </div>
  </div>
</template>
