<template>
  <section id="project" class="project-section">
    <ScrollReveal>
      <h2 class="section-title">
        Featured <span class="text-primary">Projects</span>
      </h2>
      <div class="section-divider"></div>
    </ScrollReveal>

    <ScrollReveal
      as="div"
      class="project-showcase-shell"
      :delay="100"
    >
      <div
        class="project-showcase"
        :class="[
          `project-transition-${projectTransitionDirection}`,
          {
            'is-changing': isProjectChanging,
            'is-entering': isProjectEntering,
            'is-dragging': isProjectDragging
          }
        ]"
        tabindex="0"
        aria-label="Featured project showcase"
        @mouseenter="pauseAutoSwitch"
        @mouseleave="resumeAutoSwitch"
        @focusin="pauseAutoSwitch"
        @focusout="resumeAutoSwitch"
        @keydown.left.prevent="goToPreviousProject"
        @keydown.right.prevent="goToNextProject"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointercancel="handlePointerCancel"
      >
        <div class="project-showcase__media">
          <img
            :src="resolveImageAsset(activeProject.image)"
            :alt="activeProject.title"
            class="project-showcase__image"
            draggable="false"
          />

          <div v-if="activeProjectLinks.length" class="project-showcase__media-actions">
            <a
              v-for="link in activeProjectLinks"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="project-showcase__media-action"
              :aria-label="`${link.label}: ${activeProject.title}`"
              :title="link.label"
            >
              <svg v-if="link.type === 'github'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <svg v-else-if="link.type === 'demo'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="6" y1="12" x2="10" y2="12"></line>
                <line x1="8" y1="10" x2="8" y2="14"></line>
                <line x1="15" y1="13" x2="15.01" y2="13"></line>
                <line x1="18" y1="11" x2="18.01" y2="11"></line>
                <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
              </svg>
            </a>
          </div>
        </div>

        <div class="project-showcase__content">
          <h3 class="project-showcase__title">
            {{ activeProject.title }}
          </h3>

          <p class="project-showcase__description">
            {{ activeProject.description }}
          </p>

          <div class="project-showcase__stack" aria-label="Tech stack">
            <span
              v-for="tech in activeProject.tags"
              :key="tech"
              :class="[
                'project-tech-badge',
                getTechConfig(tech).bg,
                getTechConfig(tech).text
              ]"
            >
              <img
                v-if="getTechConfig(tech).icon"
                :src="`https://cdn.simpleicons.org/${getTechConfig(tech).icon}/${getTechConfig(tech).iconColor}`"
                class="project-tech-badge__icon"
                alt=""
              />
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="isProjectChanging && transitionFromProject && transitionToProject"
        :class="[
          'project-transition-stage',
          `project-transition-stage--${projectTransitionDirection}`
        ]"
        aria-hidden="true"
      >
        <div class="project-transition-preview project-transition-preview--from">
          <img
            :src="resolveImageAsset(transitionFromProject.image)"
            :alt="transitionFromProject.title"
            draggable="false"
          />
        </div>

        <div class="project-transition-info">
          <p class="project-transition-info__eyebrow">Project</p>
          <h3>{{ transitionToProject.title }}</h3>
          <p>{{ transitionToProject.description }}</p>

          <div class="project-transition-info__stack">
            <span
              v-for="tech in transitionToProject.tags"
              :key="`transition-${tech}`"
              :class="[
                'project-tech-badge',
                getTechConfig(tech).bg,
                getTechConfig(tech).text
              ]"
            >
              <img
                v-if="getTechConfig(tech).icon"
                :src="`https://cdn.simpleicons.org/${getTechConfig(tech).icon}/${getTechConfig(tech).iconColor}`"
                class="project-tech-badge__icon"
                alt=""
              />
              {{ tech }}
            </span>
          </div>
        </div>

        <div class="project-transition-preview project-transition-preview--to">
          <img
            :src="resolveImageAsset(transitionToProject.image)"
            :alt="transitionToProject.title"
            draggable="false"
          />
        </div>
      </div>
    </ScrollReveal>

    <ScrollReveal as="div" class="project-github-action" :delay="200">
      <a
        href="https://github.com/alathereonn"
        target="_blank"
        rel="noopener noreferrer"
        class="primary-button primary-button--compact"
      >
        See More on my GitHub
      </a>
    </ScrollReveal>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import projectData from '../data/project.json'
