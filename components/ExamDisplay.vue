<template>
  <div class="cont w3-card-4">
    <div v-if="!doneLoading">
      <h2><i class="fas fa-spinner w3-spin w3-text-gray"></i></h2>
    </div>
    <div v-else @click="$router.push(`/student/exams/${exam.id}`)">
      <h2>{{ subject }}</h2>
      <p>
        Prepared by {{ teacher }} on {{ new Date(exam.date).toDateString() }}.
        {{ sem }}'s {{ grading }}.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    exam: Object
  },
  data() {
    return {
      teacher: '',
      subject: '',
      sem: '',
      grading: '',
      doneLoading: false
    }
  },
  async created() {
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
  }
}
</script>

<style scoped>
.cont {
  border: 2px solid black;
  border-radius: 4px;
  margin: 50px 0px;
  padding: 8px;
  text-align: center;
  transition: 0.3s;
}

.cont:hover {
  background: #87ceeb;
  border-color: #2196f3;
  cursor: pointer;
}

h2 {
  font-family: 'Roboto Slab', serif !important;
}
</style>
