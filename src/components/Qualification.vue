<template>
  <section id="qualification" class="qualification-section certification-section scroll-mt-24 pt-20 md:pt-32">
    <ScrollReveal>
      <h2 class="section-title">
        Featured <span class="text-primary">Qualifications</span>
      </h2>
      <div class="section-divider section-divider--large"></div>
    </ScrollReveal>

    <ScrollReveal as="div" class="w-full flex justify-center mb-10" :delay="100">
      <h2 class="text-3xl md:text-4xl font-bold text-center leading-tight">
        <span class="text-primary">{{ typedCert }}</span><span class="typing-cursor">|</span>
      </h2>
    </ScrollReveal>

    <div class="timeline">
      <ScrollReveal
        v-for="(cert, index) in qualificationData.certifications"
        :key="'cert-' + index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
        :delay="Math.min(index * 70, 280)"
      >
        <div class="timeline-content">
          <h3>{{ cert.title }}</h3>

          <p class="heldby">
            Held by
            <a :href="cert.issuerLink" target="_blank" rel="noopener noreferrer" class="timeline-link">
              {{ cert.issuer }}
            </a>

            <template v-if="cert.institution">
              , and <br>
              <a :href="cert.institutionLink" target="_blank" rel="noopener noreferrer" class="timeline-link">
                {{ cert.institution }}
              </a>
            </template>
          </p>

          <p class="description">{{ cert.description }}</p>

          <div class="date">
            <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <div v-if="cert.dates.length > 1" class="date-text">
              <p v-for="(date, dIndex) in cert.dates" :key="'d-' + dIndex">{{ date }}</p>
            </div>
            <span v-else>{{ cert.dates[0] }}</span>
          </div>

          <a
            v-if="cert.certificateLink"
            :href="cert.certificateLink"
            class="certificate-link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`View certificate document for ${cert.title}`"
          >
            View
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>

  <section class="qualification-section qualification-category--teaching">
    <ScrollReveal as="div" class="w-full flex justify-center mt-32 mb-10">
      <h2 class="text-3xl md:text-4xl font-bold text-center leading-tight">
        <span class="text-primary">{{ typedTeach }}</span><span class="typing-cursor">|</span>
      </h2>
    </ScrollReveal>

    <div class="timeline">
      <ScrollReveal
        v-for="(teach, index) in qualificationData.teaching"
        :key="'teach-' + index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
        :delay="Math.min(index * 70, 280)"
      >
        <div class="timeline-content">
          <h3>{{ teach.title }}</h3>

          <p class="heldby">
            Held by
            <a :href="teach.issuerLink" target="_blank" rel="noopener noreferrer" class="timeline-link">
              {{ teach.issuer }}
            </a>

            <template v-if="teach.institution">
              , and <br>
              <a :href="teach.institutionLink" target="_blank" rel="noopener noreferrer" class="timeline-link">
                {{ teach.institution }}
              </a>
            </template>
          </p>

          <p class="description">{{ teach.description }}</p>

          <div class="date">
            <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <div v-if="teach.dates.length > 1" class="date-text">
              <p v-for="(date, dIndex) in teach.dates" :key="'td-' + dIndex">{{ date }}</p>
            </div>
            <span v-else>{{ teach.dates[0] }}</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>

  <section class="qualification-section qualification-category--education pb-24">
    <ScrollReveal as="div" class="w-full flex justify-center mt-32 mb-10">
      <h2 class="text-3xl md:text-4xl font-bold text-center leading-tight">
        <span class="text-primary">{{ typedEdu }}</span><span class="typing-cursor">|</span>
      </h2>
    </ScrollReveal>

    <div class="timeline">
      <ScrollReveal
        v-for="(edu, index) in qualificationData.education"
        :key="'edu-' + index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
        :delay="Math.min(index * 70, 280)"
      >
        <div class="timeline-content">
          <h3>{{ edu.title }}</h3>

          <p class="heldby">
            {{ edu.level }}
            <a :href="edu.majorLink" target="_blank" rel="noopener noreferrer" class="timeline-link">
              {{ edu.major }}
            </a> Student at<br>
            <a :href="edu.institutionLink" target="_blank" rel="noopener noreferrer" class="timeline-link">
              {{ edu.institution }}
            </a>
          </p>

          <p class="description">
            GPA Semester: {{ edu.gpa }} <br>
            Relevant Subjects:
          </p>

          <ul class="course-list">
            <li v-for="(course, cIndex) in edu.courses" :key="'c-' + cIndex">
              {{ course }}
            </li>
          </ul>

          <div class="date">
            <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <div v-if="edu.dates.length > 1" class="date-text">
              <p v-for="(date, dIndex) in edu.dates" :key="'ed-' + dIndex">{{ date }}</p>
            </div>
            <span v-else>{{ edu.dates[0] }}</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>

  <ScrollReveal as="div" class="flex justify-center pb-32 relative z-10">
    <button
      @click="scrollToProject"
      class="primary-button"
    >
      See My Projects!
    </button>
  </ScrollReveal>
</template>

<script>
import qualificationData from '../data/qualification.json'
import ScrollReveal from './ScrollReveal.vue'

export default {
  name: 'PortfolioQualification',
  components: { ScrollReveal },

  data() {
    return {
      qualificationData,
      certText: ["PROFESSIONAL CERTIFICATION"],
      teachText: ["TEACHING EXPERIENCES"],
      eduText: ["EDUCATION"],
      typedCert: "",
      typedTeach: "",
      typedEdu: "",
      typingSpeed: 100,
      deletingSpeed: 50,
      delay: 1500,
      typingTimeouts: []
    };
  },

  mounted() {
    this.createTyping(this.certText, "typedCert");
    this.createTyping(this.teachText, "typedTeach");
    this.createTyping(this.eduText, "typedEdu");
  },

  beforeUnmount() {
    this.typingTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  },

  methods: {
    scheduleTypingTimeout(callback, delay) {
      const timeoutId = setTimeout(callback, delay);
      this.typingTimeouts.push(timeoutId);
      return timeoutId;
    },

    createTyping(textArray, target) {
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const loop = () => {
        const current = textArray[textIndex];

        if (!isDeleting) {
          this[target] = current.substring(0, charIndex++);
          if (charIndex > current.length) {
            this.scheduleTypingTimeout(() => {
              isDeleting = true;
            }, this.delay);
          }
        } else {
          this[target] = current.substring(0, charIndex--);
          if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
          }
        }

        this.scheduleTypingTimeout(loop, isDeleting ? this.deletingSpeed : this.typingSpeed);
      };

      loop();
    },
    scrollToProject() {
      const section = document.getElementById('project');
      if (section) {
        const start = window.pageYOffset;
        const end = section.getBoundingClientRect().top + start - 100;

        window.scrollTo({
          top: end,
          behavior: 'smooth'
        });
      }
    }
  }
};
</script>