import { resolveImageAsset } from '../data/imageAssets.js'
import ScrollReveal from './ScrollReveal.vue'

defineOptions({
  name: 'PortfolioProject',
})

const AUTO_SWITCH_DELAY = 5000
const SWIPE_THRESHOLD = 50
const PROJECT_TRANSITION_OUT_DELAY = 460
const PROJECT_TRANSITION_ENTER_DELAY = 40

const activeProjectIndex = ref(0)
const isProjectChanging = ref(false)
const isProjectEntering = ref(false)
const isProjectDragging = ref(false)
const transitionFromProject = ref(null)
const transitionToProject = ref(null)
const projectTransitionDirection = ref('next')
const pointerStartX = ref(0)
const pointerStartY = ref(0)
const pointerDeltaX = ref(0)
const pointerDeltaY = ref(0)
const activePointerId = ref(null)

let autoSwitchTimer = null
let projectTransitionTimer = null
let projectViewportQuery = null

const projects = computed(() => projectData.projects || [])

const activeProject = computed(() => {
  return projects.value[activeProjectIndex.value] || projects.value[0] || {}
})

const activeProjectLinks = computed(() => {
  const project = activeProject.value
  const links = []

  if (project.github && project.github !== '#') {
    links.push({ href: project.github, label: 'View Source', type: 'github' })
  }

  if (project.demo && project.demo !== '#') {
    links.push({ href: project.demo, label: 'Live Demo', type: 'demo' })
  }

  if (project.itchio && project.itchio !== '#') {
    links.push({ href: project.itchio, label: 'Play Demo', type: 'itchio' })
  }

  return links
})

