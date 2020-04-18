<template>
  <div class="cont">
    <h3>{{ subject }}</h3>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    sheet: Object,
    role: String
  },
  computed: {
    department() {
      return this.$store.state.information.departments.filter(
        (e) => e.url === this.sheet.department
      )[0].name
    },
    section() {
      return this.$store.state.information.sections.filter(
        (e) => e.url === this.sheet.section
      )[0].name
    },
    subject() {
      return this.$store.state.information.subjects.filter(
        (e) => e.url === this.sheet.subject
      )[0].name
    }
  }
}
</script>

<style scoped>
.cont {
  border: 2px solid #9e9e9e;
  border-radius: 4px;
  padding: 8px;
  margin: 16px 0px;
}

h3 {
  font-weight: 800;
  color: #4caf50;
}
</style>
