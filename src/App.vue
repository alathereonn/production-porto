<template>
  <div class="app-shell galaxy-bg">
    <canvas ref="galaxyCanvas" class="galaxy-canvas"></canvas>

    <div class="app-content">
      <Navbar />
      <Hero />
      <About />
      <Qualification />
      <Project />
      <Contact />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Qualification from './components/Qualification.vue'
import Project from './components/Project.vue'
import Contact from './components/Contact.vue'

const galaxyCanvas = ref(null)
let animationFrameId = 0
let resizeFrameId = 0
let scheduleGalaxyResize = null
let visualViewport = null

const getViewportSize = () => {
  const viewport = window.visualViewport

  return {
    width: viewport?.width ?? window.innerWidth,
    height: viewport?.height ?? window.innerHeight,
  }
}

onMounted(() => {
  const canvas = galaxyCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let w = 1
  let h = 1
  const starsCount = 600
  const stars = []

  const resizeGalaxyCanvas = () => {
    const previousWidth = w
    const previousHeight = h
    const viewportSize = getViewportSize()
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

    w = Math.max(1, viewportSize.width)
    h = Math.max(1, viewportSize.height)

    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    canvas.width = Math.round(w * pixelRatio)
    canvas.height = Math.round(h * pixelRatio)
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

    stars.forEach((star) => {
      star.x = Math.min(w, Math.max(0, (star.x / previousWidth) * w))
      star.y = Math.min(h, Math.max(0, (star.y / previousHeight) * h))
    })
  }

  resizeGalaxyCanvas()

  for (let i = 0; i < starsCount; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.1,
    })
  }

  const animateStars = () => {
    ctx.clearRect(0, 0, w, h)
    stars.forEach((star) => {
      star.x += star.dx
      star.y += star.dy
      if (star.x < 0) star.x = w
      if (star.x > w) star.x = 0
      if (star.y < 0) star.y = h
      if (star.y > h) star.y = 0

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(190,24,93,${star.alpha})`
      ctx.fill()
    })

    animationFrameId = requestAnimationFrame(animateStars)
  }

  scheduleGalaxyResize = () => {
    if (resizeFrameId) return

    resizeFrameId = window.requestAnimationFrame(() => {
      resizeGalaxyCanvas()
      resizeFrameId = 0
    })
  }

  visualViewport = window.visualViewport
  window.addEventListener('resize', scheduleGalaxyResize)
  window.addEventListener('orientationchange', scheduleGalaxyResize)
  visualViewport?.addEventListener('resize', scheduleGalaxyResize)

  animateStars()
})

onUnmounted(() => {
  if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
  if (resizeFrameId) window.cancelAnimationFrame(resizeFrameId)

  if (scheduleGalaxyResize) {
    window.removeEventListener('resize', scheduleGalaxyResize)
    window.removeEventListener('orientationchange', scheduleGalaxyResize)
    visualViewport?.removeEventListener('resize', scheduleGalaxyResize)
  }
})
</script>
