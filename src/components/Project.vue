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

    <section class="github-activity-section" aria-label="GitHub contribution activity">
      <ScrollReveal
        as="div"
        class="github-activity-card scroll-bottom-200"
        :delay="200"
        :distance="41"
      >
        <div class="github-activity-header">
          <p class="github-activity-kicker">
            <span class="github-activity-live-dot" aria-hidden="true"></span>
            Contribution activity
          </p>

          <div class="github-activity-legend" aria-label="Contribution intensity legend">
            <span>Less</span>
            <span
              v-for="level in contributionLevels"
              :key="level"
              class="github-activity-legend-day"
              :data-level="level"
              aria-hidden="true"
            ></span>
            <span>More</span>
          </div>
        </div>

        <p v-if="isLoading" class="github-activity-status">
          Loading GitHub activity...
        </p>

        <template v-else>
          <p v-if="errorMessage" class="github-activity-status github-activity-status--muted">
            {{ errorMessage }}
          </p>

          <div class="github-stats-grid" aria-label="GitHub statistics">
            <div
              v-for="stat in statCards"
              :key="stat.label"
              class="github-stat-card"
            >
              <strong class="github-stat-value">{{ stat.value }}</strong>
              <span class="github-stat-label">{{ stat.label }}</span>
            </div>
          </div>

          <div class="github-calendar-panel">
            <div class="github-calendar-scroll">
              <div
                class="github-calendar-months"
                :style="calendarGridStyle"
                aria-hidden="true"
              >
                <span
                  v-for="(label, index) in monthLabels"
                  :key="`${label}-${index}`"
                >
                  {{ label }}
                </span>
              </div>

              <div class="github-calendar-body">
                <div class="github-calendar-weekdays" aria-hidden="true">
                  <span></span>
                  <span>Mon</span>
                  <span></span>
                  <span>Wed</span>
                  <span></span>
                  <span>Fri</span>
                  <span></span>
                </div>

                <div class="github-calendar-grid" :style="calendarGridStyle">
                  <span
                    v-for="(day, index) in flatCalendarDays"
                    :key="day?.date || `empty-${index}`"
                    class="github-calendar-day"
                    :class="{ 'github-calendar-day--empty': !day }"
                    :data-level="getContributionLevel(day?.contributionCount || 0)"
                    :title="day ? getContributionTitle(day) : ''"
                  ></span>
                </div>
              </div>
            </div>
          </div>

          <div class="github-summary-grid" aria-label="Contribution summary">
            <div>
              <span>Contributions in the last year</span>
              <strong>{{ contributionTotalText }}</strong>
              <small>{{ contributionDateRange }}</small>
            </div>
            <div>
              <span>Longest streak</span>
              <strong>{{ formatDays(activity?.longestStreak || 0) }}</strong>
              <small>Rock - Hard! Man!</small>
            </div>
            <div>
              <span>Current streak</span>
              <strong>{{ formatDays(activity?.currentStreak || 0) }}</strong>
              <small>Rock - Hard! Man!</small>
            </div>
          </div>

          <div class="github-language-row">
            <div>
              <p class="github-language-title">Top Languages</p>
              <div v-if="topLanguages.length" class="github-language-list">
                <span
                  v-for="language in topLanguages"
                  :key="language.name"
                  class="github-language-pill"
                  :style="{ '--language-color': language.color || 'var(--color-primary)' }"
                >
                  <span class="github-language-dot" aria-hidden="true"></span>
                  {{ language.name }}
                  <strong>{{ language.percent }}%</strong>
                </span>
              </div>
              <p v-else class="github-language-empty">
                No public language data available yet.
              </p>
            </div>
          </div>
        </template>
      </ScrollReveal>
    </section>

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
import { computed, onMounted, onUnmounted, ref } from 'vue'
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
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'alathereonn'
const contributionLevels = [0, 1, 2, 3, 4]

const isLoading = ref(true)
const errorMessage = ref('')
const activity = ref(null)
let controller = null

