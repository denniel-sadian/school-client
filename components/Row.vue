<template>
  <tr>
    <td>{{ fullName }}</td>
    <Col as="td" v-for="w in myActivities" :record="w" :key="w.id" />
    <td>{{ totalActivitiesScore }}</td>
    <td>{{ PS }}</td>
    <td>{{ WS }}</td>
  </tr>
</template>

<script>
import Col from '~/components/Col.vue'

export default {
  components: { Col },
  props: {
    student: Object,
    topTotalActScore: {
      type: Number,
      default: 0
    },
    topTotalPerfScore: {
      type: Number,
      default: 0
    }
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
    myRecords() {
      return this.records.filter((r) => r.student === this.student.url)
    },
    myActivities() {
      return this.myRecords.filter((r) => {
        const wt = this.allWorks.filter((w) => w.url === r.work)[0].work_type
        return wt === 'a' || wt === 'q'
      })
    },
    PS() {
      return (this.totalActivitiesScore * 100) / this.topTotalActScore
    },
    WS() {
      return (this.PS * 20) / 100
    },
    myPerformances() {
      return this.myRecords.filter((r) => {
        const wt = this.allWorks.filter((w) => w.url === r.work)[0].work_type
        return wt === 'p'
      })
    },
    totalActivitiesScore() {
      let total = 0
      this.myActivities.forEach((a) => (total += a.score))
      return total
    },
    totalPerformaceScore() {
      let total = 0
      this.myPerformances.forEach((p) => (total += p.score))
    },
    myExam() {
      return this.myRecords.filter((r) => {
        const wt = this.allWorks.filter((w) => w.url === r.work)[0].work_type
        return wt === 'e'
      })[0]
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
  text-align: center;
}
</style>
