<template>
  <section id="home" class="hero-section">
    <div class="section-container section-container--narrow">
      <div class="hero-layout">
        <div
          class="hero-portrait-wrap hero-reveal hero-reveal--image"
          :class="{ 'is-visible': isHeroRevealed }"
        >
          <div class="hero-portrait-glow animate-pulseGlow"></div>
          <img
            src="/profile.jpg"
            alt="Profile"
            class="hero-portrait animate-float"
          />
        </div>

        <div class="hero-copy">
          <p
            class="eyebrow-text hero-reveal hero-reveal--greeting"
            :class="{ 'is-visible': isHeroRevealed }"
          >
            Hi, my name is
          </p>

          <h1
            class="hero-title hero-reveal hero-reveal--name"
            :class="{ 'is-visible': isHeroRevealed }"
          >
            <span class="text-primary">{{ displayName }}</span>
            <span class="typing-cursor">|</span>
          </h1>

          <p
            class="hero-interest hero-reveal hero-reveal--headline"
            :class="{ 'is-visible': isHeroRevealed }"
          >
            Interested in
            <span class="text-primary">{{ displayInterest }}</span>
            <span class="typing-cursor">|</span>
          </p>

          <p
            v-for="(paragraph, index) in heroData.aboutParagraphs"
            :key="index"
            class="body-copy hero-reveal hero-reveal--description"
            :class="{ 'is-visible': isHeroRevealed }"
          >
            {{ paragraph }}
          </p>

          <div
            class="hero-action hero-reveal hero-reveal--cta"
            :class="{ 'is-visible': isHeroRevealed }"
          >
            <button @click="scrollToAbout" class="primary-button">
              About Me
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import heroData from '../data/hero.json'

defineOptions({
  name: 'PortfolioHero',
})

const displayName = ref('')
const displayInterest = ref('')
const isHeroRevealed = ref(false)
const typingCleanups = []
let heroRevealFrameId = 0

const getNavbarOffset = () => {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
  const numericValue = Number.parseFloat(value)
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

  return value.trim().endsWith('rem') ? numericValue * rootFontSize : numericValue
}

const createTypingEffect = (texts, outputRef, typingSpeed = 100, deletingSpeed = 50, delay = 1000) => {
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let loopTimer = 0
  let delayTimer = 0
  let isActive = true

  const type = () => {
    if (!isActive) return

    const currentText = texts[textIndex]

    if (!isDeleting) {
      outputRef.value = currentText.substring(0, charIndex++)
      if (charIndex > currentText.length) {
        delayTimer = window.setTimeout(() => {
          isDeleting = true
        }, delay)
      }
    } else {
      outputRef.value = currentText.substring(0, charIndex--)
      if (charIndex < 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
      }
    }

    loopTimer = window.setTimeout(type, isDeleting ? deletingSpeed : typingSpeed)
  }

  type()

  return () => {
    isActive = false
    window.clearTimeout(loopTimer)
    window.clearTimeout(delayTimer)
  }
}

const scrollToAbout = () => {
  const target = document.getElementById('about')
  if (!target) return

  const start = window.pageYOffset
  const end = target.getBoundingClientRect().top + start - getNavbarOffset()

  window.scrollTo({
    top: end,
    behavior: 'smooth',
  })
}

onMounted(() => {
  heroRevealFrameId = window.requestAnimationFrame(() => {
    isHeroRevealed.value = true
  })

  typingCleanups.push(createTypingEffect(heroData.names, displayName, 150, 40, 1500))
  typingCleanups.push(createTypingEffect(heroData.interests, displayInterest, 100, 50, 1000))
})

onUnmounted(() => {
  if (heroRevealFrameId) window.cancelAnimationFrame(heroRevealFrameId)
  typingCleanups.forEach((cleanup) => cleanup())
})
</script>