const emptyActivity = {
  username: GITHUB_USERNAME,
  profileUrl: `https://github.com/${GITHUB_USERNAME}`,
  repositories: 0,
  stars: 0,
  followers: 0,
  totalContributions: 0,
  longestStreak: 0,
  currentStreak: 0,
  weeks: [],
  topLanguages: [],
  calendarSource: 'empty',
}

const topLanguages = computed(() => activity.value?.topLanguages || [])
const hasExactCalendar = computed(() => Boolean(activity.value?.weeks?.length))
const displayCalendarWeeks = computed(() => {
  if (activity.value?.weeks?.length) return activity.value.weeks

  return createEmptyCalendarWeeks()
})
const contributionDateRange = computed(() => {
  const days = displayCalendarWeeks.value
    .flatMap((week) => week.contributionDays || [])
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  if (!days.length) return 'Last 12 months'

  return `${formatDate(days[0].date)} - ${formatDate(days[days.length - 1].date)}`
})
const contributionTotalText = computed(() => {
  return hasExactCalendar.value ? formatNumber(activity.value?.totalContributions || 0) : '--'
})

const statCards = computed(() => [
  {
    label: 'Repositories',
    value: formatNumber(activity.value?.repositories || 0),
  },
  {
    label: 'Stars',
    value: formatNumber(activity.value?.stars || 0),
  },
  {
    label: 'Followers',
    value: formatNumber(activity.value?.followers || 0),
  },
  {
    label: 'Contributions',
    value: hasExactCalendar.value ? formatNumber(activity.value?.totalContributions || 0) : '--',
  },
])

const calendarWeeks = computed(() => {
  return displayCalendarWeeks.value.map((week) => {
    const daysByWeekday = new Map(
      (week.contributionDays || []).map((day) => [day.weekday, day]),
    )

    return Array.from({ length: 7 }, (_, weekday) => daysByWeekday.get(weekday) || null)
  })
})

