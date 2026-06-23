<template>
  <section id="about" class="about-section">
    <h2 class="section-title">
      About <span class="text-primary">Me!</span>
    </h2>
    <div class="section-divider"></div>

    <div class="about-nebula" aria-hidden="true">
      <div class="nebula-layer layer1"></div>
      <div class="nebula-layer layer2"></div>
      <div class="nebula-layer layer3"></div>
    </div>

    <div
      class="about-carousel cursor-grab"
      @mousedown="onDragStart"
      @mousemove="onDragMove"
      @mouseup="onDragEnd"
      @mouseleave="onDragEnd"
      @touchstart="onDragStart"
      @touchmove="onDragMove"
      @touchend="onDragEnd"
    >
      <div
        ref="slider"
        class="about-slider-track"
        :class="{ 'is-dragging': isDragging }"
        :style="sliderStyle"
      >
        <div
          v-for="(img, i) in loopImages"
          :key="i"
          class="about-slide"
          :style="{ width: slideWidth + 'px' }"
        >
          <div class="about-image-frame">
            <img :src="img" class="carousel-image" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="about-content-grid">
      <div class="about-copy">
        <h2 class="about-typing-title">
          <span class="text-primary">
            {{ displayAbout }}
          </span>
          <span class="typing-cursor">|</span>
        </h2>

        <p
          v-for="(paragraph, index) in aboutData.about.paragraphs"
          :key="'p-' + index"
          v-html="paragraph"
        ></p>
      </div>

      <div class="about-card-stack">
        <div class="info-card">
          <h3 class="card-title">Education</h3>
          <p class="info-card-text">
            <span
              v-for="(edu, index) in aboutData.about.educationSummary"
              :key="'edu-' + index"
              class="block"
            >
              {{ edu }}
            </span>
          </p>
        </div>

        <div class="info-card">
          <h3 class="card-title">Interest / Skills</h3>
          <ul class="about-skill-list">
            <li
              v-for="(skill, index) in aboutData.about.skills"
              :key="'skill-' + index"
            >
              {{ skill }}
            </li>
          </ul>
        </div>

        <div class="info-card">
          <p class="info-card-quote">
            {{ aboutData.about.quote }}
          </p>
        </div>
      </div>
    </div>

    <div class="section-action">
      <button @click="scrollToQualification" class="primary-button">
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
        'src/images/2.jpeg',
        'src/images/3.jpeg',
      ],
      currentIndex: 1,
      slideWidth: 0,
      isDragging: false,
      startX: 0,
      dragOffset: 0,
      autoSlideInterval: null,
      slideResetTimeout: null,
      typingTimeouts: [],
      displayAbout: '',
    }
  },

  computed: {
    loopImages() {
      return [this.images[this.images.length - 1], ...this.images, this.images[0]]
    },
    sliderStyle() {
      return {
        transform: `translateX(${-this.currentIndex * this.slideWidth + this.dragOffset}px)`,
      }
    },
  },

  mounted() {
    this.updateSlideWidth()
    window.addEventListener('resize', this.updateSlideWidth)
    this.startAutoSlide()
    this.createTypingEffect(this.aboutData.about.typingTexts, 120, 60, 1500)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateSlideWidth)
    clearInterval(this.autoSlideInterval)
    clearTimeout(this.slideResetTimeout)
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

    startAutoSlide() {
      clearInterval(this.autoSlideInterval)
      this.autoSlideInterval = setInterval(() => {
        this.slideTo(this.currentIndex + 1)
      }, 5000)
    },

    updateSlideWidth() {
      const container = this.$el.querySelector('.about-carousel')
      if (container) {
        this.slideWidth = container.offsetWidth
      }
    },

    getClientX(e) {
      return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    },

    onDragStart(e) {
      this.isDragging = true
      this.startX = this.getClientX(e)
      clearInterval(this.autoSlideInterval)
    },

    onDragMove(e) {
      if (!this.isDragging) return
      this.dragOffset = this.getClientX(e) - this.startX
    },

    onDragEnd() {
      if (!this.isDragging) return

      const threshold = 10

      if (this.dragOffset < -threshold) {
        this.slideTo(this.currentIndex + 1)
      } else if (this.dragOffset > threshold) {
        this.slideTo(this.currentIndex - 1)
      } else {
        this.slideTo(this.currentIndex)
      }

      this.dragOffset = 0
      this.isDragging = false
      this.startAutoSlide()
    },

    slideTo(index) {
      this.currentIndex = index

      clearTimeout(this.slideResetTimeout)
      this.slideResetTimeout = setTimeout(() => {
        const slider = this.$refs.slider
        if (!slider) return
        slider.style.transition = 'none'

        if (this.currentIndex === 0) this.currentIndex = this.images.length
        if (this.currentIndex === this.images.length + 1) this.currentIndex = 1

        slider.style.transform = `translateX(${-this.currentIndex * this.slideWidth}px)`
        void slider.offsetWidth
        slider.style.transition = 'transform 0.5s ease-in-out'
      }, 500)
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
