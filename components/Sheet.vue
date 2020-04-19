<template>
  <div class="cont">
    <h3>{{ subject }}</h3>
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
        <th>Teacher:</th>
        <td v-if="sheet.teacher.username === username">You</td>
        <td v-else>{{ sheet.teacher.first_name }} {{ sheet.teacher.last_name }}</td>
      </tr>
      <tr>
        <th>Date:</th>
        <td>{{ new Date(sheet.date).toDateString() }}</td>
      </tr>
      <tr>
        <th>Published:</th>
        <td>
          <i class="fas fa-check-circle w3-text-green" v-if="sheet.publish"></i>
          <i class="fas fa-times-circle w3-text-red" v-else></i>
        </td>
      </tr>
    </table>

    <div>
      <nuxt-link id="view-link" to="#" class="w3-button w3-green">
        <i class="fas fa-long-arrow-alt-right"></i> View
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    sheet: Object,
    username: String
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
