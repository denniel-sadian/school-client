<template>
  <div class="cont w3-card-4 w3-pale-yellow" v-if="!deleting">
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

    <div v-if="confirmDelete && sheet.teacher.username === username">
      <div>
        <h4>
          <i class="fas fa-exclamation-triangle w3-text-red"></i> Warning!
        </h4>
        <p>
          Are you sure you want to delete this grading sheet? Doing so will
          delete it permanently.
        </p>
        <button
          @click="confirmDelete = false"
          class="w3-button w3-round-xxlarge w3-green w3-small"
        >
          No
        </button>
        <button
          @click="deleteSheet()"
          class="w3-button w3-round-xxlarge w3-red w3-small"
        >
          Yes
        </button>
      </div>
    </div>
    <div v-else>
      <button
        @click="confirmDelete = true"
        class="w3-button w3-round-xxlarge w3-red w3-small"
      >
        <i class="fas fa-trash-alt"></i> Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sheet: Object,
    username: String
  },
  data() {
    return {
      confirmDelete: false,
      deleting: false
    }
  },
  computed: {
    isMAPEH() {
      return this.sheet.subject.toLowerCase() === 'mapeh'
    },
    name() {
      if (this.isMAPEH)
        return `${this.sheet.section} _ ${this.sheet.subject} _ ${this.sheet.grading} Quarter`
      return `${this.sheet.section} _ ${this.sheet.subject}`
    }
  },
  methods: {
    deleteSheet() {
      this.deleting = true
      this.$store.dispatch('grading/deleteGroup', this.sheet.id)
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

.cont > div:last-child {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.cont > div:last-child > div {
  width: 100%;
  text-align: center;
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
