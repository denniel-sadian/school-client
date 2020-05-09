<template>
  <div class="cont">
    <div v-if="!doneLoading" class="loading">
      <h1 class="w3-text-white w3-center">
        <i class="fas fa-spinner w3-spin"></i>
      </h1>
    </div>
    <div v-else>
      <header class="w3-container">
        <div class="w3-content">
          <h1>{{ subject }}</h1>
          <p>Prepared by {{ teacher }}. {{ sem }}'s {{ grading }}.</p>
        </div>
      </header>
      <div class="w3-container">
        <div class="w3-content">
          <h3 class="w3-text-red">Direction:</h3>
          <h3>Choose the best answer that applies for each item.</h3>
          <ol>
            <li v-for="item in exam.items" :key="item.url">
              <ItemAnswering :item="item" />
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemAnswering from '~/components/ItemAnswering.vue'

export default {
  middleware: 'isThereExams',
  layout: 'student',
  components: { ItemAnswering },
  data() {
    return {
      exam: {},
      sem: '',
      grading: '',
      teacher: '',
      subject: '',
      doneLoading: false
    }
  },
  computed: {
    exams() {
      return this.$store.state.exams.exams
    }
  },
  async mounted() {
    this.exam = this.exams.filter(
      (e) => e.id === parseInt(this.$route.params.id)
    )[0]
    await this.$axios.get(this.exam.teacher).then(({ data }) => {
      const addressing = data.profile.gender === 'm' ? 'Mr.' : 'Ms.'
      this.teacher = `${addressing} ${data.first_name} ${data.last_name}`
    })
    await this.$axios.get(this.exam.sheets[0]).then(async ({ data }) => {
      this.sem = data.sem === '1' ? 'First Semester' : 'Second Semester'
      this.grading = data.grading
      await this.$axios
        .get(data.subject)
        .then(({ data }) => (this.subject = data.name))
    })
    this.doneLoading = true
  },
  validate(context) {
    return /^\d+$/.test(context.params.id)
  }
}
</script>

<style scoped>
.cont {
  margin-top: 60px;
}

header {
  padding: 64px 0px;
  text-align: center;
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
