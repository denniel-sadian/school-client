<template>
  <div>
    {{ summary }}
  </div>
</template>

<script>
export default {
  middleware: 'isSummaryEmpty',
  computed: {
    summary() {
      return this.$store.state.grading.summary
    }
  }
}
</script>

<style scoped></style>
