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
        <form @submit.prevent="createExam" class="w3-content">
          <h2><i class="fas fa-plus-circle"></i> Create an Exam</h2>
          <p>
            Select the grading sheets on which the exam should be included.
          </p>
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
                class="w3-tag w3-round-xxlarge w3-text-blue w3-white w3-border w3-border-blue"
                >{{ s.sem === 1 ? 'First Sem' : 'Second Sem' }}</span
              >
              <span
                class="w3-tag w3-round-xxlarge w3-text-purple w3-white w3-border w3-border-purple"
                >{{ s.grading }}</span
              >
            </span>
            <input v-model="selectedSheets" :value="s.url" type="checkbox" />
            <span class="checkmark"></span>
          </label>
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

form {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid black;
}

.w3-button {
  width: 100%;
}

.w3-tag {
  margin-bottom: 4px;
}
</style>
