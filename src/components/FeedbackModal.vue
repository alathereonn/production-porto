<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="feedback-modal-overlay"
        @click.self="emitClose"
      >
        <section
          class="feedback-modal"
          :class="`feedback-modal--${variant}`"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          aria-describedby="feedback-modal-message"
        >
          <button
            ref="closeButtonRef"
            class="feedback-modal-close"
            type="button"
            aria-label="Close notification"
            @click="emitClose"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>

          <div class="feedback-modal-icon" aria-hidden="true">
            <svg v-if="variant === 'success'" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v4"></path>
              <path d="M12 16h.01"></path>
            </svg>
          </div>

          <h2 id="feedback-modal-title" class="feedback-modal-title">{{ title }}</h2>
          <p id="feedback-modal-message" class="feedback-modal-message">{{ message }}</p>

          <button
            ref="actionButtonRef"
            class="feedback-modal-action"
            type="button"
            @click="emitClose"
          >
            Got It
          </button>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value),
  },
})

const emit = defineEmits(['close'])

const closeButtonRef = ref(null)
const actionButtonRef = ref(null)
let previousBodyOverflow = ''

const emitClose = () => {
  emit('close')
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') emitClose()
}

const lockPageScroll = () => {
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

const restorePageScroll = () => {
  document.body.style.overflow = previousBodyOverflow
}

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen) {
      lockPageScroll()
      window.addEventListener('keydown', handleKeydown)
      await nextTick()
      actionButtonRef.value?.focus()
      return
    }

    restorePageScroll()
    window.removeEventListener('keydown', handleKeydown)
  }
)

onBeforeUnmount(() => {
  restorePageScroll()
  window.removeEventListener('keydown', handleKeydown)
})
</script>
