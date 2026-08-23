<template>
  <section class="github-activity-section" aria-labelledby="github-activity-title">
    <ScrollReveal
      as="div"
      class="github-activity-intro"
      :delay="120"
      :distance="24"
    >
      <p id="github-activity-title" class="github-activity-intro-text">
        My coding activity, projects, and contributions throughout the year.
      </p>

      <a
        class="github-activity-profile-link"
        :href="profileUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .5A12 12 0 0 0 8.21 23.9c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.45 11.45 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"/>
        </svg>
        View GitHub
        <span aria-hidden="true">↗</span>
      </a>
    </ScrollReveal>

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
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ScrollReveal from './ScrollReveal.vue'

defineOptions({
  name: 'GitHubActivity',
})

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

const profileUrl = computed(() => activity.value?.profileUrl || emptyActivity.profileUrl)
const topLanguages = computed(() => activity.value?.topLanguages || [])
const hasExactCalendar = computed(() => Boolean(activity.value?.weeks?.length))
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

const displayCalendarWeeks = computed(() => {
  if (activity.value?.weeks?.length) return activity.value.weeks

  return createEmptyCalendarWeeks()
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

onMounted(loadGithubActivity)

onUnmounted(() => {
  controller?.abort()
})
</script>
