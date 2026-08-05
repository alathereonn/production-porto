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
      class="project-showcase-shell scroll-bottom-200"
      :delay="200"
      :distance="41"
    >
      <Swiper
        class="project-showcase"
        :modules="swiperModules"
        effect="coverflow"
        :grab-cursor="true"
        :centered-slides="true"
        :slides-per-view="1"
        :space-between="16"
        :coverflow-effect="{
          rotate: 120,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: true
        }"
        :loop="true"
        aria-label="Featured project showcase"
      >
        <SwiperSlide
          v-for="project in projects"
          :key="project.title"
          class="project-showcase__slide"
        >
          <div class="project-showcase__media">
            <img
              :src="resolveImageAsset(project.image)"
              :alt="project.title"
              class="project-showcase__image"
              draggable="false"
            />

            <div
              v-if="getProjectLinks(project).length"
              class="project-showcase__media-actions"
            >
              <a
                v-for="link in getProjectLinks(project)"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="project-showcase__media-action"
                :aria-label="`${link.label}: ${project.title}`"
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
              {{ project.title }}
            </h3>

            <p class="project-showcase__description">
              {{ project.description }}
            </p>

            <div class="project-showcase__stack" aria-label="Tech stack">
              <span
                v-for="tech in project.tags"
                :key="`${project.title}-${tech}`"
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
        </SwiperSlide>
      </Swiper>
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
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import projectData from '../data/project.json'
import { resolveImageAsset } from '../data/imageAssets.js'
import ScrollReveal from './ScrollReveal.vue'

defineOptions({
  name: 'PortfolioProject',
})

const swiperModules = [EffectCoverflow, Autoplay]

const projects = computed(() => projectData.projects || [])

const getProjectLinks = (project) => {
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
}

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
</script>
