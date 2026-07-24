<template>
  <main class="not-found-page">
    <div class="not-found-orbit" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <section class="not-found-content" aria-labelledby="not-found-title">
      <img
        class="not-found-logo"
        src="/alathereonn-logo-transparent.png"
        alt=""
        aria-hidden="true"
      />

      <p class="not-found-kicker">Route Not Found</p>
      <h1 id="not-found-title" class="not-found-title">
        <span>404</span>
        Lost in the galaxy
      </h1>
      <p class="not-found-description">
        Hey, what you really lookin for? Head back home or return to your previous stop ^^.
      </p>

      <div class="not-found-actions">
        <button class="not-found-button not-found-button--primary" type="button" @click="goHome">
          Back to Home
        </button>
        <button class="not-found-button not-found-button--secondary" type="button" @click="goBack">
          Previous Page
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'NotFoundView',
})

const router = useRouter()

const goHome = () => {
  router.push({ name: 'home' })
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }

  goHome()
}
</script>
