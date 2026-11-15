<template>
  <section id="about" class="about-section">

    <ScrollReveal>
      <h2 class="about-title">
        About <span class="text-primary">Me!</span>
      </h2>
      <div class="about-divider"></div>
    </ScrollReveal>

    <div class="about-nebula" aria-hidden="true">
      <div class="nebula-layer layer1"></div>
      <div class="nebula-layer layer2"></div>
      <div class="nebula-layer layer3"></div>
    </div>

    <ScrollReveal as="div" class="about-gallery-wrap" :delay="100">
      <div
        class="about-gallery"
        @touchstart.passive="handleGalleryTouchStart"
        @touchend="handleGalleryTouchEnd"
      >
        <div
          v-for="(img, index) in images"
          :key="index"
          @mouseenter="activeCard = index"
          @click="activeCard = index"
          :class="['expanding-card', { 'active': activeCard === index }]"
        >
          <img :src="img" class="about-gallery-image" alt="Gallery Image" loading="lazy" decoding="async" />
        </div>
      </div>
    </ScrollReveal>

    <div class="about-content-grid">
      <ScrollReveal as="div" class="about-copy" :delay="200">
        <h2 class="about-typing-title">
          <span class="text-primary">
            {{ displayAbout }}
          </span>
          <span class="animate-pulse text-primary drop-shadow-[0_0_8px_var(--color-primary)]">
            |
          </span>
        </h2>

        <p
          v-for="(paragraph, index) in aboutData.about.paragraphs"
          :key="'p-' + index"
          class="about-intro"
          v-html="paragraph"
        ></p>

        <ul class="about-highlights" aria-label="Portfolio highlights">
          <li v-for="highlight in highlights" :key="highlight.label">
            <span class="about-highlight-count">{{ highlight.count }}</span>
            <span>{{ highlight.label }}</span>
          </li>
        </ul>
      </ScrollReveal>

      <div class="about-info-cards flex flex-col gap-6 md:gap-8">

        <ScrollReveal :delay="200">
          <div class="about-info-card bg-card backdrop-blur-md border border-white/5 hover:border-primary/50 transition-all duration-500 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-500"></div>
            <h3 class="about-icon-card-heading text-xl font-bold text-primary">Education</h3>
            <div class="about-icon-tile-list" aria-label="Education">
              <a
                v-for="(edu, index) in aboutData.about.educationSummary"
                :key="'edu-' + index"
                :href="getAboutEducationIcon(edu, index).href"
                target="_blank"
                rel="noopener noreferrer"
                class="about-icon-tile"
                :aria-label="`${edu} website`"
                :title="edu"
                :style="{
                  '--tile-color': `#${getAboutEducationIcon(edu, index).color}`,
                  '--tile-icon-size': getAboutEducationIcon(edu, index).size,
                }"
              >
                <img
                  :src="getAboutEducationIcon(edu, index).src"
                  :alt="edu"
                  class="about-icon-tile-image"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="260">
          <div class="about-info-card bg-card backdrop-blur-md border border-white/5 hover:border-primary/50 transition-all duration-500 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-500"></div>
            <h3 class="about-icon-card-heading text-xl font-bold text-primary">Interests and Skills</h3>
            <div class="about-icon-tile-list" aria-label="Interest and skills">
              <button
                v-for="(skill, index) in aboutData.about.skills"
                :key="'skill-' + index"
                type="button"
                class="about-icon-tile"
                :class="{ 'is-active': activeAboutSkill === skill }"
                :aria-label="skill"
                :aria-pressed="activeAboutSkill === skill"
                :title="skill"
                :style="{ '--tile-color': `#${getAboutSkillIcon(skill).color}` }"
                @click="selectAboutSkill(skill)"
              >
                <img
                  :src="getAboutSkillIcon(skill).src"
                  :alt="skill"
                  class="about-icon-tile-image"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
            <p
              class="about-skill-active-label"
              :class="{ 'is-visible': activeAboutSkill }"
              aria-live="polite"
            >
              {{ activeAboutSkill }}
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>

    <ScrollReveal as="div" class="about-quote-panel" :delay="260">
      <p>
        "<span class="about-quote-text">{{ displayQuote }}</span><span class="typing-cursor about-quote-cursor">|</span>"
      </p>
    </ScrollReveal>

    <ScrollReveal as="div" class="about-more-action" :delay="300">
      <button @click="scrollToQualification" class="primary-button">
        More
      </button>
    </ScrollReveal>
  </section>
</template>

<script>
import aboutData from '../data/about.json'
import projectData from '../data/project.json'
import qualificationData from '../data/qualification.json'
import { resolveImageAsset } from '../data/imageAssets.js'
import { useTypewriterCycle } from '../composables/useTypewriterCycle.js'
import ScrollReveal from './ScrollReveal.vue'

