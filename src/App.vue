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
let resizeHandler = null

onMounted(() => {
  const canvas = galaxyCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let w = window.innerWidth
  let h = window.innerHeight
  canvas.width = w
  canvas.height = h

  const starsCount = 600
  const stars = []

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

  function animateStars() {
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

  animateStars()

  resizeHandler = () => {
    w = window.innerWidth
    h = window.innerHeight
    canvas.width = w
    canvas.height = h
  }

  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
</script>