const getTechConfig = (tech) => {
  const config = {
    "Tailwind CSS": { bg: "bg-[#38bdf8]", text: "text-white", icon: "tailwindcss", iconColor: "white" },
    "CSS": { bg: "bg-[#1572B6]", text: "text-white", icon: "css3", iconColor: "white" },
    "C#": { bg: "bg-[#239120]", text: "text-white", icon: "csharp", iconColor: "white" },
    "React": { bg: "bg-[#20232A]", text: "text-white", icon: "react", iconColor: "61DAFB" },
    "Next.js": { bg: "bg-[#000000]", text: "text-white", icon: "nextdotjs", iconColor: "white" },
    "Vue": { bg: "bg-[#41B883]", text: "text-white", icon: "vuedotjs", iconColor: "white" },
    "Vue.js": { bg: "bg-[#41B883]", text: "text-white", icon: "vuedotjs", iconColor: "white" },
    "Vue 3": { bg: "bg-[#41B883]", text: "text-white", icon: "vuedotjs", iconColor: "white" },
    "JavaScript": { bg: "bg-[#F7DF1E]", text: "text-black", icon: "javascript", iconColor: "black" },
    "TypeScript": { bg: "bg-[#3178C6]", text: "text-white", icon: "typescript", iconColor: "white" },
    "Laravel": { bg: "bg-[#FF2D20]", text: "text-white", icon: "laravel", iconColor: "white" },
    "Bootstrap": { bg: "bg-[#7952B3]", text: "text-white", icon: "bootstrap", iconColor: "white" },
    "Python": { bg: "bg-[#3776AB]", text: "text-white", icon: "python", iconColor: "white" },
    "PHP": { bg: "bg-[#777BB4]", text: "text-white", icon: "php", iconColor: "white" },
    "Node.js": { bg: "bg-[#339933]", text: "text-white", icon: "nodedotjs", iconColor: "white" },
    "Express": { bg: "bg-[#000000]", text: "text-white", icon: "express", iconColor: "white" },
    "MySQL": { bg: "bg-[#4479A1]", text: "text-white", icon: "mysql", iconColor: "white" },
    "PostgreSQL": { bg: "bg-[#4169E1]", text: "text-white", icon: "postgresql", iconColor: "white" },
    "Supabase": { bg: "bg-[#3ECF8E]", text: "text-black", icon: "supabase", iconColor: "black" },
    "Cloudinary": { bg: "bg-[#3448C5]", text: "text-white", icon: "cloudinary", iconColor: "white" },
    "Docker": { bg: "bg-[#2496ED]", text: "text-white", icon: "docker", iconColor: "white" },
    "Docker Compose": { bg: "bg-[#2496ED]", text: "text-white", icon: "docker", iconColor: "white" },
    "Rust": { bg: "bg-[#000000]", text: "text-white", icon: "rust", iconColor: "white" },
    "Axum": { bg: "bg-[#6D28D9]", text: "text-white", icon: null },
    "Tokio": { bg: "bg-[#7C3AED]", text: "text-white", icon: null },
    "Rayon": { bg: "bg-[#9333EA]", text: "text-white", icon: null },
    "Vite": { bg: "bg-[#646CFF]", text: "text-white", icon: "vite", iconColor: "white" },
    "Axios": { bg: "bg-[#5A29E4]", text: "text-white", icon: "axios", iconColor: "white" },
    "Godot": { bg: "bg-[#478CBF]", text: "text-white", icon: "godotengine", iconColor: "white" },
    "GDScript": { bg: "bg-[#478CBF]", text: "text-white", icon: "godotengine", iconColor: "white" },
    "Aseprite": { bg: "bg-[#7D929E]", text: "text-white", icon: "aseprite", iconColor: "white" },
    "Unity": { bg: "bg-[#000000]", text: "text-white", icon: "unity", iconColor: "white" },
    "3D Modeling": { bg: "bg-[#EA8B2B]", text: "text-white", icon: "blender", iconColor: "white" },
    "Machine Learning": { bg: "bg-[#FF6F00]", text: "text-white", icon: null },
    "Jupyter": { bg: "bg-[#F37626]", text: "text-white", icon: "jupyter", iconColor: "white" },
    "Ollama": { bg: "bg-[#FFFFFF]", text: "text-black", icon: "ollama", iconColor: "black" },
    "Pixel Art": { bg: "bg-[#FFB1CE]", text: "text-black", icon: null },
    "Distributed Systems": { bg: "bg-[#8A2BE2]", text: "text-white", icon: null },
    "Networking": { bg: "bg-[#FF4500]", text: "text-white", icon: null },
    "Raft Consensus": { bg: "bg-[#E6522C]", text: "text-white", icon: null },
    "Social Innovation": { bg: "bg-[#BE185D]", text: "text-white", icon: null },
  }

  return config[tech] || { bg: "bg-gray-800", text: "text-gray-200", icon: null }
}

const normalizeProjectIndex = (index) => {
  const count = projects.value.length
  if (!count) return 0
  return (index + count) % count
}

const getProjectDirection = (nextIndex) => {
  const currentIndex = activeProjectIndex.value
  const count = projects.value.length

  if (count <= 1) return 'next'
  if (nextIndex === normalizeProjectIndex(currentIndex + 1)) return 'next'
  if (nextIndex === normalizeProjectIndex(currentIndex - 1)) return 'previous'

  return nextIndex > currentIndex ? 'next' : 'previous'
}

const setActiveProjectIndex = (index, shouldResetAutoSwitch = true, direction = null) => {
  const nextIndex = normalizeProjectIndex(index)
  if (nextIndex === activeProjectIndex.value || projects.value.length <= 1) return

  if (projectTransitionTimer) window.clearTimeout(projectTransitionTimer)

  projectTransitionDirection.value = direction || getProjectDirection(nextIndex)
  transitionFromProject.value = activeProject.value
  transitionToProject.value = projects.value[nextIndex]
  isProjectChanging.value = true
  isProjectEntering.value = false
  projectTransitionTimer = window.setTimeout(() => {
    activeProjectIndex.value = nextIndex

    nextTick(() => {
      window.requestAnimationFrame(() => {
        isProjectChanging.value = false
        isProjectEntering.value = true

        projectTransitionTimer = window.setTimeout(() => {
          isProjectEntering.value = false
          transitionFromProject.value = null
          transitionToProject.value = null
          projectTransitionTimer = null
        }, PROJECT_TRANSITION_ENTER_DELAY)
      })
    })
  }, PROJECT_TRANSITION_OUT_DELAY)

  if (shouldResetAutoSwitch) resetAutoSwitch()
}

