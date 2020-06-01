<template>
  <div>
    {{ summary }}
  </div>
</template>

<script>
export default {
  computed: {
    summary() {
      return this.$store.state.grading.summary
    }
  }
}
</script>

<style scoped></style>
