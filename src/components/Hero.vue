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
            <button type="button" @click="scrollToAbout" class="primary-button">
              About Me
            </button>
            <a
              href="https://drive.google.com/file/d/1uXpCHtyFIy9_z67M9t4bFdEHnh8IqAyH/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              class="primary-button"
            >
              View CV
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import heroData from '../data/hero.json'
import { useTypewriterCycle } from '../composables/useTypewriterCycle.js'

defineOptions({
  name: 'PortfolioHero',
})

const isHeroRevealed = ref(false)
let heroRevealFrameId = 0

const {
  displayedText: displayName,
  start: startNameTyping,
  stop: stopNameTyping,
} = useTypewriterCycle(heroData.names, {
  typingSpeed: 150,
  deletingSpeed: 40,
  holdDuration: 1500,
})

const {
  displayedText: displayInterest,
  start: startInterestTyping,
  stop: stopInterestTyping,
} = useTypewriterCycle(heroData.interests, {
  typingSpeed: 100,
  deletingSpeed: 50,
  holdDuration: 1000,
})

const getNavbarOffset = () => {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
  const numericValue = Number.parseFloat(value)
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

  return value.trim().endsWith('rem') ? numericValue * rootFontSize : numericValue
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

  startNameTyping()
  startInterestTyping()
})

onUnmounted(() => {
  if (heroRevealFrameId) window.cancelAnimationFrame(heroRevealFrameId)
  stopNameTyping()
  stopInterestTyping()
})
</script>
