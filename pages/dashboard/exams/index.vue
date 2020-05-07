<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>Exams</h1>
        <p>
          Both teachers and admins can view this page, but only the teachers can
          deal with the exams.
        </p>
        <p>{{ teacherUrl }}</p>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      got: 0
    }
  },
  computed: {
    isTeacher() {
      return this.$store.state.user.user.profile.role === 'teacher'
    }
  },
  mounted() {}
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
