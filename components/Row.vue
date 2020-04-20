<template>
  <tr>
    <td class="w3-animate-zoom">{{ fullName }}</td>
    <Col as="td" v-for="w in myActivities" :record="w" :key="w.id" />
    <td class="w3-animate-zoom">{{ totalActivitiesScore }}</td>
    <td class="w3-animate-zoom">{{ PS1 }}</td>
    <td class="w3-animate-zoom">{{ WS1 }}</td>
    <Col as="td" v-for="p in myPerformances" :record="p" :key="p.id" />
    <td class="w3-animate-zoom">{{ totalPerformaceScore }}</td>
    <td class="w3-animate-zoom">{{ PS2 }}</td>
    <td class="w3-animate-zoom">{{ WS2 }}</td>
    <Col as="td" v-if="myExam" :record="myExam" />
    <td class="w3-animate-zoom">{{ PS3 }}</td>
    <td class="w3-animate-zoom">{{ WS3 }}</td>
    <td>{{ initialGrade }}</td>
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
    PS1() {
      return this.round(
        (this.totalActivitiesScore * 100) / this.topTotalActScore
      )
    },
    WS1() {
      return this.round((this.PS1 * 20) / 100)
    },
    PS2() {
      return this.round(
        (this.totalPerformaceScore * 100) / this.topTotalPerfScore
      )
    },
    WS2() {
      return this.round((this.PS2 * 60) / 100)
    },
    PS3() {
      const exam = this.allWorks.filter((w) => w.work_type === 'e')[0]
      if (!exam || !this.myExam) return 0
      return this.round((this.myExam.score * 100) / exam.highest_score)
    },
    WS3() {
      return this.round((this.PS3 * 20) / 100)
    },
    initialGrade() {
      return this.WS1 + this.WS2 + this.WS3
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
      return total
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
    round(x) {
      return Math.round((x + Number.EPSILON) * 100) / 100
    },
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
