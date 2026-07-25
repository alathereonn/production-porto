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
          <div :class="['about-music-card', { 'is-playing': isAboutSongPlaying, 'is-changing': isAboutSongChanging }]">
            <div class="about-music-accent"></div>

            <img
              class="about-music-cover"
              :src="resolveSongCoverAsset(currentAboutSong.thumbnailUrl)"
              alt=""
              aria-hidden="true"
            />

            <div class="about-music-body">
              <p class="about-music-label">{{ aboutData.about.song.label }}</p>
              <h3 class="about-music-title">
                {{ currentAboutSong.title }}
              </h3>
              <p class="about-music-artist">
                {{ currentAboutSong.artist }}
              </p>

              <div class="about-music-progress">
                <span class="about-music-time">{{ formatAboutSongTime(aboutSongCurrentTime) }}</span>
                <input
                  class="about-music-slider"
                  type="range"
                  min="0"
                  :max="aboutSongDuration || 0"
                  step="1"
                  :value="aboutSongCurrentTime"
                  :aria-label="aboutData.about.song.seekLabel"
                  :disabled="!isYouTubePlayerReady || !aboutSongDuration"
                  :style="{ '--song-progress': `${aboutSongProgressPercent}%` }"
                  @input="handleAboutSongSeekInput"
                  @change="commitAboutSongSeek"
                />
                <span class="about-music-time">{{ formatAboutSongTime(aboutSongDuration) }}</span>
              </div>

              <div class="about-music-controls">
                <button
                  v-if="hasMultipleAboutSongs"
                  class="about-music-previous"
                  type="button"
                  :aria-label="aboutData.about.song.previousLabel"
                  :disabled="isAboutSongChanging"
                  @click="previousAboutSong"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 5.75c0-.82-.92-1.31-1.6-.85l-9.24 6.25c-.6.41-.6 1.29 0 1.7l9.24 6.25c.68.46 1.6-.03 1.6-.85V5.75z"></path>
                    <path d="M5 5.75C5 5.34 4.66 5 4.25 5s-.75.34-.75.75v12.5c0 .41.34.75.75.75s.75-.34.75-.75V5.75z"></path>
                  </svg>
                </button>

                <button
                  class="about-music-play"
                  type="button"
                  :aria-label="isAboutSongPlaying ? aboutData.about.song.stopLabel : aboutData.about.song.playLabel"
                  @click="toggleAboutSong"
                >
                  <svg v-if="!isAboutSongPlaying" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 5h4v14H7z"></path>
                    <path d="M13 5h4v14h-4z"></path>
                  </svg>
                </button>

                <button
                  v-if="hasMultipleAboutSongs"
                  class="about-music-next"
                  type="button"
                  :aria-label="aboutData.about.song.nextLabel"
                  :disabled="isAboutSongChanging"
                  @click="nextAboutSong"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6 5.75c0-.82.92-1.31 1.6-.85l9.24 6.25c.6.41.6 1.29 0 1.7L7.6 19.1c-.68.46-1.6-.03-1.6-.85V5.75z"></path>
                    <path d="M19 5.75c0-.41.34-.75.75-.75s.75.34.75.75v12.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.75z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="about-music-hidden-player" aria-hidden="true">
              <div ref="aboutMusicPlayerRef"></div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>

    <ScrollReveal as="div" class="about-quote-panel" :delay="260">
      <p>
        "{{ aboutData.about.quote }}"
      </p>
    </ScrollReveal>

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
import { resolveSongCoverAsset } from '../data/songCoverAssets.js'
import { useTypewriterCycle } from '../composables/useTypewriterCycle.js'
import ScrollReveal from './ScrollReveal.vue'

let youtubeIframeApiPromise = null

const loadYouTubeIframeApi = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window is unavailable'))
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (youtubeIframeApiPromise) return youtubeIframeApiPromise

  youtubeIframeApiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady

    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === 'function') previousCallback()
      resolve(window.YT)
    }

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    if (existingScript) return

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    document.head.appendChild(script)
  })

  return youtubeIframeApiPromise
}

