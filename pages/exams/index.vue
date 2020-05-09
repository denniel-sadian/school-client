<template>
  <div class="cont">
    <div v-if="!doneLoading" class="loading">
      <h1 class="w3-text-white w3-center">
        <i class="fas fa-spinner w3-spin"></i>
      </h1>
    </div>
    <div v-else>
      <div v-if="exams.length !== 0">
        <header class="w3-container">
          <div class="w3-content w3-center">
            <h1>Welcome to the Examination Page!</h1>
            <p>
              Did you study well? Did you pray already? Do you think the exams
              will be easy? Whether you've studied or prayed hard, you can only
              take each examination once, so answer carefully as much as
              possible.
            </p>
          </div>
        </header>
        <div class="w3-container">
          <div class="w3-content">
            <exam-display v-for="e in exams" :exam="e" :key="e.url" />
          </div>
        </div>
      </div>
      <div v-else>
        <header class="w3-container">
          <div class="w3-content w3-center">
            <h1 class="w3-text-red">Exams are down!</h1>
            <p>
              You currently don't have any exam to take. Cheer up, and make Tik
              Tok videos instead.
            </p>
          </div>
        </header>
      </div>
    </div>
  </div>
</template>

<script>
import ExamDisplay from '~/components/ExamDisplay.vue'

export default {
  layout: 'student',
  components: { ExamDisplay },
  data() {
    return { doneLoading: false }
  },
  computed: {
    studentID() {
      return this.$store.state.user.user.user.student.id
    },
    studentLink() {
      return `https://school.pythonanywhere.com/information/students/${this.studentID}/`
    },
    sessions() {
      return this.$store.state.exams.sessions
    },
    exams() {
      return this.$store.state.exams.exams.filter(
        (e) =>
          this.sessions.filter(
            (s) => s.student === this.studentLink && s.exam === e.url
          ).length === 0
      )
    }
  },
  async mounted() {
    await this.$store.dispatch('exams/retrieveStrippedExams')
    await this.$store.dispatch('exams/retrieveSessions')
    this.$store.commit('exams/SET_STUDENT_ID', this.studentID)
    this.doneLoading = true
  }
}
</script>

<style scoped>
.cont {
  margin-top: 60px;
}

header {
  padding: 64px 0px;
}

.w3-content {
  max-width: 600px;
}

.loading {
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(128, 128, 128, 0.856);
}
.loading h1 {
  font-size: 90px;
}
</style>
