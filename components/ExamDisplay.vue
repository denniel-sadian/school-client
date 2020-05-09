<template>
  <div class="cont">
    <div v-if="!doneLoading" class="w3-center">
      <h2><i class="fas fa-spinner w3-spin w3-text-gray"></i></h2>
    </div>
    <div v-else>
      <h2>{{ subject }}</h2>
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
      doneLoading: false
    }
  },
  async created() {
    await this.$axios.get(this.exam.teacher).then(({ data }) => {
      const addressing = data.profile.gender === 'm' ? 'Mr.' : 'Ms.'
      this.teacher = `${addressing} ${data.first_name} ${data.last_name}`
    })
    await this.$axios
      .get(this.exam.sheets[0])
      .then(async ({ sheet }) => await this.$axios.get(sheet.subject))
      .then(({ subject }) => (this.subject = subject.name))
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
}
</style>
