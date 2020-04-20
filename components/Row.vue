<template>
  <tr>
    <td>{{ fullName }}</td>
    <td>{{ records.length }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    student: Object
  },
  computed: {
    fullName() {
      return `${this.student.last_name} ${this.student.first_name}`
    },
    records() {
      return this.$store.state.grading.currentSheet.records
    },
    allWorks() {
      return this.$store.state.grading.currentSheet.works
    },
    sheetURL() {
      return this.$store.state.grading.currentSheet.url
    },
    sheetOwner() {
      return this.$store.state.grading.currentSheet.teacher.username
    },
    username() {
      return this.$store.state.user.user.user.username
    }
  },
  watch: {
    allWorks() {
      this.createRecord()
    }
  },
  methods: {
    createRecord() {
      if (this.username !== this.sheetOwner) return
      this.allWorks.forEach((w) => {
        if (
          !this.records.filter(
            (r) => r.student === this.student.url && r.work === w.url
          )[0]
        ) {
          const payload = {
            gsheet: this.sheetURL,
            student: this.student.url,
            work: w.url,
            score: 0
          }
          this.$store.dispatch('grading/createRecord', payload)
        }
      })
    }
  },
  mounted() {
    this.createRecord()
  }
}
</script>

<style scoped>
th,
td {
  white-space: nowrap;
  border: 1px solid #9e9e9e;
}
</style>
