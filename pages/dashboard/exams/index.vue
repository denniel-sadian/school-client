<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>Exams</h1>
        <p>
          Both teachers and admins can view this page, but only the teachers can
          deal with the exams.
        </p>
        <p v-show="isTeacher">
          You are a teacher, so you can only see your own exams.
        </p>
      </div>
    </header>
    <div v-if="!doneLoading">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div v-else>
      <article class="w3-container" v-show="isTeacher">
        <form @submit.prevent="createExam" class="w3-content">
          <h2><i class="fas fa-plus-circle"></i> Create an Exam</h2>
          <p v-if="sheets.length > 0">
            Select the grading sheets on which the exam should be included.
          </p>
          <p v-else>You have no grading sheet that needs an exam.</p>
          <label class="container" v-for="s in sheets" :key="s.id"
            ><span class="label">
              <span
                class="w3-tag w3-round-xxlarge w3-text-green w3-white w3-border w3-border-green"
                >{{ s.section_name }}</span
              >
              <span
                class="w3-tag w3-round-xxlarge w3-text-pink w3-white w3-border w3-border-pink"
                >{{ s.subject_name }}</span
              >
              <span
                class="w3-tag w3-round-xxlarge w3-text-purple w3-white w3-border w3-border-purple"
                >{{ s.grading }} Quarter</span
              >
            </span>
            <input v-model="selectedSheets" :value="s.url" type="checkbox" />
            <span class="checkmark"></span>
          </label>
          <hr />
          <button
            type="submit"
            v-show="sheets.length > 0"
            :disabled="creating"
            class="w3-button w3-green w3-round"
          >
            <span v-if="creating"
              ><i class="fas fa-spinner w3-spin"></i> Creating...</span
            >
            <span v-else>Create</span>
          </button>
        </form>
      </article>
      <article class="w3-container">
        <div class="w3-content">
          <div v-if="exams.length === 0" class="w3-center">
            <h4>There is no exam yet.</h4>
          </div>
          <div v-else>
            <h2 class="w3-center">List of Exams</h2>
            <Exam v-for="e in exams" :exam="e" :key="e.url" />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Exam from '~/components/Exam.vue'

export default {
  layout: 'dashboard',
  components: { Exam },
  data() {
    return {
      selectedSheets: [],
      creating: false,
      doneLoading: false
    }
  },
  computed: {
    isTeacher() {
      return this.$store.state.user.user.profile.role === 'teacher'
    },
    userID() {
      return this.$store.state.user.user.user.id
    },
    userDetailLink() {
      return `https://school.pythonanywhere.com/accounts/user-detail/${this.userID}/`
    },
    sheets() {
      const sheets = this.$store.state.grading.sheets.filter(
        (s) => s.teacher.id === this.userID
      )
      return sheets.filter(
        (s) => s.works.filter((w) => w.work_type === 'e').length === 0
      )
    },
    sections() {
      return this.$store.state.information.sections
    },
    subjects() {
      return this.$store.state.information.subjects
    },
    exams() {
      const exams = this.$store.state.exams.exams
      if (this.isTeacher)
        return exams.filter((e) => e.teacher === this.userDetailLink)
      return exams
    }
  },
  methods: {
    async getName(url) {
      return await this.$axios.get(url)
    },
    async createExam() {
      this.creating = true
      const payload = {
        sheets: this.selectedSheets,
        items: []
      }
      await this.$store
        .dispatch('exams/createExam', payload)
        .then(({ data }) => this.$router.push(`/dashboard/exams/${data.id}`))
    }
  },
  async mounted() {
    await this.$store.dispatch('information/getSections')
    await this.$store.dispatch('information/getSubjects')
    await this.$store.dispatch('exams/retrieveExams')
    await this.$store.dispatch('grading/retrieveSheets')
    this.sheets.forEach((s) => {
      s.section_name = this.sections.filter(
        (sec) => sec.url === s.section
      )[0].name
      s.subject_name = this.subjects.filter(
        (sub) => sub.url === s.subject
      )[0].name
    })
    this.doneLoading = true
  }
}
</script>

<style scoped>
header {
  margin-top: 60px;
  padding: 64px 0px !important;
  text-align: center;
}

header h1 {
  text-transform: capitalize;
}

.w3-content {
  max-width: 600px;
}

form {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid black;
}

.w3-button {
  width: 100%;
}
</style>
