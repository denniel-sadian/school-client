<template>
  <div>
    <header>
      <h1>Summary of Quarterly Grades</h1>
      <p>{{ subject }} of {{ section }}</p>
    </header>
    <article>
      <div class="table-cont">
        <table>
          <tr class="w3-green">
            <th>Learners' Name</th>
            <th>
              <nuxt-link :to="`/dashboard/sheets/${sheets[0].id}`"
                >1st Quarter</nuxt-link
              >
            </th>
            <th>
              <nuxt-link :to="`/dashboard/sheets/${sheets[1].id}`"
                >2nd Quarter</nuxt-link
              >
            </th>
            <th>
              <nuxt-link :to="`/dashboard/sheets/${sheets[2].id}`"
                >3rd Quarter</nuxt-link
              >
            </th>
            <th>
              <nuxt-link :to="`/dashboard/sheets/${sheets[3].id}`"
                >4th Quarter</nuxt-link
              >
            </th>
            <th>FINAL GRADE</th>
            <th>REMARK</th>
          </tr>
          <tr class="w3-gray">
            <th>MALE</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <SummaryRow as="tr" v-for="b in boys" :record="b" :key="b.name" />
          <tr class="w3-gray">
            <th>FEMALE</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <SummaryRow as="tr" v-for="g in girls" :record="g" :key="g.name" />
        </table>
      </div>
    </article>
  </div>
</template>

<script>
import SummaryRow from '~/components/SummaryRow.vue'

export default {
  layout: 'dashboard',
  middleware: 'isSummaryEmpty',
  components: { SummaryRow },
  computed: {
    summary() {
      console.log(this.$store.state.grading.summary)
      return this.$store.state.grading.summary
    },
    sheets() {
      return this.summary.sheets
    },
    boys() {
      return this.summary.rows.filter((r) => r.gender === 'm')
    },
    girls() {
      return this.summary.rows.filter((r) => r.gender === 'f')
    },
    section() {
      return this.summary.sheets[0].section
    },
    subject() {
      return this.summary.sheets[0].subject
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

th {
  border: 1px solid black;
  white-space: nowrap;
  padding: 4px 8px;
}
</style>
