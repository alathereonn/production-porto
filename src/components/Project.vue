<template>
  <section id="project" class="project-section">
    <h2 class="section-title">
      Featured <span class="text-primary">Projects</span>
    </h2>
    <div class="section-divider"></div>

    <div 
      class="project-carousel group"
      @mouseenter="pauseAutoScroll"
      @mouseleave="resumeAutoScroll"
    >
      
      <button 
        @click="scrollPrev" 
        class="project-nav-button project-nav-button--prev"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div 
        ref="sliderRef" 
        @scroll="handleScroll"
        class="project-slider hide-scrollbar"
      >
        
        <div 
          v-for="(project, index) in infiniteProjectList" 
          :key="`${project.title}-${index}`"
          class="project-card group/card"
        >
          <div class="project-image-wrap">
            <img 
              :src="project.image" 
              :alt="project.title"
              class="project-image"
            />
            <div class="project-overlay">
              
              <a v-if="project.github && project.github !== '#'" :href="project.github" target="_blank" class="project-action-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-6 md:h-6"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>

              <a v-if="project.demo && project.demo !== '#'" :href="project.demo" target="_blank" class="project-action-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-6 md:h-6"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>

              <a v-if="project.itchio && project.itchio !== '#'" :href="project.itchio" target="_blank" title="Play on Itch.io" class="project-action-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-6 md:h-6">
                  <line x1="6" y1="12" x2="10" y2="12"></line>
                  <line x1="8" y1="10" x2="8" y2="14"></line>
                  <line x1="15" y1="13" x2="15.01" y2="13"></line>
                  <line x1="18" y1="11" x2="18.01" y2="11"></line>
                  <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                </svg>
              </a>

            </div>
          </div>

          <div class="project-card-body">
            <div class="project-card-copy">
              <h3 class="project-card-title">
                {{ project.title }}
              </h3>
              <p class="project-card-description">
                {{ project.description }}
              </p>
            </div>

            <div class="project-tech">
              <p class="project-tech-label">Tech Stack</p>
              <div class="project-tech-list">
                <span 
                  v-for="tech in project.tags" 
                  :key="tech"
                  :class="[
                    'text-[9px] md:text-xs font-bold px-2 py-1 md:px-2.5 md:py-1.5 rounded-sm uppercase tracking-widest flex items-center gap-1.5 md:gap-2 shadow-sm',
                    getTechConfig(tech).bg,
                    getTechConfig(tech).text
                  ]"
                >
                  <img 
                    v-if="getTechConfig(tech).icon" 
                    :src="`https://cdn.simpleicons.org/${getTechConfig(tech).icon}/${getTechConfig(tech).iconColor}`" 
                    class="w-3 h-3 md:w-3.5 md:h-3.5 object-contain"
                    alt=""
                  />
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <button 
        @click="scrollNext" 
        class="project-nav-button project-nav-button--next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

    </div>

    <div class="flex justify-center mt-12 md:mt-12 relative z-10">
      <a
        href="https://github.com/alathereonn"
        target="_blank"
        rel="noopener noreferrer"
        class="primary-button primary-button--compact"
      >
        See More on my GitHub
      </a>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
// PERBAIKAN 1: Import data dari file project.json yang baru
import projectData from '../data/project.json'

defineOptions({
  name: 'PortfolioProject',
})

const sliderRef = ref(null)
let autoScrollTimer = null
let isTransitioning = false 

