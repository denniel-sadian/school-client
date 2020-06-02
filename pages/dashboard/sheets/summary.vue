<template>
  <div>
    <header>
      <h1>Summary of Quarterly Grades</h1>
      <p>{{ subject }} of {{ section }}</p>
    </header>
    <article>
      <div class="table-cont">
        <table>
          <tr>
            <th>Learners' Name</th>
            <th>1st Quarter</th>
            <th>2nd Quarter</th>
            <th>3rd Quarter</th>
            <th>4th Quarter</th>
            <th>FINAL GRADE</th>
            <th>REMARK</th>
          </tr>
        </table>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'isSummaryEmpty',
  computed: {
    summary() {
      return this.$store.state.grading.summary
    },
    section() {
      return this.summary[0].section
    },
    subject() {
      return this.summary[0].subject
    }
  }
}
</script>

<style scoped>
header {
  margin-top: 60px;
  padding: 64px 8px;
  text-align: center;
}

.table-cont {
  overflow-x: auto;
}

table {
  width: 100%;
}

th,
td {
  border: 1px solid black;
  white-space: nowrap;
  padding: 4px 8px;
}
</style>
