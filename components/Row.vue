<template>
  <tr @mouseenter="hovered = true" @mouseleave="hovered = false">
    <td
      :title="fullName"
      class="w3-animate-zoom"
      :class="{ 'w3-yellow': hovered }"
    >
      <span v-show="qgColor">
        <i
          class="fas fa-check w3-text-green"
          v-if="qgColor !== 'w3-pale-red'"
        ></i>
        <i class="fas fa-times w3-text-red" v-else></i>
      </span>
      <span>{{ fullName }}</span>
    </td>
    <Col
      class="w3-border w3-border-orange"
      :class="{ 'w3-yellow': hovered }"
      :title="fullName"
      as="td"
      v-for="w in myActivities"
      :record="w"
      :key="w.id"
    />
    <td
      :class="{
        'w3-yellow': hovered,
        'w3-pale-blue': totalActivitiesScore > 0
      }"
      :title="fullName"
      class="w3-animate-zoom w3-border w3-border-orange"
    >
      {{ totalActivitiesScore }}
    </td>
    <td
      :class="{ 'w3-yellow': hovered, 'w3-pale-blue': PS1 > 0 }"
      :title="fullName"
      class="w3-animate-zoom w3-border w3-border-orange"
    >
      {{ PS1 }}
    </td>
    <td
      :class="{ 'w3-yellow': hovered, 'w3-pale-blue': WS1 > 0 }"
      :title="fullName"
      class="w3-animate-zoom w3-border w3-border-orange"
    >
      {{ WS1 }}
    </td>
    <Col
      class="w3-border w3-border-green"
      :class="{ 'w3-yellow': hovered }"
      :title="fullName"
      as="td"
      v-for="p in myPerformances"
      :record="p"
      :key="p.id"
    />
    <td
      :class="{
        'w3-yellow': hovered,
        'w3-pale-blue': totalPerformaceScore > 0
      }"
      :title="fullName"
      class="w3-animate-zoom w3-border w3-border-green"
    >
      {{ totalPerformaceScore }}
    </td>
    <td
      :class="{ 'w3-yellow': hovered, 'w3-pale-blue': PS2 > 0 }"
      :title="fullName"
      class="w3-animate-zoom w3-border w3-border-green"
    >
      {{ PS2 }}
    </td>
    <td
      :class="{ 'w3-yellow': hovered, 'w3-pale-blue': WS2 > 0 }"
      :title="fullName"
      class="w3-animate-zoom w3-border w3-border-green"
    >
      {{ WS2 }}
    </td>
    <Col
      class="w3-border w3-border-purple"
      :class="{ 'w3-yellow': hovered }"
      :title="fullName"
      as="td"
      v-if="myExam"
      :record="myExam"
      :isExam="true"
    />
    <td
      :class="{ 'w3-yellow': hovered, 'w3-pale-blue': PS3 > 0 }"
      :title="fullName"
      class="w3-animate-zoom w3-border w3-border-purple"
    >
      {{ PS3 }}
    </td>
    <td
      :class="{ 'w3-yellow': hovered, 'w3-pale-blue': WS3 > 0 }"
      :title="fullName"
      class="w3-animate-zoom w3-border w3-border-purple"
    >
      {{ WS3 }}
    </td>
    <td
      :class="{ 'w3-yellow': hovered, 'w3-pale-blue': initialGrade > 0 }"
      :title="fullName"
    >
      {{ initialGrade }}
    </td>
    <td :title="fullName" :class="{ 'w3-yellow': hovered, [qgColor]: true }">
      {{ quarterlyGrade }}
    </td>
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
    },
    shouldSubmit: {
      type: Boolean
    }
  },
  data() {
    return {
      hovered: false
    }
  },
  watch: {
    shouldSubmit(v) {
      if (v)
        this.$store.commit('grading/PUSH_GRADE', {
          student: this.student.id,
          score: this.quarterlyGrade
        })
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
      if (!exam || !this.myExam) return
      return this.round((this.myExam.score * 100) / exam.highest_score)
    },
    WS3() {
      return this.round((this.PS3 * 20) / 100)
    },
    initialGrade() {
      return this.round(this.WS1 + this.WS2 + this.WS3)
    },
    quarterlyGrade() {
      const ig = this.initialGrade
      if (ig === 100) return 100
      else if (ig >= 98.4 && ig <= 99.99) return 99
      else if (ig >= 96.8 && ig <= 98.39) return 98
      else if (ig >= 95.2 && ig <= 96.79) return 97
      else if (ig >= 93.6 && ig <= 95.19) return 96
      else if (ig >= 92.0 && ig <= 93.59) return 95
      else if (ig >= 90.4 && ig <= 91.99) return 94
      else if (ig >= 88.8 && ig <= 90.39) return 93
      else if (ig >= 87.2 && ig <= 88.79) return 92
      else if (ig >= 85.6 && ig <= 87.19) return 91
      else if (ig >= 84.0 && ig <= 85.59) return 90
      else if (ig >= 82.4 && ig <= 83.99) return 89
      else if (ig >= 80.8 && ig <= 82.39) return 88
      else if (ig >= 79.2 && ig <= 80.79) return 87
      else if (ig >= 77.6 && ig <= 79.19) return 86
      else if (ig >= 76.0 && ig <= 77.59) return 85
      else if (ig >= 74.4 && ig <= 75.99) return 84
      else if (ig >= 72.8 && ig <= 74.39) return 83
      else if (ig >= 71.2 && ig <= 72.79) return 82
      else if (ig >= 69.6 && ig <= 71.19) return 81
      else if (ig >= 68.0 && ig <= 69.59) return 80
      else if (ig >= 66.4 && ig <= 67.99) return 79
      else if (ig >= 64.8 && ig <= 66.39) return 78
      else if (ig >= 63.2 && ig <= 64.79) return 77
      else if (ig >= 61.6 && ig <= 63.19) return 76
      else if (ig >= 60.0 && ig <= 61.59) return 75
      else if (ig >= 56.0 && ig <= 59.99) return 74
      else if (ig >= 52.0 && ig <= 55.99) return 73
      else if (ig >= 48.0 && ig <= 51.99) return 72
      else if (ig >= 44.0 && ig <= 47.99) return 71
      else if (ig >= 40.0 && ig <= 43.99) return 70
      else if (ig >= 36.0 && ig <= 39.99) return 69
      else if (ig >= 32.0 && ig <= 35.99) return 68
      else if (ig >= 28.0 && ig <= 31.99) return 67
      else if (ig >= 24.0 && ig <= 27.99) return 66
      else if (ig >= 20.0 && ig <= 23.99) return 65
      else if (ig >= 16.0 && ig <= 19.99) return 64
      else if (ig >= 12.0 && ig <= 15.99) return 63
      else if (ig >= 8.0 && ig <= 11.99) return 62
      else if (ig >= 4.0 && ig <= 7.99) return 61
      else if (ig >= 0 && ig <= 3.99) return 60
    },
    qgColor() {
      if (this.quarterlyGrade >= 60 && this.quarterlyGrade <= 74)
        return 'w3-pale-red'
      else if (this.quarterlyGrade >= 75 && this.quarterlyGrade <= 89)
        return 'w3-pale-yellow'
      else if (this.quarterlyGrade >= 90 && this.quarterlyGrade <= 100)
        return 'w3-light-green'
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
  methods: {
    round(x) {
      return Math.round((x + Number.EPSILON) * 100) / 100
    }
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

tr > td:first-child {
  text-align: left;
}

.w3-yellow {
  background: #ffeb3b !important;
  transition: 0.3s;
}
</style>
