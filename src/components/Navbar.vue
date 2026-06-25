<template>
  <nav ref="navbarRef" class="navbar">
    <div class="navbar-inner">
      <button class="brand-button" type="button" aria-label="Go to Home" @click="scrollTo('home')">
        <img
          class="brand-logo"
          src="/alathereonn-logo-transparent.png"
          alt=""
          aria-hidden="true"
        />
        <span class="brand-name">ALATHEREONN</span>
      </button>

      <div class="nav-links">
        <button
          v-for="link in navLinks"
          :key="link.target"
          @click="scrollTo(link.target)"
          :class="['nav-link', { 'is-active': active === link.target }]"
        >
          {{ link.label }}
        </button>
      </div>

      <button
        class="mobile-menu-toggle"
        :class="{ 'is-open': isMobileMenuOpen }"
        type="button"
        :aria-expanded="isMobileMenuOpen"
        :aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
        aria-controls="mobile-navigation"
        @click="toggleMobileMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div
      id="mobile-navigation"
      class="mobile-navigation"
      :class="{ 'is-open': isMobileMenuOpen }"
      :aria-hidden="!isMobileMenuOpen"
    >
      <button
        v-for="link in navLinks"
        :key="`mobile-${link.target}`"
        type="button"
        :class="['mobile-navigation-link', { 'is-active': active === link.target }]"
        :tabindex="isMobileMenuOpen ? 0 : -1"
        @click="scrollTo(link.target)"
      >
        {{ link.label }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'PortfolioNavbar',
})

const navLinks = [
  { label: 'home', target: 'home' },
  { label: 'about', target: 'about' },
  { label: 'qualification', target: 'qualification' },
  { label: 'project', target: 'project' },
  { label: 'contact', target: 'contact' },
]

const active = ref('home')
const isMobileMenuOpen = ref(false)
const navbarRef = ref(null)

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const getNavbarOffset = () => {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
  const numericValue = Number.parseFloat(value)
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

  return value.trim().endsWith('rem') ? numericValue * rootFontSize : numericValue
}

const scrollTo = (id) => {
  active.value = id
  closeMobileMenu()

  const target = document.getElementById(id)
  if (!target) return

  const start = window.pageYOffset
  const end = target.getBoundingClientRect().top + start - getNavbarOffset()

  window.scrollTo({
    top: end,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  navLinks.forEach((link) => {
    const el = document.getElementById(link.target)
    if (!el) return

    const top = window.scrollY
    const offset = el.offsetTop - 150
    const height = el.offsetHeight

    if (top >= offset && top < offset + height) {
      active.value = link.target
    }
  })
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') closeMobileMenu()
}

const handleDocumentPointerDown = (event) => {
  if (!isMobileMenuOpen.value) return
  if (navbarRef.value?.contains(event.target)) return

  closeMobileMenu()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('pointerdown', handleDocumentPointerDown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
})
</script>