// MAPPER STYLING & ICON (Dibiarkan di sini karena ini fungsionalitas UI, bukan sekadar data teks)
const getTechConfig = (tech) => {
  const config = {
    "Tailwind CSS": { bg: "bg-[#38bdf8]", text: "text-white", icon: "tailwindcss", iconColor: "white" },
    "CSS": { bg: "bg-[#1572B6]", text: "text-white", icon: "css3", iconColor: "white" }, 
    "C#": { bg: "bg-[#239120]", text: "text-white", icon: "csharp", iconColor: "white" },
    "React": { bg: "bg-[#20232A]", text: "text-white", icon: "react", iconColor: "61DAFB" }, 
    "Vue": { bg: "bg-[#41B883]", text: "text-white", icon: "vuedotjs", iconColor: "white" },
    "Vue 3": { bg: "bg-[#41B883]", text: "text-white", icon: "vuedotjs", iconColor: "white" },
    "JavaScript": { bg: "bg-[#F7DF1E]", text: "text-black", icon: "javascript", iconColor: "black" },
    "TypeScript": { bg: "bg-[#3178C6]", text: "text-white", icon: "typescript", iconColor: "white" },
    "Bootstrap": { bg: "bg-[#7952B3]", text: "text-white", icon: "bootstrap", iconColor: "white" },
    "Python": { bg: "bg-[#3776AB]", text: "text-white", icon: "python", iconColor: "white" },
    "PHP": { bg: "bg-[#777BB4]", text: "text-white", icon: "php", iconColor: "white" },
    "MySQL": { bg: "bg-[#4479A1]", text: "text-white", icon: "mysql", iconColor: "white" },
    "PostgreSQL": { bg: "bg-[#4169E1]", text: "text-white", icon: "postgresql", iconColor: "white" },
    "Supabase": { bg: "bg-[#3ECF8E]", text: "text-black", icon: "supabase", iconColor: "black" },
    "Docker": { bg: "bg-[#2496ED]", text: "text-white", icon: "docker", iconColor: "white" },
    "Docker Compose": { bg: "bg-[#2496ED]", text: "text-white", icon: "docker", iconColor: "white" },
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
  };
  return config[tech] || { bg: "bg-gray-800", text: "text-gray-200", icon: null };
}

// Menghubungkan logika infinite scroll dengan data dari JSON
const infiniteProjectList = computed(() => {
  // PERBAIKAN 2: Mengambil array dari projectData.list
  const dataProjects = projectData.projects; 
  
  if (!dataProjects || dataProjects.length === 0) return [];
  
  const firstItems = dataProjects.slice(0, 2) 
  const lastItems = dataProjects.slice(-2)    
  return [...lastItems, ...dataProjects, ...firstItems]
})

const getGap = () => {
  return window.innerWidth >= 768 ? 48 : 24; 
}

const setInitialPosition = () => {
  if (sliderRef.value && sliderRef.value.children.length > 0) {
    const cardWidth = sliderRef.value.children[0].offsetWidth + getGap() 
    sliderRef.value.scrollLeft = cardWidth * 2 
  }
}

const handleScroll = () => {
  if (!sliderRef.value || isTransitioning) return
  const slider = sliderRef.value
  
  // Mencegah error jika belum ada child element
  if (slider.children.length === 0) return;

  const cardWidth = slider.children[0].offsetWidth + getGap() 
  const maxScroll = slider.scrollWidth - slider.clientWidth

  if (slider.scrollLeft <= 5) {
    isTransitioning = true
    slider.style.scrollBehavior = 'auto'
    slider.scrollLeft = maxScroll - (cardWidth * 2) 
    
    requestAnimationFrame(() => {
      slider.style.scrollBehavior = 'smooth'
      isTransitioning = false
    })
  }
  else if (slider.scrollLeft >= maxScroll - 5) {
    isTransitioning = true
    slider.style.scrollBehavior = 'auto'
    slider.scrollLeft = cardWidth * 2 
    
    requestAnimationFrame(() => {
      slider.style.scrollBehavior = 'smooth'
      isTransitioning = false
    })
  }
}

const scrollNext = () => {
  if (sliderRef.value && !isTransitioning) {
    sliderRef.value.style.scrollBehavior = 'smooth'
    sliderRef.value.scrollBy({ left: sliderRef.value.clientWidth })
    resetAutoScroll()
  }
}

const scrollPrev = () => {
  if (sliderRef.value && !isTransitioning) {
    sliderRef.value.style.scrollBehavior = 'smooth'
    sliderRef.value.scrollBy({ left: -sliderRef.value.clientWidth })
    resetAutoScroll()
  }
}

const startAutoScroll = () => {
  pauseAutoScroll()
  autoScrollTimer = setInterval(() => {
    scrollNext()
  }, 10000)
}
const pauseAutoScroll = () => {
  if (autoScrollTimer) clearInterval(autoScrollTimer)
}
const resumeAutoScroll = () => {
  startAutoScroll()
}
const resetAutoScroll = () => {
  pauseAutoScroll()
  startAutoScroll()
}

onMounted(() => {
  nextTick(() => {
    setInitialPosition()
    startAutoScroll()
  })
})

onUnmounted(() => {
  pauseAutoScroll()
})

</script>
