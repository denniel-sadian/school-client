<template>
  <div class="cont">
    <h3>{{ head }}</h3>
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
  computed: {
    head() {
      return `${this.card.grading} of ${
        this.card.sem === 1 ? 'first' : 'second'
      } semester`
    },
    average() {
      let sum = 0
      this.card.final_grades.forEach((e) => (sum += e.score))
      return (
        Math.round(
          (sum / this.card.final_grades.length + Number.EPSILON) * 100
        ) / 100
      )
    }
  }
}
</script>

<style scoped>
.cont {
  padding: 16px 0px;
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

table,
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
