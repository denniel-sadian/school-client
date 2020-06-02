<template>
  <div class="page">
    <header>
      <h1>Summary of Quarterly Grades</h1>
      <p>{{ subject }} of {{ section }}</p>
    </header>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'isSummaryEmpty',
  computed: {
    summary() {
      return this.$store.state.grading.summary
    },
    section() {
      return this.summary[0].section
    },
    subject() {
      return this.summary[0].subject
    }
  }
}
</script>

<style scoped>
header {
  margin-top: 60px;
  padding: 64px 8px;
  text-align: center;
}
</style>
