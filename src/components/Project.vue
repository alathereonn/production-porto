<template>
  <section id="project" class="min-h-screen py-20 md:py-32 px-4 md:px-8 scroll-mt-24">
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-4">
      Featured <span class="text-primary">Projects</span>
    </h2>
    <div class="w-24 h-1 bg-primary mx-auto mb-12 md:mb-20 shadow-[0_0_10px_var(--color-primary)]"></div>

    <div 
      class="relative max-w-6xl mx-auto group"
      @mouseenter="pauseAutoScroll"
      @mouseleave="resumeAutoScroll"
    >
      
      <button 
        @click="scrollPrev" 
        class="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-10 p-4 bg-darkbg border border-primary text-primary rounded-full shadow-[0_0_15px_var(--color-primary)] hover:bg-primary hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div 
        ref="sliderRef" 
        @scroll="handleScroll"
        class="flex overflow-x-auto gap-6 md:gap-12 snap-x snap-mandatory pb-6 md:pb-10 hide-scrollbar items-stretch"
        style="scroll-behavior: auto;" 
      >
        
        <div 
          v-for="(project, index) in infiniteProjectList" 
          :key="`${project.title}-${index}`"
          class="snap-start flex-none w-full md:w-[calc(50%-1.5rem)] group/card bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 shadow-xl flex flex-col"
        >
          <div class="relative overflow-hidden aspect-video shrink-0">
            <img 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover transition duration-500 group-hover/card:scale-110 opacity-80 group-hover/card:opacity-100"
            />
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 md:gap-6">
              
              <a v-if="project.github && project.github !== '#'" :href="project.github" target="_blank" class="p-2.5 md:p-3 bg-primary text-black rounded-full hover:scale-110 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-6 md:h-6"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>

              <a v-if="project.demo && project.demo !== '#'" :href="project.demo" target="_blank" class="p-2.5 md:p-3 bg-primary text-black rounded-full hover:scale-110 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-6 md:h-6"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>

              <a v-if="project.itchio && project.itchio !== '#'" :href="project.itchio" target="_blank" title="Play on Itch.io" class="p-2.5 md:p-3 bg-primary text-black rounded-full hover:scale-110 transition">
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

          <div class="p-6 md:p-8 flex flex-col flex-1 justify-between">
            <div class="mb-6 md:mb-8">
              <h3 class="text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover/card:text-primary transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-4 md:line-clamp-none">
                {{ project.description }}
              </p>
            </div>

            <div class="mt-auto">
              <p class="text-[10px] md:text-xs font-bold text-primary mb-2 md:mb-3 uppercase tracking-widest">Tech Stack</p>
              <div class="flex flex-wrap gap-1.5 md:gap-2">
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
        class="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-10 p-4 bg-darkbg border border-primary text-primary rounded-full shadow-[0_0_15px_var(--color-primary)] hover:bg-primary hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

    </div>

    <div class="flex justify-center mt-12 md:mt-12 relative z-10">
      <a
        href="https://github.com/alathereonn"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative px-8 py-3 md:px-10 md:py-4 rounded-xl
              text-sm md:text-base font-semibold tracking-wide
              border border-primary
              text-primary
              bg-transparent
              transition-all duration-300
              transform
              shadow-[0_6px_0_0_var(--color-primary)]
              
              hover:bg-primary
              hover:text-black
              hover:-translate-y-1
              hover:shadow-[0_12px_25px_rgba(190,24,93,0.4)]

              active:translate-y-2
              active:shadow-[0_3px_0_0_var(--color-primary)]"
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

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}
</style>