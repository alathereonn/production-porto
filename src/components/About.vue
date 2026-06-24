<template>
  <section id="about" class="about-section">
    
    <h2 class="about-title">
      About <span class="text-primary">Me!</span>
    </h2>
    <div class="about-divider"></div>

    <div class="about-nebula" aria-hidden="true">
      <div class="nebula-layer layer1"></div>
      <div class="nebula-layer layer2"></div>
      <div class="nebula-layer layer3"></div>
    </div>

    <div class="about-gallery-wrap">
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
    </div>

    <div class="about-content-grid">
      <div class="about-copy">
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
      </div>

      <div class="flex flex-col gap-6 md:gap-8">
        
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

        <div class="bg-card backdrop-blur-md border border-white/5 hover:border-primary/50 transition-all duration-500 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-500"></div>
          <p class="italic text-gray-400 text-sm md:text-base leading-relaxed">
            "{{ aboutData.about.quote }}"
          </p>
        </div>

      </div>
    </div>

    <div class="about-more-action">
      <button @click="scrollToQualification" class="group relative px-10 py-4 rounded-xl font-semibold tracking-wide border border-primary text-primary bg-transparent transition-all duration-300 transform shadow-[0_6px_0_0_var(--color-primary)] hover:bg-primary hover:text-black hover:-translate-y-1 hover:shadow-[0_12px_25px_var] active:translate-y-2 active:shadow-[0_3px_0_0_var(--color-primary)]">
        More
      </button>
    </div>
  </section>
</template>

<script>
import aboutData from '../data/about.json'

export default {
  name: 'PortfolioAbout',

  data() {
    return {
      aboutData,
      images: [
        'src/images/1.jpeg',
        'src/images/2.jpg',
        'src/images/3.jpeg',
        'src/images/4.jpg', 
        'src/images/5.jpg',
        'src/images/6.jpeg',
      ],
      activeCard: 0, 
      typingTimeouts: [],
      displayAbout: '',
    }
  },

  mounted() {
    this.createTypingEffect(this.aboutData.about.typingTexts, 120, 60, 1500)
  },

  beforeUnmount() {
    this.typingTimeouts.forEach((timeoutId) => clearTimeout(timeoutId))
  },

  methods: {
    scheduleTimeout(callback, delay) {
      const timeoutId = setTimeout(callback, delay)
      this.typingTimeouts.push(timeoutId)
      return timeoutId
    },

    createTypingEffect(texts, typingSpeed, deletingSpeed, delay) {
      let textIndex = 0
      let charIndex = 0
      let isDeleting = false

      const type = () => {
        const currentText = texts[textIndex]

        if (!isDeleting) {
          this.displayAbout = currentText.substring(0, charIndex++)
          if (charIndex > currentText.length) {
            this.scheduleTimeout(() => {
              isDeleting = true
            }, delay)
          }
        } else {
          this.displayAbout = currentText.substring(0, charIndex--)
          if (charIndex < 0) {
            isDeleting = false
            textIndex = (textIndex + 1) % texts.length
          }
        }

        this.scheduleTimeout(type, isDeleting ? deletingSpeed : typingSpeed)
      }

      type()
    },

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