const extractYouTubeVideoId = (url) => {
  const match = url?.match(/\/embed\/([^?]+)/)
  return match?.[1] ?? ''
}

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
      resolveSongCoverAsset,
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
      isAboutSongPlaying: false,
      isAboutSongChanging: false,
      isAboutSongSeeking: false,
      isYouTubePlayerReady: false,
      isYouTubePlayerLoading: false,
      pendingAboutSongPlay: false,
      activeAboutSongIndex: 0,
      aboutSongCurrentTime: 0,
      aboutSongDuration: 0,
      aboutSongProgressFrameId: 0,
      aboutSongTransitionTimeoutId: 0,
      youtubePlayer: null,
    }
  },

  computed: {
    aboutSongList() {
      return this.aboutData.about.song.list
    },

    currentAboutSong() {
      return this.aboutSongList[this.activeAboutSongIndex] || this.aboutSongList[0]
    },

    hasMultipleAboutSongs() {
      return this.aboutSongList.length > 1
    },

    currentAboutSongVideoId() {
      return this.currentAboutSong.videoId || extractYouTubeVideoId(this.currentAboutSong.embedUrl)
    },

    aboutSongProgressPercent() {
      if (!this.aboutSongDuration) return 0
      return Math.min(100, Math.max(0, (this.aboutSongCurrentTime / this.aboutSongDuration) * 100))
    },
  },

  mounted() {
    this.startAboutTyping()
    this.initializeAboutSongPlayer()
  },

  beforeUnmount() {
    this.stopAboutTyping()
    if (this.aboutSongTransitionTimeoutId) window.clearTimeout(this.aboutSongTransitionTimeoutId)
    this.stopAboutSongProgress()
    this.youtubePlayer?.destroy?.()
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

    async toggleAboutSong() {
      if (!this.youtubePlayer || !this.isYouTubePlayerReady) {
        this.pendingAboutSongPlay = !this.pendingAboutSongPlay
        await this.initializeAboutSongPlayer()
      }

      if (!this.youtubePlayer || !this.isYouTubePlayerReady) return

      if (this.isAboutSongPlaying) {
        this.youtubePlayer.pauseVideo()
        this.isAboutSongPlaying = false
        this.stopAboutSongProgress()
        return
      }

      this.youtubePlayer.playVideo()
      this.isAboutSongPlaying = true
      this.startAboutSongProgress()
    },

    previousAboutSong() {
      this.changeAboutSong(-1)
    },

    nextAboutSong() {
      this.changeAboutSong(1)
    },

    changeAboutSong(direction) {
      if (!this.hasMultipleAboutSongs) return
      if (this.aboutSongTransitionTimeoutId) window.clearTimeout(this.aboutSongTransitionTimeoutId)

      this.isAboutSongChanging = true

      this.aboutSongTransitionTimeoutId = window.setTimeout(() => {
        const songCount = this.aboutSongList.length
        this.activeAboutSongIndex = (this.activeAboutSongIndex + direction + songCount) % songCount

        this.$nextTick(() => {
          this.syncAboutSongPlayerToCurrentSong()

          window.requestAnimationFrame(() => {
            this.isAboutSongChanging = false
            this.aboutSongTransitionTimeoutId = 0
          })
        })
      }, 180)
    },

    async initializeAboutSongPlayer() {
      if (this.youtubePlayer || this.isYouTubePlayerLoading) return

      this.isYouTubePlayerLoading = true

      try {
        const YT = await loadYouTubeIframeApi()
        if (!this.$refs.aboutMusicPlayerRef) return

        this.youtubePlayer = new YT.Player(this.$refs.aboutMusicPlayerRef, {
          width: '1',
          height: '1',
          videoId: this.currentAboutSongVideoId,
          playerVars: {
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: () => {
              this.isYouTubePlayerReady = true
              this.isYouTubePlayerLoading = false
              this.youtubePlayer.cueVideoById(this.currentAboutSongVideoId)
              window.setTimeout(() => this.refreshAboutSongProgress(), 400)

              if (this.pendingAboutSongPlay) {
                this.pendingAboutSongPlay = false
                this.youtubePlayer.playVideo()
                this.isAboutSongPlaying = true
                this.startAboutSongProgress()
              }
            },
            onStateChange: (event) => this.handleAboutSongPlayerStateChange(event),
            onError: () => {
              this.isAboutSongPlaying = false
              this.stopAboutSongProgress()
            },
          },
        })
      } catch {
        this.isYouTubePlayerLoading = false
      }
    },

    handleAboutSongPlayerStateChange(event) {
      const playerState = window.YT?.PlayerState
      if (!playerState) return

      if (event.data === playerState.PLAYING) {
        this.isAboutSongPlaying = true
        this.startAboutSongProgress()
        return
      }

      if (event.data === playerState.PAUSED) {
        this.isAboutSongPlaying = false
        this.stopAboutSongProgress()
        this.refreshAboutSongProgress()
        return
      }

      if (event.data === playerState.ENDED) {
        this.isAboutSongPlaying = false
        this.stopAboutSongProgress()
        this.aboutSongCurrentTime = this.aboutSongDuration
      }
    },

    syncAboutSongPlayerToCurrentSong() {
      this.aboutSongCurrentTime = 0
      this.aboutSongDuration = 0
      this.isAboutSongSeeking = false
      this.stopAboutSongProgress()

      if (!this.youtubePlayer || !this.isYouTubePlayerReady || !this.currentAboutSongVideoId) return

      if (this.isAboutSongPlaying) {
        this.youtubePlayer.loadVideoById(this.currentAboutSongVideoId)
        this.startAboutSongProgress()
        return
      }

      this.youtubePlayer.cueVideoById(this.currentAboutSongVideoId)
      window.setTimeout(() => this.refreshAboutSongProgress(), 400)
    },

    startAboutSongProgress() {
      this.stopAboutSongProgress()

      const updateProgress = () => {
        this.refreshAboutSongProgress()
        this.aboutSongProgressFrameId = window.requestAnimationFrame(updateProgress)
      }

      updateProgress()
    },

    stopAboutSongProgress() {
      if (!this.aboutSongProgressFrameId) return
      window.cancelAnimationFrame(this.aboutSongProgressFrameId)
      this.aboutSongProgressFrameId = 0
    },

    refreshAboutSongProgress() {
      if (!this.youtubePlayer || !this.isYouTubePlayerReady) return

      const duration = this.youtubePlayer.getDuration?.()
      if (Number.isFinite(duration) && duration > 0) {
        this.aboutSongDuration = duration
      }

      if (this.isAboutSongSeeking) return

      const currentTime = this.youtubePlayer.getCurrentTime?.()
      if (Number.isFinite(currentTime) && currentTime >= 0) {
        this.aboutSongCurrentTime = currentTime
      }
    },

    handleAboutSongSeekInput(event) {
      this.isAboutSongSeeking = true
      this.aboutSongCurrentTime = Number(event.target.value)
    },

    commitAboutSongSeek(event) {
      const seekTime = Number(event.target.value)
      if (!Number.isFinite(seekTime)) return

      this.aboutSongCurrentTime = seekTime
      this.youtubePlayer?.seekTo?.(seekTime, true)
      this.isAboutSongSeeking = false
      this.refreshAboutSongProgress()

      if (this.isAboutSongPlaying) {
        this.startAboutSongProgress()
      }
    },

    formatAboutSongTime(time) {
      if (!Number.isFinite(time) || time <= 0) return '0:00'

      const totalSeconds = Math.floor(time)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60

      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    },
  },
}
</script>
