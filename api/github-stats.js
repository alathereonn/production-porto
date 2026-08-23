const DEFAULT_USERNAME = 'alathereonn'

const languageColors = {
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

const githubHeaders = (token) => ({
  Accept: 'application/vnd.github+json',
  'User-Agent': 'alathereonn-portfolio',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
})

const sendJson = (response, statusCode, payload) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  response.end(JSON.stringify(payload))
}

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options)
  const text = await response.text()

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}: ${text}`)
  }

  return JSON.parse(text)
}

const fetchText = async (url, options = {}) => {
  const response = await fetch(url, options)
  const text = await response.text()

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}: ${text}`)
  }

  return text
}

const getTopLanguages = (repos) => {
  const languageCounts = repos.reduce((counts, repo) => {
    const language = repo.language || repo.primaryLanguage?.name
    if (!language) return counts

    counts[language] = (counts[language] || 0) + 1
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
      color: languageColors[name] || '#BE185D',
    }))
}

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

const createCalendarWeeksFromCounts = (dateCounts = {}) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(start.getDate() - 364)
  start.setDate(start.getDate() - start.getDay())

  return Array.from({ length: 53 }, (_, weekIndex) => {
    const contributionDays = Array.from({ length: 7 }, (_, weekday) => {
      const date = new Date(start)
      date.setDate(start.getDate() + weekIndex * 7 + weekday)
      const dateKey = date.toISOString().slice(0, 10)

      return {
        date: dateKey,
        contributionCount: dateCounts[dateKey] || 0,
        weekday,
      }
    })

    return { contributionDays }
  })
}

const createCalendarWeeks = (events = []) => {
  const eventCounts = events.reduce((counts, event) => {
    if (!event.created_at) return counts

    const date = event.created_at.slice(0, 10)
    counts[date] = (counts[date] || 0) + 1
    return counts
  }, {})

  return createCalendarWeeksFromCounts(eventCounts)
}

const getDateRange = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(start.getDate() - 364)

  return {
    from: start.toISOString().slice(0, 10),
    to: today.toISOString().slice(0, 10),
  }
}

const getAttr = (tag, attrName) => {
  const match = tag.match(new RegExp(`${attrName}="([^"]*)"`, 'i'))
  return match?.[1] || ''
}

const decodeHtml = (value) => {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

const parseContributionCount = (text) => {
  const normalized = decodeHtml(text.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
  if (/^no contributions/i.test(normalized)) return 0

  const countMatch = normalized.match(/([\d,]+)\s+contributions?/i)
  if (countMatch) return Number(countMatch[1].replace(/,/g, ''))

  return null
}

const parseContributionHtml = (html) => {
  const tooltipByTarget = new Map()
  const dateCounts = {}

  for (const match of html.matchAll(/<tool-tip\b[^>]*\sfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/gi)) {
    tooltipByTarget.set(match[1], match[2])
  }

  for (const match of html.matchAll(/<(?:td|rect)\b[^>]*data-date="[^"]+"[^>]*>/gi)) {
    const tag = match[0]
    const date = getAttr(tag, 'data-date')
    if (!date) continue

    const id = getAttr(tag, 'id')
    const level = Number(getAttr(tag, 'data-level') || 0)
    const dataCount = getAttr(tag, 'data-count')
    const tooltipCount = id ? parseContributionCount(tooltipByTarget.get(id) || '') : null

    if (dataCount !== '') {
      dateCounts[date] = Number(dataCount)
    } else if (tooltipCount !== null) {
      dateCounts[date] = tooltipCount
    } else {
      dateCounts[date] = [0, 1, 4, 8, 12][level] || 0
    }
  }

  return dateCounts
}

const getCalendarPayload = (weeks, calendarMessage, calendarSource) => {
  const streaks = calculateStreaks(weeks)

  return {
    totalContributions: weeks
      .flatMap((week) => week.contributionDays || [])
      .reduce((total, day) => total + (day.contributionCount || 0), 0),
    longestStreak: streaks.longestStreak,
    currentStreak: streaks.currentStreak,
    weeks,
    calendarMessage,
    calendarSource,
  }
}

const getPublicContributionCalendar = async (username, token) => {
  try {
    const { from, to } = getDateRange()
    const html = await fetchText(`https://github.com/users/${encodeURIComponent(username)}/contributions?from=${from}&to=${to}`, {
      headers: {
        ...githubHeaders(token),
        Accept: 'text/html',
      },
    })
    const dateCounts = parseContributionHtml(html)

    if (!Object.keys(dateCounts).length) {
      throw new Error('Unable to parse GitHub public contribution graph.')
    }

    return getCalendarPayload(
      createCalendarWeeksFromCounts(dateCounts),
      'Showing public GitHub contribution graph.',
      'public_contributions',
    )
  } catch {
    return getPublicEventsCalendar(username, token)
  }
}

const getPublicEventsCalendar = async (username, token) => {
  try {
    const events = await fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`, {
      headers: githubHeaders(token),
    })

    return getCalendarPayload(
      createCalendarWeeks(events),
      'Showing public GitHub event activity. Add GITHUB_TOKEN for full contribution calendar.',
      'public_events',
    )
  } catch {
    const weeks = createCalendarWeeks()

    return getCalendarPayload(
      weeks,
      'Unable to load public GitHub event activity right now.',
      'empty',
    )
  }
}

const getGraphqlCalendar = async (username, token) => {
  if (!token) {
    return getPublicContributionCalendar(username, token)
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
                weekday
              }
            }
          }
        }
      }
    }
  `

  try {
    const payload = await fetchJson('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        ...githubHeaders(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { username } }),
    })

    if (payload.errors?.length) {
      throw new Error(payload.errors.map((error) => error.message).join(', '))
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) throw new Error('Contribution calendar is unavailable.')

    const weeks = calendar.weeks || []
    const streaks = calculateStreaks(weeks)

    return {
      totalContributions: calendar.totalContributions || 0,
      longestStreak: streaks.longestStreak,
      currentStreak: streaks.currentStreak,
      weeks,
      calendarMessage: '',
      calendarSource: 'graphql',
    }
  } catch {
    return getPublicContributionCalendar(username, token)
  }
}

export default async function handler(request, response) {
  const username = process.env.GITHUB_USERNAME || process.env.VITE_GITHUB_USERNAME || DEFAULT_USERNAME
  const token = process.env.GITHUB_TOKEN || ''

  try {
    const [user, repos] = await Promise.all([
      fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: githubHeaders(token),
      }),
      fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner&sort=updated`, {
        headers: githubHeaders(token),
      }),
    ])
    const calendar = await getGraphqlCalendar(user.login || username, token)

    sendJson(response, 200, {
      username: user.login || username,
      profileUrl: user.html_url || `https://github.com/${username}`,
      repositories: user.public_repos || repos.length,
      stars: repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0),
      followers: user.followers || 0,
      totalContributions: calendar.totalContributions,
      longestStreak: calendar.longestStreak,
      currentStreak: calendar.currentStreak,
      weeks: calendar.weeks,
      topLanguages: getTopLanguages(repos),
      calendarMessage: calendar.calendarMessage,
      calendarSource: calendar.calendarSource,
    })
  } catch {
    sendJson(response, 500, {
      message: 'Unable to load GitHub activity right now.',
    })
  }
}