const aboutSkillIcons = {
  'Web Development': { icon: 'html5', color: 'E34F26' },
  'Game Development': { icon: 'unity', color: '000000' },
  'Computer Vision': { icon: 'opencv', color: '5C3EE8' },
  'Computer Networks': { icon: 'cisco', color: '1BA0D7' },
  'Machine Learning': { icon: 'tensorflow', color: 'FF6F00' },
  English: { icon: 'googletranslate', color: '4285F4' },
  'Public Speaking': { icon: 'speakerdeck', color: '009287' },
}

const aboutEducationIcons = [
  {
    src: '/informatika-itk.png',
    color: '032580',
    href: 'https://if.itk.ac.id/',
  },
  {
    src: 'https://itk.ac.id/assets/image/Logo_ITK_White_NoText.webp',
    color: '0072CE',
    href: 'https://itk.ac.id/',
    size: '2.35rem',
  },
  {
    icon: 'googleclassroom',
    color: '34A853',
    href: 'https://sman9-bpp.sch.id/',
  },
]

export default {
  name: 'PortfolioAbout',
  components: { ScrollReveal },

  setup() {
    const {
      displayedText: displayAbout,
      start: startAboutTyping,
      stop: stopAboutTyping,
    } = useTypewriterCycle(aboutData.about.typingTexts, {
      typingSpeed: 120,
      deletingSpeed: 60,
      holdDuration: 1500,
    })

    const quoteTexts = Array.isArray(aboutData.about.quotes)
      ? aboutData.about.quotes
      : [aboutData.about.quote]

    const {
      displayedText: displayQuote,
      start: startQuoteTyping,
      stop: stopQuoteTyping,
    } = useTypewriterCycle(quoteTexts, {
      typingSpeed: 42,
      deletingSpeed: 26,
      holdDuration: 2600,
      nextTextDelay: 700,
    })

    return {
      displayAbout,
      startAboutTyping,
      stopAboutTyping,
      displayQuote,
      startQuoteTyping,
      stopQuoteTyping,
    }
  },

  data() {
    return {
      aboutData,
      highlights: [
        { count: projectData.projects.length, label: 'Featured Projects' },
        { count: qualificationData.publications.length, label: 'Published Research Papers' },
        { count: qualificationData.intellectualPropertyRights.length, label: 'Projects Selected for IP Registration Facilitation' },
      ],
      images: [
        resolveImageAsset('1.webp'),
        resolveImageAsset('2.webp'),
        resolveImageAsset('3.webp'),
        resolveImageAsset('4.webp'),
        resolveImageAsset('5.webp'),
      ],
      activeCard: 0,
      activeAboutSkill: '',
      galleryTouchStartX: 0,
      galleryTouchStartY: 0,
    }
  },

  mounted() {
    this.startAboutTyping()
    this.startQuoteTyping()
  },

  beforeUnmount() {
    this.stopAboutTyping()
    this.stopQuoteTyping()
  },

  methods: {
    scrollToQualification() {
      const target = document.getElementById('qualification')
      if (!target) return

      const start = window.pageYOffset
      const end = target.getBoundingClientRect().top + start - 100

      window.scrollTo({
        top: end,
        behavior: 'smooth',
      })
    },

    handleGalleryTouchStart(event) {
      const touch = event.changedTouches[0]
      this.galleryTouchStartX = touch.clientX
      this.galleryTouchStartY = touch.clientY
    },

    handleGalleryTouchEnd(event) {
      const touch = event.changedTouches[0]
      const deltaX = touch.clientX - this.galleryTouchStartX
      const deltaY = touch.clientY - this.galleryTouchStartY

      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return

      const direction = deltaX < 0 ? 1 : -1
      const nextIndex = (this.activeCard + direction + this.images.length) % this.images.length
      this.activeCard = nextIndex
    },

    getAboutSkillIcon(skill) {
      const config = aboutSkillIcons[skill] || { icon: 'codersrank', color: 'BE185D' }
      return {
        color: config.color,
        src: `https://cdn.simpleicons.org/${config.icon}/${config.color}`,
      }
    },

    selectAboutSkill(skill) {
      this.activeAboutSkill = this.activeAboutSkill === skill ? '' : skill
    },

    getAboutEducationIcon(_education, index) {
      const config = aboutEducationIcons[index] || aboutEducationIcons[0]
      return {
        color: config.color,
        href: config.href,
        size: config.size || null,
        src: config.src || `https://cdn.simpleicons.org/${config.icon}/${config.color}`,
      }
    },

  },
}
</script>
