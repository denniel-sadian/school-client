<template>
  <div class="cont">
    <div v-if="!doneLoading" class="loading">
      <div v-if="!doneChecking">
        <h1 class="w3-center">
          <i class="fas fa-spinner w3-spin"></i>
        </h1>
      </div>
      <div v-else class="w3-center w3-animate-zoom">
        <h1>Score: {{ results.score }}/{{ results.out_of }}</h1>
        <p>
          Please take note that once you've taken an exam, you'll never be able
          to take it again. Your session to this exam has been recorded already.
        </p>
        <nuxt-link to="/student/exams" class="w3-button w3-green w3-round"
          >Okay</nuxt-link
        >
      </div>
    </div>
    <div v-else>
      <header class="w3-container">
        <div class="w3-content">
          <h1>{{ subject }}</h1>
          <p>Prepared by {{ teacher }}. {{ grading }} quarter examination.</p>
        </div>
      </header>
      <div class="w3-container w3-padding">
        <div class="w3-content">
          <h3 class="w3-text-red">Direction:</h3>
          <h3>Choose the best answer that applies for each item.</h3>
          <ol>
            <li v-for="item in exam.items" :key="item.url">
              <ItemAnswering :item="item" />
            </li>
          </ol>
          <div class="w3-center">
            <p v-if="!complete">
              Please complete answering the exam before sending your answers.
            </p>
            <div v-else class="w3-margin-bottom">
              <p>
                You have completed answering the exam. Are you sure, you want to
                submit your answers already? Once you submit, you will never be
                able to answer this exam ever again, of course.
              </p>
              <button @click="submit" class="w3-button w3-green w3-round">
                Yes, Submit My Answers
              </button>
            </div>
          </div>
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
      results: {},
      grading: '',
      teacher: '',
      subject: '',
      doneLoading: false,
      doneChecking: false
    }
  },
  computed: {
    exams() {
      return this.$store.state.exams.exams
    },
    complete() {
      return (
        this.exam.items.length ===
        this.$store.state.exams.toSubmit.answers.length
      )
    },
    toSubmit() {
      return this.$store.state.exams.toSubmit
    }
  },
  methods: {
    async submit() {
      if (!this.complete) return
      this.doneLoading = false
      await this.$axios
        .post('exam/check/', this.toSubmit)
        .then(({ data }) => (this.results = data))
        .finally(() => (this.doneChecking = true))
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
      this.grading = data.grading
      await this.$axios
        .get(data.subject)
        .then(({ data }) => (this.subject = data.name))
    })
    this.$store.commit('exams/SET_EXAM_ID', this.exam.id)
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
  padding: 64px 16px !important;
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
  text-align: center;
  color: white;
  padding: 16px;
}
.loading h1 {
  font-size: 90px;
  font-family: 'Nunito';
}

button {
  width: 100%;
}
</style>
