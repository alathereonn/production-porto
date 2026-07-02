<template>
  <component
    :is="as"
    ref="revealElement"
    class="scroll-reveal"
    :class="{ 'is-visible': isVisible }"
    :style="revealStyle"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  as: { type: String, default: 'div' },
  delay: { type: Number, default: 0 },
  direction: {
    type: String,
    default: 'up',
    validator: (value) => ['up', 'down', 'left', 'right'].includes(value),
  },
  distance: { type: Number, default: 28 },
  once: { type: Boolean, default: true },
})

const revealElement = ref(null)
const isVisible = ref(false)
let observer = null

const revealStyle = computed(() => {
  const distance = `${props.distance}px`
  const offsets = {
    up: ['0px', distance],
    down: ['0px', `-${distance}`],
    left: [distance, '0px'],
    right: [`-${distance}`, '0px'],
  }
  const [offsetX, offsetY] = offsets[props.direction]

  return {
    '--reveal-delay': `${props.delay}ms`,
    '--reveal-offset-x': offsetX,
    '--reveal-offset-y': offsetY,
  }
})

onMounted(() => {
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (props.once) observer?.unobserve(entry.target)
      } else if (!props.once) {
        isVisible.value = false
      }
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  if (revealElement.value) observer.observe(revealElement.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
