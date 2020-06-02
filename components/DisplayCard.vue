<template>
  <div class="card">
    <h3>{{ head }}</h3>
    <p class="w3-small">Date: {{ card.date }}</p>
    <table>
      <tr v-for="g in card.final_grades" :key="g.url">
        <th>{{ g.subject }}</th>
        <td>{{ g.score }}</td>
      </tr>
      <tr>
        <th><h5>Average</h5></th>
        <td>
          <h5>{{ average }}</h5>
        </td>
      </tr>
    </table>

    <h4>Teacher's Remarks:</h4>
    <p>{{ card.remarks }}</p>
  </div>
</template>

<script>
export default {
  props: {
    card: Object
  },
  data() {
    return {
      pushed: false
    }
  },
  computed: {
    head() {
      return `${this.card.grading} of ${
        this.card.sem === '1' ? 'first' : 'second'
      } semester`
    },
    isThereMAPEH() {
      return this.MAPEHgrades.length !== 0
    },
    MAPEHgrades() {
      return this.card.final_grades.filter((e) =>
        e.subject.toLowerCase().includes('mapeh')
      )
    },
    MAPEHaverage() {
      let sum = 0
      this.MAPEHgrades.forEach((e) => (sum += e.score))
      return (
        Math.round((sum / this.MAPEHgrades.length + Number.EPSILON) * 100) / 100
      )
    },
    average() {
      let sum = 0
      let divisor = this.card.final_grades.length
      if (this.isThereMAPEH) {
        sum += this.MAPEHaverage
        divisor -= this.MAPEHgrades.length
        divisor++
      }
      this.card.final_grades
        .filter((e) => !e.subject.toLowerCase().includes('mapeh'))
        .forEach((e) => (sum += e.score))
      const average = Math.round((sum / divisor + Number.EPSILON) * 100) / 100
      if (!this.pushed) {
        this.$store.commit('grading/PUSH_AVERAGE', average)
        this.pushed = true
      }
      return average
    }
  }
}
</script>

<style scoped>
.card {
  padding: 16px;
  margin: 64px 0px;
  border: 2px solid #9e9e9e;
  border-radius: 4px;
  background: #fff;
}

h3,
h4 {
  text-transform: capitalize;
  margin-bottom: 5px;
}

p {
  margin-top: 5px;
}

table {
  width: 100%;
}

td,
th {
  font-family: 'Nunito';
  border: 1px solid #9e9e9e;
}

th {
  text-align: left;
  padding-left: 8px;
}

td {
  text-align: center;
}
</style>
