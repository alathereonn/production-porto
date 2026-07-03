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
      <div class="about-gallery">
        <div
          v-for="(img, index) in images"
          :key="index"
          @mouseenter="activeCard = index"
          :class="['expanding-card', { 'active': activeCard === index }]"
        >
          <img :src="img" class="about-gallery-image" alt="Gallery Image" />
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
          v-html="paragraph"
        ></p>
      </ScrollReveal>

      <div class="flex flex-col gap-6 md:gap-8">

        <ScrollReveal :delay="200">
          <div class="bg-card backdrop-blur-md border border-white/5 hover:border-primary/50 transition-all duration-500 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-500"></div>
            <h3 class="text-xl font-bold text-primary mb-4">Education</h3>
            <p class="text-gray-300 text-sm md:text-base space-y-2">
              <span
                v-for="(edu, index) in aboutData.about.educationSummary"
                :key="'edu-' + index"
                class="block"
              >
                > {{ edu }}
              </span>
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="260">
          <div class="bg-card backdrop-blur-md border border-white/5 hover:border-primary/50 transition-all duration-500 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-500"></div>
            <h3 class="text-xl font-bold text-primary mb-4">Interest / Skills</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-300 text-sm md:text-base">
              <li
                v-for="(skill, index) in aboutData.about.skills"
                :key="'skill-' + index"
              >
                {{ skill }}
              </li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="320">
          <div class="bg-card backdrop-blur-md border border-white/5 hover:border-primary/50 transition-all duration-500 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-500"></div>
            <p class="italic text-gray-400 text-sm md:text-base leading-relaxed">
              "{{ aboutData.about.quote }}"
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>

    <ScrollReveal as="div" class="about-more-action" :delay="300">
      <button @click="scrollToQualification" class="group relative px-10 py-4 rounded-xl font-semibold tracking-wide border border-primary text-primary bg-transparent transition-all duration-300 transform shadow-[0_6px_0_0_var(--color-primary)] hover:bg-primary hover:text-black hover:-translate-y-1 hover:shadow-[0_12px_25px_var] active:translate-y-2 active:shadow-[0_3px_0_0_var(--color-primary)]">
        More
      </button>
    </ScrollReveal>
  </section>
</template>

<script>
import aboutData from '../data/about.json'
import { resolveImageAsset } from '../data/imageAssets.js'
import { useTypewriterCycle } from '../composables/useTypewriterCycle.js'
import ScrollReveal from './ScrollReveal.vue'

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

    return {
      displayAbout,
      startAboutTyping,
      stopAboutTyping,
    }
  },

  data() {
    return {
      aboutData,
      images: [
        resolveImageAsset('1.jpeg'),
        resolveImageAsset('2.jpg'),
        resolveImageAsset('3.jpeg'),
        resolveImageAsset('4.jpg'),
        resolveImageAsset('5.jpeg'),
        resolveImageAsset('6.JPEG'),
      ],
      activeCard: 0,
    }
  },

  mounted() {
    this.startAboutTyping()
  },

  beforeUnmount() {
    this.stopAboutTyping()
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
  },
}
</script>
