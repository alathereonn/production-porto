<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <button class="brand-button" @click="scrollTo('home')">
        ALATHEREONN
      </button>

      <div class="nav-links">
        <button
          v-for="section in sections"
          :key="section"
          @click="scrollTo(section)"
          :class="['nav-link', { 'is-active': active === section }]"
        >
          {{ section }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'PortfolioNavbar',
})

const sections = ['home', 'about', 'qualification', 'project', 'contact']
const active = ref('home')
let scrollAnimationFrame = 0

const easeInOut = (t) => {
  return t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2
}

const scrollTo = (id, duration = 500) => {
  active.value = id

  const target = document.getElementById(id)
  if (!target) return

  const start = window.pageYOffset
  const end = target.getBoundingClientRect().top + start - 100
  const distance = end - start
  let startTime = null

  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime

    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    window.scrollTo(0, start + distance * easeInOut(progress))

    if (timeElapsed < duration) {
      scrollAnimationFrame = requestAnimationFrame(animation)
    }
  }

  scrollAnimationFrame = requestAnimationFrame(animation)
}

const handleScroll = () => {
  sections.forEach((section) => {
    const el = document.getElementById(section)
    if (!el) return

    const top = window.scrollY
    const offset = el.offsetTop - 150
    const height = el.offsetHeight

    if (top >= offset && top < offset + height) {
      active.value = section
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollAnimationFrame) cancelAnimationFrame(scrollAnimationFrame)
})
</script>
