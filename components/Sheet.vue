<template>
  <div class="cont w3-card-4 w3-pale-yellow">
    <h3>{{ name }}</h3>
    <table>
      <tr v-for="s in sheet.grading_sheets" :key="s.id">
        <th>
          <nuxt-link
            id="view-link"
            :to="'/dashboard/sheets/' + s.id"
            class="w3-text-blue"
          >
            <i class="fas fa-long-arrow-alt-right"></i>
            <span v-show="isMAPEH">{{ s.subject }}</span>
            {{ s.grading }} Quarter
          </nuxt-link>
        </th>
        <td>
          <span class="w3-text-green" v-if="s.publish">Done</span>
          <span class="w3-text-orange" v-else>On Going</span>
        </td>
      </tr>
    </table>

    <p v-if="sheet.teacher.username === username">Created by you.</p>
    <p v-else>Created by teacher {{ sheet.teacher.username }}</p>
  </div>
</template>

<script>
export default {
  props: {
    sheet: Object,
    username: String
  },
  computed: {
    isMAPEH() {
      return this.sheet.subject.toLowerCase() === 'mapeh'
    },
    name() {
      if (this.isMAPEH)
        return `${this.sheet.section} _ ${this.sheet.subject} _ ${this.sheet.grading}`
      return `${this.sheet.section} _ ${this.sheet.subject}`
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
  text-transform: capitalize;
}

th {
  font-family: 'Courier New', Courier, monospace;
  text-align: left;
}

td {
  font-family: 'Nunito', Verdana;
  text-align: center;
}

table {
  width: 100%;
  border: 1px solid #9e9e9e;
}

th {
  width: 100%;
}

th,
td {
  vertical-align: baseline;
  border: 1px solid #9e9e9e;
  white-space: nowrap;
  padding: 8px;
}
</style>