const goToNextProject = (shouldResetAutoSwitch = true) => {
  setActiveProjectIndex(activeProjectIndex.value + 1, shouldResetAutoSwitch, 'next')
}

const goToPreviousProject = (shouldResetAutoSwitch = true) => {
  setActiveProjectIndex(activeProjectIndex.value - 1, shouldResetAutoSwitch, 'previous')
}

const startAutoSwitch = () => {
  stopAutoSwitch()
  if (projects.value.length <= 1 || projectViewportQuery?.matches) return

  autoSwitchTimer = window.setInterval(() => {
    goToNextProject(false)
  }, AUTO_SWITCH_DELAY)
}

const stopAutoSwitch = () => {
  if (!autoSwitchTimer) return
  window.clearInterval(autoSwitchTimer)
  autoSwitchTimer = null
}

const pauseAutoSwitch = () => {
  stopAutoSwitch()
}

const resumeAutoSwitch = () => {
  startAutoSwitch()
}

const resetAutoSwitch = () => {
  stopAutoSwitch()
  startAutoSwitch()
}

const handleProjectViewportChange = () => {
  if (projectViewportQuery?.matches) {
    stopAutoSwitch()
    return
  }

  startAutoSwitch()
}

const clearProjectSelection = () => {
  const selection = window.getSelection?.()
  if (selection && !selection.isCollapsed) {
    selection.removeAllRanges()
  }
}

const handlePointerDown = (event) => {
  if (event.target.closest('a, button')) return

  isProjectDragging.value = true
  activePointerId.value = event.pointerId
  pointerStartX.value = event.clientX
  pointerStartY.value = event.clientY
  pointerDeltaX.value = 0
  pointerDeltaY.value = 0
  event.preventDefault()
  event.currentTarget.setPointerCapture?.(event.pointerId)
}

const handlePointerMove = (event) => {
  if (activePointerId.value !== event.pointerId) return

  pointerDeltaX.value = event.clientX - pointerStartX.value
  pointerDeltaY.value = event.clientY - pointerStartY.value

  if (
    Math.abs(pointerDeltaX.value) > 6 &&
    Math.abs(pointerDeltaX.value) > Math.abs(pointerDeltaY.value)
  ) {
    event.preventDefault()
    clearProjectSelection()
  }
}

const handlePointerUp = (event) => {
  if (activePointerId.value !== event.pointerId) return

  event.currentTarget.releasePointerCapture?.(event.pointerId)

  if (
    Math.abs(pointerDeltaX.value) >= SWIPE_THRESHOLD &&
    Math.abs(pointerDeltaX.value) > Math.abs(pointerDeltaY.value)
  ) {
    pointerDeltaX.value < 0 ? goToNextProject() : goToPreviousProject()
  }

  activePointerId.value = null
  isProjectDragging.value = false
}

const handlePointerCancel = (event) => {
  if (activePointerId.value === event.pointerId) {
    event.currentTarget.releasePointerCapture?.(event.pointerId)
    activePointerId.value = null
    isProjectDragging.value = false
  }
}

onMounted(() => {
  projectViewportQuery = window.matchMedia('(max-width: 767px)')

  if (projectViewportQuery.addEventListener) {
    projectViewportQuery.addEventListener('change', handleProjectViewportChange)
  } else if (projectViewportQuery.addListener) {
    projectViewportQuery.addListener(handleProjectViewportChange)
  }

  startAutoSwitch()
})

onUnmounted(() => {
  stopAutoSwitch()
  if (projectTransitionTimer) window.clearTimeout(projectTransitionTimer)
  isProjectEntering.value = false
  transitionFromProject.value = null
  transitionToProject.value = null

  if (projectViewportQuery?.removeEventListener) {
    projectViewportQuery.removeEventListener('change', handleProjectViewportChange)
  } else if (projectViewportQuery?.removeListener) {
    projectViewportQuery.removeListener(handleProjectViewportChange)
  }
})
</script>
