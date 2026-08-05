<template>
  <section id="qualification" class="qualification-section certification-section scroll-mt-24 pt-20 md:pt-32">
    <ScrollReveal>
      <h2 class="section-title">
        Featured <span class="text-primary">Qualifications</span>
      </h2>
      <div class="section-divider section-divider--large"></div>
    </ScrollReveal>

    <ScrollReveal as="div" class="w-full flex justify-center mb-10" :delay="100">
      <h2 class="qualification-typing-heading text-3xl md:text-4xl font-bold text-center leading-tight">
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
      <h2 class="qualification-typing-heading text-3xl md:text-4xl font-bold text-center leading-tight">
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

  <section class="qualification-section qualification-category--publication">
    <ScrollReveal as="div" class="w-full flex justify-center mt-32 mb-10">
      <h2 class="qualification-typing-heading text-3xl md:text-4xl font-bold text-center leading-tight">
        <span class="text-primary">{{ typedPublication }}</span><span class="typing-cursor">|</span>
      </h2>
    </ScrollReveal>

    <div class="timeline">
      <ScrollReveal
        v-for="(publication, index) in qualificationData.publications"
        :key="'publication-' + index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
        :delay="Math.min(index * 70, 280)"
      >
        <div class="timeline-content">
          <h3>{{ publication.title }}</h3>

          <p class="heldby">
            Published by
            <a
              v-if="publication.publisherLink"
              :href="publication.publisherLink"
              target="_blank"
              rel="noopener noreferrer"
              class="timeline-link"
            >
              {{ publication.publisher }}
            </a>
            <span v-else>{{ publication.publisher }}</span>
          </p>

          <p class="description">{{ publication.description }}</p>

          <div class="date">
            <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <div v-if="publication.dates.length > 1" class="date-text">
              <p v-for="(date, dIndex) in publication.dates" :key="'pd-' + dIndex">{{ date }}</p>
            </div>
            <span v-else>{{ publication.dates[0] }}</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>

  <section class="qualification-section qualification-category--ipr">
    <ScrollReveal as="div" class="w-full flex justify-center mt-32 mb-10">
      <h2 class="qualification-typing-heading text-3xl md:text-4xl font-bold text-center leading-tight">
        <span class="text-primary">{{ typedIpr }}</span><span class="typing-cursor">|</span>
      </h2>
    </ScrollReveal>

    <div class="timeline">
      <ScrollReveal
        v-for="(ipr, index) in qualificationData.intellectualPropertyRights"
        :key="'ipr-' + index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
        :delay="Math.min(index * 70, 280)"
      >
        <div class="timeline-content">
          <h3>{{ ipr.title }}</h3>

          <p class="heldby">{{ ipr.record }}</p>
          <p class="description">{{ ipr.description }}</p>

          <div class="date">
            <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <div v-if="ipr.dates.length > 1" class="date-text">
              <p v-for="(date, dIndex) in ipr.dates" :key="'id-' + dIndex">{{ date }}</p>
            </div>
            <span v-else>{{ ipr.dates[0] }}</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>

  <section class="qualification-section qualification-category--education pb-24">
    <ScrollReveal as="div" class="w-full flex justify-center mt-32 mb-10">
      <h2 class="qualification-typing-heading text-3xl md:text-4xl font-bold text-center leading-tight">
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

    <div class="timeline timeline--separate education-school-timeline">
      <ScrollReveal
        v-for="(school, index) in qualificationData.highSchoolEducation"
        :key="'school-' + index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
        :delay="Math.min(index * 70, 280)"
      >
        <div class="timeline-content">
          <h3>{{ school.title }}</h3>

          <p class="heldby">
            At
            <a :href="school.institutionLink" target="_blank" rel="noopener noreferrer" class="timeline-link">
              {{ school.institution }}
            </a>
          </p>

          <p class="description">{{ school.description }}</p>
          <p v-if="school.grade" class="description">Grade: {{ school.grade }}</p>

          <div class="date">
            <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <div v-if="school.dates.length > 1" class="date-text">
              <p v-for="(date, dIndex) in school.dates" :key="'sd-' + dIndex">{{ date }}</p>
            </div>
            <span v-else>{{ school.dates[0] }}</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>

  <section class="qualification-section qualification-category--tech-stack">
    <ScrollReveal as="div" class="qualification-tech-marquee" :delay="100">
      <div class="qualification-tech-marquee__track">
        <div
          v-for="copyIndex in 2"
          :key="'tech-marquee-copy-' + copyIndex"
          class="qualification-tech-marquee__group"
          aria-hidden="true"
        >
          <span
            v-for="item in flattenedTechStacks"
            :key="`${copyIndex}-${item}`"
            class="qualification-tech-marquee__item"
          >
            <img
              v-if="getTechStackIcon(item).icon"
              class="qualification-tech-marquee__icon"
              :src="`https://cdn.simpleicons.org/${getTechStackIcon(item).icon}/${getTechStackIcon(item).color}`"
              alt=""
              aria-hidden="true"
            />
            <span
              v-else-if="getTechStackIcon(item).fallback"
              :class="[
                'qualification-tech-marquee__fallback-icon',
                { 'qualification-tech-marquee__fallback-icon--next': item === 'Next.js' }
              ]"
              aria-hidden="true"
            >
              {{ getTechStackIcon(item).fallback }}
            </span>
            {{ item }}
            <span class="qualification-tech-marquee__spark">*</span>
          </span>
        </div>
      </div>
    </ScrollReveal>
  </section>

  <ScrollReveal as="div" class="qualification-project-action flex justify-center pb-32 relative z-10">
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

