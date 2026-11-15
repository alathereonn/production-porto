<template>
  <section id="contact" class="contact-section">

    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div class="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-primary/20 blur-[120px] rounded-full mix-blend-screen"></div>
      <div class="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-red-900/10 blur-[100px] rounded-full mix-blend-screen"></div>
    </div>

    <ScrollReveal as="div" class="contact-header">
      <h2 class="section-title">
        {{ contactData.header.titleStart }}<span class="text-primary">{{ contactData.header.titleHighlight }}</span>
      </h2>
      <div class="section-divider section-divider--compact"></div>
      <p v-if="contactData.header.subtitle" class="contact-subtitle">
        {{ contactData.header.subtitle }}
      </p>
    </ScrollReveal>

    <div class="contact-layout relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

      <div class="lg:col-span-7 flex flex-col gap-6 md:gap-8">

        <ScrollReveal class="contact-form-card bg-card backdrop-blur-md border border-white/5 hover:border-primary/50 transition-all duration-500 p-6 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden group flex flex-col flex-1" :delay="100">
          <div class="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-500"></div>
          <h3 class="contact-card-heading contact-form-heading">{{ contactData.form.heading }}</h3>

          <form @submit.prevent="sendMessage" class="flex flex-col h-full gap-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="contact-field">
                <label class="contact-label flex items-center gap-2 text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Name
                </label>
                <input type="text" name="name" required placeholder="Rusdi Barbershop" class="contact-input">
              </div>

              <div class="contact-field">
                <label class="contact-label flex items-center gap-2 text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  Email
                </label>
                <input type="email" name="email" required placeholder="ngawimusical@example.com" class="contact-input">
              </div>
            </div>

            <div class="contact-field flex-1 flex flex-col">
              <label class="contact-label flex items-center gap-2 text-sm text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Message
              </label>
              <textarea name="message" required rows="6" placeholder="Write me a message..." class="contact-input contact-textarea"></textarea>
            </div>

            <button ref="submitButtonRef" type="submit" :disabled="isSending" class="primary-button primary-button--full contact-submit-button">
              <svg v-if="!isSending" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-submit-icon"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              {{ isSending ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </ScrollReveal>

      </div>

    </div>

    <div class="contact-footer w-full border-t border-white/5 pt-6 pb-6 text-center bg-darkbg/90 backdrop-blur-md z-20">
      <h3 class="contact-card-heading contact-social-heading">{{ contactData.socials.heading }}</h3>
      <div class="contact-social-list">
        <a :href="'mailto:' + contactData.contactInfo.email" aria-label="Send email" title="Email" class="p-4 bg-darkbg rounded-xl text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 border border-white/5 hover:border-transparent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></a>
        <a :href="contactData.contactInfo.whatsappLink" target="_blank" rel="noopener noreferrer" aria-label="Contact on WhatsApp" title="WhatsApp" class="p-4 bg-darkbg rounded-xl text-gray-400 hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-105 border border-white/5 hover:border-transparent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.44 0 .06 5.38.06 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.62a11.94 11.94 0 0 0 5.87 1.5h.01c6.61 0 11.99-5.38 11.99-11.99 0-3.2-1.25-6.21-3.52-8.41ZM12.05 21.85c-1.86 0-3.68-.5-5.27-1.44l-.38-.22-3.66.96.98-3.57-.25-.37a9.94 9.94 0 0 1-1.52-5.22c0-5.55 4.52-10.07 10.08-10.07 2.69 0 5.22 1.05 7.12 2.95a10 10 0 0 1 2.95 7.13c0 5.55-4.52 10.07-10.05 10.07Zm5.52-7.53c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.38-.27.3-1.05 1.02-1.05 2.48s1.08 2.87 1.23 3.07c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg></a>
        <a :href="contactData.socials.github" target="_blank" class="p-4 bg-darkbg rounded-xl text-gray-400 hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_15px_rgba(190,24,93,0.4)] border border-white/5 hover:border-transparent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
        <a :href="contactData.socials.linkedin" target="_blank" class="p-4 bg-darkbg rounded-xl text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_15px_rgba(10,102,194,0.4)] border border-white/5 hover:border-transparent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
        <a :href="contactData.socials.instagram" target="_blank" class="p-4 bg-darkbg rounded-xl text-gray-400 hover:bg-[#E1306C] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_15px_rgba(225,48,108,0.4)] border border-white/5 hover:border-transparent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
        <a :href="contactData.socials.facebook" target="_blank" class="p-4 bg-darkbg rounded-xl text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_15px_rgba(24,119,242,0.4)] border border-white/5 hover:border-transparent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
        <a :href="contactData.socials.steam" target="_blank" class="p-4 bg-darkbg rounded-xl text-gray-400 hover:bg-[#2a475e] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_15px_rgba(102,192,244,0.4)] border border-white/5 hover:border-transparent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 5a4.5 4.5 0 1 1 -.653 8.953l-4.347 3.009l0 .038a3 3 0 0 1 -2.824 2.995l-.176 .005a3 3 0 0 1 -2.94 -2.402l-2.56 -1.098v-3.5l3.51 1.755a2.989 2.989 0 0 1 2.834 -.635l2.727 -3.546a4.5 4.5 0 0 1 4.429 -5.572z"></path><circle cx="16.5" cy="9.5" r="1"></circle></svg></a>
        <a :href="contactData.socials.discord" target="_blank" class="p-4 bg-darkbg rounded-xl text-gray-400 hover:bg-[#5865F2] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_15px_rgba(88,101,242,0.4)] border border-white/5 hover:border-transparent"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
        </a>
      </div>
      <p class="text-white text-sm tracking-wide">
        Designed & Built by
        <button type="button" class="contact-footer-designer" @click="scrollToHome">
          {{ contactData.footer.designer }}
        </button>
      </p>
      <p class="text-white text-xs mt-2">
        {{ contactData.footer.copyright }}
      </p>
    </div>

  </section>

  <FeedbackModal
    :is-open="isFeedbackModalOpen"
    :title="feedbackModalTitle"
    :message="feedbackModalMessage"
    :variant="feedbackModalVariant"
    @close="closeFeedbackModal"
  />
