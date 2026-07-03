import { onScopeDispose, ref } from 'vue'

export const useTypewriterCycle = (texts, options = {}) => {
  const {
    typingSpeed = 80,
    deletingSpeed = 45,
    holdDuration = 1200,
    nextTextDelay = 280,
  } = options

  const textList = Array.isArray(texts) ? texts.filter((text) => typeof text === 'string') : []
  const displayedText = ref('')
  let currentTextIndex = 0
  let currentCharacterIndex = 0
  let isDeleting = false
  let timeoutId = 0
  let isRunning = false

  const scheduleNextStep = (delay) => {
    timeoutId = window.setTimeout(() => {
      timeoutId = 0
      step()
    }, delay)
  }

  const step = () => {
    if (!isRunning || textList.length === 0) return

    const currentText = textList[currentTextIndex]

    if (!isDeleting && currentCharacterIndex === currentText.length) {
      isDeleting = true
      scheduleNextStep(holdDuration)
      return
    }

    if (isDeleting && currentCharacterIndex === 0) {
      isDeleting = false
      currentTextIndex = (currentTextIndex + 1) % textList.length
      scheduleNextStep(nextTextDelay)
      return
    }

    currentCharacterIndex += isDeleting ? -1 : 1
    displayedText.value = currentText.slice(0, currentCharacterIndex)
    scheduleNextStep(isDeleting ? deletingSpeed : typingSpeed)
  }

  const start = () => {
    if (isRunning) return

    if (textList.length === 0) {
      displayedText.value = ''
      return
    }

    isRunning = true

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      displayedText.value = textList[0]
      return
    }

    scheduleNextStep(0)
  }

  const stop = () => {
    isRunning = false
    if (timeoutId) window.clearTimeout(timeoutId)
    timeoutId = 0
  }

  onScopeDispose(stop)

  return {
    displayedText,
    start,
    stop,
  }
}
