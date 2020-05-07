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
    <div v-if="got < 2 + this.sheets.length * 2">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div v-else>
      <article class="w3-container" v-show="isTeacher">
        <form @submit.prevent="createSheet" class="w3-content">
          <h2><i class="fas fa-plus-circle"></i> Create an Exam</h2>
          <div class="inpt">
            <label>For Grading Sheets:</label>
            <select v-model="selectedSheets" multiple :disabled="creating">
              <option v-for="s in sheets" :value="s.url" :key="s.id">
                {{ s.section_name }} / {{ s.subject_name }} /
                {{ s.sem === 1 ? 'First Sem' : 'Second Sem' }} / {{ s.grading }}
              </option>
            </select>
          </div>
          <hr />
          <button
            type="submit"
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
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      got: 0,
      selectedSheets: [],
      creating: false
    }
  },
  computed: {
    isTeacher() {
      return this.$store.state.user.user.profile.role === 'teacher'
    },
    userID() {
      return this.$store.state.user.user.user.id
    },
    sheets() {
      const sheets = this.$store.state.grading.sheets.filter(
        (s) => s.teacher.id === this.userID
      )
      return sheets
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
    }
  },
  async mounted() {
    await this.$store.dispatch('exams/retrieveExams').then(() => this.got++)
    await this.$store.dispatch('grading/retrieveSheets').then(() => this.got++)
    await this.sheets.forEach(async (s) => {
      await this.getName(s.section).then(({ data }) => {
        s.section_name = data.name
        this.got++
      })
      await this.getName(s.subject).then(({ data }) => {
        s.subject_name = data.name
        this.got++
      })
    })
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
</style>