</template>

<script setup>
import { nextTick, ref } from 'vue'
import FeedbackModal from './FeedbackModal.vue'
import ScrollReveal from './ScrollReveal.vue'
import contactData from '../data/contact.json'

defineOptions({
  name: 'PortfolioContact',
})

const isSending = ref(false)
const isFeedbackModalOpen = ref(false)
const feedbackModalTitle = ref('')
const feedbackModalMessage = ref('')
const feedbackModalVariant = ref('success')
const submitButtonRef = ref(null)

const openFeedbackModal = ({ title, message, variant }) => {
  feedbackModalTitle.value = title
  feedbackModalMessage.value = message
  feedbackModalVariant.value = variant
  isFeedbackModalOpen.value = true
}

const closeFeedbackModal = async () => {
  isFeedbackModalOpen.value = false
  await nextTick()
  submitButtonRef.value?.focus()
}

const getNavbarOffset = () => {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
  const numericValue = Number.parseFloat(value)
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

  return value.trim().endsWith('rem') ? numericValue * rootFontSize : numericValue
}

const scrollToHome = () => {
  const target = document.getElementById('home')
  if (!target) return

  const start = window.pageYOffset
  const end = target.getBoundingClientRect().top + start - getNavbarOffset()

  window.scrollTo({
    top: end,
    behavior: 'smooth',
  })
}

const sendMessage = async (e) => {
  const FORMSPREE_URL = "https://formspree.io/f/xlgydpev"

  isSending.value = true;
  const form = e.target;
  const data = new FormData(form);

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      openFeedbackModal({
        title: 'Message Sent!',
        message: 'Thank you for reaching out. I will get back to you as soon as possible.',
        variant: 'success',
      })
      form.reset();
    } else {
      openFeedbackModal({
        title: 'Message Not Sent',
        message: 'Something went wrong. Please try again later or contact me through WhatsApp.',
        variant: 'error',
      })
    }
  } catch {
    openFeedbackModal({
      title: 'Message Not Sent',
      message: 'Something went wrong. Please try again later or contact me through WhatsApp.',
      variant: 'error',
    })
  } finally {
    isSending.value = false;
  }
}

</script>