const techStackIconMap = {
  "Next.js": { icon: "", color: "ffffff", fallback: "N" },
  "React": { icon: "react", color: "DB2777" },
  "Vue.js": { icon: "vuedotjs", color: "BE185D" },
  "Tailwind CSS": { icon: "tailwindcss", color: "DB2777" },
  "Flutter": { icon: "flutter", color: "BE185D" },
  "Tauri": { icon: "tauri", color: "DB2777" },
  "Laravel": { icon: "laravel", color: "BE185D" },
  "Rust": { icon: "rust", color: "ffffff" },
  "Python": { icon: "python", color: "DB2777" },
  "PHP": { icon: "php", color: "BE185D" },
  "Node.js": { icon: "nodedotjs", color: "DB2777" },
  "Axum": { icon: "", color: "BE185D" },
  "PostgreSQL": { icon: "postgresql", color: "DB2777" },
  "MySQL": { icon: "mysql", color: "BE185D" },
  "Supabase": { icon: "supabase", color: "DB2777" },
  "MongoDB": { icon: "mongodb", color: "BE185D" },
  "Docker": { icon: "docker", color: "DB2777" },
  "Vercel": { icon: "vercel", color: "ffffff" },
  "Nginx": { icon: "nginx", color: "BE185D" },
  "Jupyter": { icon: "jupyter", color: "DB2777" },
  "NumPy": { icon: "numpy", color: "BE185D" },
  "Pandas": { icon: "pandas", color: "DB2777" },
  "Matplotlib": { icon: "", color: "BE185D", fallback: "Mpl" },
  "Plotly": { icon: "plotly", color: "DB2777" },
  "TensorFlow": { icon: "tensorflow", color: "BE185D" },
  "Figma": { icon: "figma", color: "DB2777" },
  "Photoshop": { icon: "", color: "BE185D", fallback: "Ps" },
  "Aseprite": { icon: "aseprite", color: "DB2777" },
  "Blender": { icon: "blender", color: "BE185D" },
  "Canva": { icon: "", color: "DB2777", fallback: "Ca" },
  "Unity": { icon: "unity", color: "ffffff" },
  "Godot": { icon: "godotengine", color: "BE185D" },
  "GDScript": { icon: "godotengine", color: "DB2777" },
  "C#": { icon: "", color: "BE185D", fallback: "C#" },
  "Git": { icon: "git", color: "DB2777" },
  "GitHub": { icon: "github", color: "ffffff" },
  "MikroTik": { icon: "mikrotik", color: "BE185D", fallback: "MT" },
  "TCP/IP": { icon: "", color: "DB2777" },
  "Routing": { icon: "", color: "BE185D" },
}

export default {
  name: 'PortfolioQualification',
  components: { ScrollReveal },

  data() {
    return {
      qualificationData,
      certText: ["PROFESSIONAL CERTIFICATIONS"],
      teachText: ["TEACHING EXPERIENCES"],
      publicationText: ["PUBLICATION"],
      iprText: ["INTELLECTUAL PROPERTY RIGHTS"],
      eduText: ["EDUCATION"],
      typedCert: "",
      typedTeach: "",
      typedPublication: "",
      typedIpr: "",
      typedEdu: "",
      typingSpeed: 100,
      deletingSpeed: 50,
      delay: 1500,
      typingTimeouts: []
    };
  },

  computed: {
    flattenedTechStacks() {
      return this.qualificationData.techStacks.flatMap((group) => group.items);
    }
  },

  mounted() {
    this.createTyping(this.certText, "typedCert");
    this.createTyping(this.teachText, "typedTeach");
    this.createTyping(this.publicationText, "typedPublication");
    this.createTyping(this.iprText, "typedIpr");
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
    getTechStackIcon(item) {
      return techStackIconMap[item] || { icon: "", color: "BE185D" };
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
