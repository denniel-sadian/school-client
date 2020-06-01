<template>
  <div class="cont w3-card-4 w3-pale-yellow">
    <h3>{{ name }}</h3>
    <table>
      <tr>
        <th>Department:</th>
        <td>{{ department }}</td>
      </tr>
      <tr>
        <th>Section:</th>
        <td>{{ section }}</td>
      </tr>
      <tr>
        <th>Grading:</th>
        <td>{{ sheet.grading }}</td>
      </tr>
      <tr>
        <th>Semester:</th>
        <td>{{ sheet.sem }}</td>
      </tr>
      <tr>
        <th>Teacher:</th>
        <td v-if="sheet.teacher.username === username">You</td>
        <td v-else>
          {{ sheet.teacher.first_name }} {{ sheet.teacher.last_name }}
        </td>
      </tr>
      <tr>
        <th>Date:</th>
        <td>{{ new Date(sheet.date).toDateString() }}</td>
      </tr>
      <tr>
        <th>Finished:</th>
        <td>
          <i class="fas fa-check-circle w3-text-green" v-if="sheet.publish"></i>
          <i class="fas fa-times-circle w3-text-red" v-else></i>
        </td>
      </tr>
    </table>

    <div>
      <nuxt-link
        id="view-link"
        :to="'/dashboard/sheets/' + sheet.id"
        class="w3-button w3-green"
      >
        <i class="fas fa-long-arrow-alt-right"></i> View
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sheet: Object,
    username: String
  },
  computed: {
    name() {
      let grading
      const jhs = ['1st', '2nd', '3rd', '4th']
      if (jhs.includes(this.sheet.grading))
        grading = `${this.sheet.grading} Quarter`
      else grading = this.sheet.grading
      return `${this.section} _ ${this.subject} _ ${grading}`
    },
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
  margin: 64px 0px;
}

h3 {
  font-weight: 800;
  font-family: 'Roboto Slab', serif !important;
}

th {
  font-family: 'Courier New', Courier, monospace;
  text-align: left;
}

td {
  font-family: 'Nunito', Verdana;
  border-left: 1px solid #9e9e9e;
}

table {
  width: 100%;
}

th,
td {
  vertical-align: baseline;
  border-top: 1px solid #9e9e9e;
}

td {
  padding-left: 8px;
}

.cont > div:last-child {
  padding-top: 8px;
  border-top: 1px solid #9e9e9e;
  display: flex;
  justify-content: flex-end;
}

a {
  text-decoration: none;
  border-radius: 32px;
  padding: 2px 8px;
}
</style>
