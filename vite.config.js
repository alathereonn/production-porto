import { defineConfig, loadEnv } from 'vite'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import githubStats from './api/github-stats.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const githubStatsMiddleware = (server) => {
    for (const key of ['GITHUB_USERNAME', 'GITHUB_TOKEN', 'VITE_GITHUB_USERNAME']) {
      if (process.env[key] === undefined && env[key] !== undefined) process.env[key] = env[key]
    }

    server.middlewares.use('/api/github-stats', (request, response) => {
      void githubStats(request, response)
    })
  }

  return {
    plugins: [
      vue(),
      tailwindcss(),
      {
        name: 'local-github-stats',
        configureServer: githubStatsMiddleware,
        configurePreviewServer: githubStatsMiddleware,
      },
    ],
  }
})
