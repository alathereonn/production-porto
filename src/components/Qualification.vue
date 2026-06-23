<template>
  <section id="qualification" class="qualification-section scroll-mt-24 pt-20 md:pt-32">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-6">
      Featured <span class="text-primary">Qualifications</span>
    </h2>
    <div class="w-24 h-1 bg-primary mx-auto mb-16 shadow-[0_0_10px_var(--color-primary)] rounded-full"></div>

    <div class="w-full flex justify-center mb-10">
      <h2 class="text-3xl md:text-4xl font-bold text-center leading-tight">
        <span class="text-primary">{{ typedCert }}</span><span class="animate-pulse text-primary drop-shadow-[0_0_8px_var(--color-primary)]">|</span>
      </h2>
    </div>

    <div class="timeline">
      <div 
        v-for="(cert, index) in qualificationData.certifications" 
        :key="'cert-' + index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
      >
        <div class="timeline-content">
          <h3>{{ cert.title }}</h3>

          <p class="heldby">
            Held by 
            <a :href="cert.issuerLink" target="_blank" rel="noopener noreferrer" 
               class="text-primary font-medium hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
              {{ cert.issuer }}
            </a>
            
            <template v-if="cert.institution">
              , and <br>
              <a :href="cert.institutionLink" target="_blank" rel="noopener noreferrer" 
                 class="text-primary font-medium hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
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
        </div>
      </div>
    </div>
  </section>

  <section class="qualification-section">
    <div class="w-full flex justify-center mt-32 mb-10">
      <h2 class="text-3xl md:text-4xl font-bold text-center leading-tight">
        <span class="text-primary">{{ typedTeach }}</span><span class="animate-pulse text-primary drop-shadow-[0_0_8px_var(--color-primary)]">|</span>
      </h2>
    </div>

    <div class="timeline">
      <div 
        v-for="(teach, index) in qualificationData.teaching" 
        :key="'teach-' + index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
      >
        <div class="timeline-content">
          <h3>{{ teach.title }}</h3>

          <p class="heldby">
            Held by 
            <a :href="teach.issuerLink" target="_blank" rel="noopener noreferrer" 
               class="text-primary font-medium hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
              {{ teach.issuer }}
            </a>
            
            <template v-if="teach.institution">
              , and <br>
              <a :href="teach.institutionLink" target="_blank" rel="noopener noreferrer" 
                 class="text-primary font-medium hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
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
      </div>
    </div>
  </section>

  <section class="qualification-section pb-24">
    <div class="w-full flex justify-center mt-32 mb-10">
      <h2 class="text-3xl md:text-4xl font-bold text-center leading-tight">
        <span class="text-primary">{{ typedEdu }}</span><span class="animate-pulse text-primary drop-shadow-[0_0_8px_var(--color-primary)]">|</span>
      </h2>
    </div>

    <div class="timeline">
      <div 
        v-for="(edu, index) in qualificationData.education" 
        :key="'edu-' + index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
      >
        <div class="timeline-content">
          <h3>{{ edu.title }}</h3>

          <p class="heldby">
            {{ edu.level }}
            <a :href="edu.majorLink" target="_blank" rel="noopener noreferrer" 
               class="text-primary font-medium hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
              {{ edu.major }} 
            </a> Student at<br>
            <a :href="edu.institutionLink" target="_blank" rel="noopener noreferrer" 
               class="text-primary font-medium hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
              {{ edu.institution }}
            </a>
          </p>  

          <p class="description">
            GPA Semester: {{ edu.gpa }} <br>
            Relevant Courses:
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
      </div>
    </div>
  </section>

  <div class="flex justify-center pb-32 relative z-10">
    <button
      @click="scrollToProject"
      class="group relative px-10 py-4 rounded-xl
            font-semibold tracking-wide
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
      See My Projects!
    </button>
  </div>
</template>

<script>
import qualificationData from '../data/qualification.json'

export default {
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
      delay: 1500
    };
  },

  mounted() {
    this.createTyping(this.certText, "typedCert");
    this.createTyping(this.teachText, "typedTeach");
    this.createTyping(this.eduText, "typedEdu");
  },

  methods: {
    createTyping(textArray, target) {
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const loop = () => {
        const current = textArray[textIndex];

        if (!isDeleting) {
          this[target] = current.substring(0, charIndex++);
          if (charIndex > current.length) {
            setTimeout(() => isDeleting = true, this.delay);
          }
        } else {
          this[target] = current.substring(0, charIndex--);
          if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
          }
        }

        setTimeout(loop, isDeleting ? this.deletingSpeed : this.typingSpeed);
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