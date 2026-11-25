<script setup>
import { computed, ref } from 'vue'
import ColorPicker from './components/ColorPicker.vue'
import { colorSurname, readableAccent } from './utils/colors.js'
import JacketPortrait from './components/JacketPortrait.vue'

const color = ref('#f7cf46')
const surname = computed(() => colorSurname(color.value))
</script>

<template>
  <div class="page" :style="{ '--color': color, '--accent-color': readableAccent(color) }">
    <header><div class="brand">仁勋<span>拾色器</span><span aria-hidden="true">.</span></div><div class="header-note">一场小小的色彩实验 &nbsp; / &nbsp; 01</div></header>
    <main>
      <section class="intro" aria-labelledby="title">
        <p class="eyebrow">色彩的无限可能</p>
        <h1 id="title"><span class="accent">{{ surname }}</span><span>仁勋</span></h1>
        <p class="subtitle">仁勋，也可以有很多种颜色。<br>选一种颜色，给灵感一点颜色看看。</p>
        <ColorPicker v-model:color="color" />
      </section>
      <section class="visual" aria-label="黄仁勋肖像">
        <div class="photo-wrap"><JacketPortrait :color="color" /><div class="photo-caption"><strong>黄仁勋</strong><span>一个人，一万种颜色。</span></div></div>
        <div class="vertical" aria-hidden="true">关于色彩与灵感 — 001</div><div class="stamp" aria-hidden="true">好颜色<br>好心情 ✳</div>
      </section>
    </main>
    <footer><span>© 仁勋拾色器 &nbsp; / &nbsp; 为一点乐趣而作</span><a href="https://github.com/gyteng/jensen-color-picker" target="_blank" rel="noopener noreferrer">GitHub 项目 ↗</a></footer>
  </div>
</template>