const flatCalendarDays = computed(() => calendarWeeks.value.flat())
const calendarGridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${Math.max(calendarWeeks.value.length, 1)}, 0.75rem)`,
}))

const monthLabels = computed(() => {
  return calendarWeeks.value.map((week, index) => {
    const firstDay = week.find(Boolean)
    if (!firstDay) return ''

    const date = new Date(firstDay.date)
    const previousWeek = calendarWeeks.value[index - 1]
    const previousDay = previousWeek?.find(Boolean)
    const previousMonth = previousDay ? new Date(previousDay.date).getMonth() : null

    if (index === 0 || date.getMonth() !== previousMonth) {
      return date.toLocaleString('en-US', { month: 'short' })
    }

    return ''
  })
})

const loadGithubActivity = async () => {
  controller = new AbortController()
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('/api/github-stats', {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
    const contentType = response.headers.get('content-type') || ''

    if (!response.ok || !contentType.includes('application/json')) {
      throw new Error('Serverless API is unavailable.')
    }

    const payload = await response.json()
    if (!controller.signal.aborted) activity.value = payload
  } catch {
    if (controller.signal.aborted) return

    try {
      activity.value = await loadPublicFallbackStats(controller.signal)
      errorMessage.value = ''
    } catch {
      activity.value = emptyActivity
      errorMessage.value = 'Unable to load GitHub activity right now.'
    }
  } finally {
    if (!controller.signal.aborted) isLoading.value = false
  }
}

const loadPublicFallbackStats = async (signal) => {
  const headers = { Accept: 'application/vnd.github+json' }
  const [userResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}`, { headers, signal }),
    fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?per_page=100&type=owner&sort=updated`, { headers, signal }),
  ])

  if (!userResponse.ok || !reposResponse.ok) {
    throw new Error('Unable to load GitHub REST data.')
  }

  const user = await userResponse.json()
  const repos = await reposResponse.json()
  const calendar = await loadPublicEventsCalendar(user.login || GITHUB_USERNAME, signal)

  return {
    ...emptyActivity,
    username: user.login || GITHUB_USERNAME,
    profileUrl: user.html_url || emptyActivity.profileUrl,
    repositories: user.public_repos || repos.length,
    stars: repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0),
    followers: user.followers || 0,
    totalContributions: calendar.totalContributions,
    longestStreak: calendar.longestStreak,
    currentStreak: calendar.currentStreak,
    weeks: calendar.weeks,
    topLanguages: getTopLanguages(repos),
    calendarSource: calendar.calendarSource,
  }
}

const loadPublicEventsCalendar = async (username, signal) => {
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal,
    })

    if (!response.ok) throw new Error('Unable to load GitHub public events.')

    const weeks = createCalendarWeeks(await response.json())
    const streaks = calculateStreaks(weeks)

    return {
      totalContributions: weeks
        .flatMap((week) => week.contributionDays || [])
        .reduce((total, day) => total + (day.contributionCount || 0), 0),
      longestStreak: streaks.longestStreak,
      currentStreak: streaks.currentStreak,
      weeks,
      calendarSource: 'public_events',
    }
  } catch {
    return {
      totalContributions: 0,
      longestStreak: 0,
      currentStreak: 0,
      weeks: createEmptyCalendarWeeks(),
      calendarSource: 'empty',
    }
  }
}

const getTopLanguages = (repos) => {
  const languageCounts = repos.reduce((counts, repo) => {
    if (!repo.language) return counts
    counts[repo.language] = (counts[repo.language] || 0) + 1
    return counts
  }, {})
  const total = Object.values(languageCounts).reduce((sum, count) => sum + count, 0)

  if (!total) return []

  return Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / total) * 100),
      color: getLanguageColor(name),
    }))
}

const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Vue: '#41b883',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4f5d95',
    Python: '#3572a5',
    Rust: '#dea584',
    CSharp: '#178600',
    'C#': '#178600',
    GDScript: '#355570',
  }

  return colors[language] || 'var(--color-primary)'
}

const createCalendarWeeks = (events = []) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(start.getDate() - 364)
  start.setDate(start.getDate() - start.getDay())
  const eventCounts = events.reduce((counts, event) => {
    if (!event.created_at) return counts

    const date = event.created_at.slice(0, 10)
    counts[date] = (counts[date] || 0) + 1
    return counts
  }, {})

  return Array.from({ length: 53 }, (_, weekIndex) => {
    const contributionDays = Array.from({ length: 7 }, (_, weekday) => {
      const date = new Date(start)
      date.setDate(start.getDate() + weekIndex * 7 + weekday)
      const dateKey = date.toISOString().slice(0, 10)

      return {
        date: dateKey,
        contributionCount: eventCounts[dateKey] || 0,
        weekday,
      }
    })

    return { contributionDays }
  })
}

const createEmptyCalendarWeeks = () => createCalendarWeeks()

const calculateStreaks = (weeks) => {
  const days = weeks
    .flatMap((week) => week.contributionDays || [])
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  let longestStreak = 0
  let runningStreak = 0

  for (const day of days) {
    if (day.contributionCount > 0) {
      runningStreak += 1
      longestStreak = Math.max(longestStreak, runningStreak)
    } else {
      runningStreak = 0
    }
  }

  let currentStreak = 0
  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (days[index].contributionCount > 0) {
      currentStreak += 1
    } else if (currentStreak > 0) {
      break
    }
  }

  return { longestStreak, currentStreak }
}

const getContributionLevel = (count) => {
  if (!count) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 10) return 3
  return 4
}

const getContributionTitle = (day) => {
  return `${formatNumber(day.contributionCount)} contributions on ${formatDate(day.date)}`
}

const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value)
}

const formatDays = (value) => {
  return `${formatNumber(value)} ${value === 1 ? 'day' : 'days'}`
}

const formatDate = (value) => {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

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

onMounted(loadGithubActivity)

onUnmounted(() => {
  controller?.abort()
})
</script>
