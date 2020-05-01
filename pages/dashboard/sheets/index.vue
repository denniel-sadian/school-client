<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Grading Sheets</h1>
        <p>
          Both teachers and admins can view this page, but only the teachers can
          deal with the grading sheets.
        </p>
      </div>
    </header>
    <div v-if="got < 4">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div v-else>
      <article class="w3-container" v-show="role === 'teacher'">
        <form @submit.prevent="createSheet" class="w3-content">
          <h2><i class="fas fa-plus-circle"></i> Create a Grading Sheet</h2>
          <div class="inpt">
            <label>For Department:</label>
            <select v-model="dep" :disabled="creating">
              <option v-for="d in departments" :value="d.url" :key="d.id">{{
                d.name
              }}</option>
            </select>
          </div>
          <div class="inpt">
            <label>For Section:</label>
            <select v-model="sec" :disabled="creating">
              <option v-for="s in sections" :value="s.url" :key="s.id">{{
                s.name
              }}</option>
            </select>
          </div>
          <div class="inpt">
            <label>For Grading:</label>
            <select v-model="grading" :disabled="creating">
              <option value="prelim">Perlim</option>
              <option value="midterm">Midterm</option>
              <option value="finals">Finals</option>
            </select>
          </div>
          <div class="inpt">
            <label>For Semester:</label>
            <select v-model="sem" :disabled="creating">
              <option value="1">First Semester</option>
              <option value="2">Second Semester</option>
            </select>
          </div>
          <div class="inpt">
            <label>For Subject:</label>
            <select v-model="sub" :disabled="creating">
              <option v-for="s in subjects" :value="s.url" :key="s.id">{{
                s.name
              }}</option>
            </select>
          </div>
          <hr />
          <button
            type="submit"
            :disabled="creating"
            class="w3-button w3-green w3-round"
          >
            <span v-if="creating"
              ><i class="fas fa-spinner w3-spin"></i> Creating...</span
            >
            <span v-else>Create</span>
          </button>
        </form>
      </article>
      <article class="w3-container">
        <div class="w3-content">
          <div v-if="totalSheets === 0" class="w3-center">
            <h4>There is no grading sheet yet.</h4>
          </div>
          <div v-else>
            <h2 class="w3-center">List of Grading sheets</h2>
            <div class="filter w3-border w3-border-gray w3-light-gray w3-round">
              <h3><i class="fas fa-filter"></i> Filter The List</h3>
              <div class="inpt">
                <label>Department:</label>
                <select v-model="depFilter">
                  <option
                    v-for="d in departments"
                    :value="d.url"
                    :key="d.url"
                    >{{ d.name }}</option
                  >
                </select>
              </div>
              <div class="inpt">
                <label>Section:</label>
                <select v-model="secFilter">
                  <option v-for="s in sections" :value="s.url" :key="s.url">{{
                    s.name
                  }}</option>
                </select>
              </div>
              <div class="inpt">
                <label>Subject:</label>
                <select v-model="subFilter">
                  <option v-for="s in subjects" :value="s.url" :key="s.url">{{
                    s.name
                  }}</option>
                </select>
              </div>
              <div class="inpt">
                <label>Semester:</label>
                <select v-model="semFilter" :disabled="creating">
                  <option value="1">First Sem</option>
                  <option value="2">Second Sem</option>
                </select>
              </div>
              <div class="inpt">
                <label>Grading:</label>
                <select v-model="gradingFilter" :disabled="creating">
                  <option value="prelim">Perlim</option>
                  <option value="midterm">Midterm</option>
                  <option value="finals">Finals</option>
                </select>
              </div>
              <div class="inpt">
                <label>Owner:</label>
                <select type="text" v-model="ownerFilter">
                  <option value="me">Me</option>
                  <option value="any">Anyone</option>
                </select>
              </div>
            </div>
            <p class="w3-small w3-text-green w3-center">
              {{ sheets.length }} found with this filter.
            </p>
            <Sheet
              v-for="s in sheets"
              :sheet="s"
              :username="username"
              :key="s.id"
            />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Sheet from '~/components/Sheet.vue'

export default {
  layout: 'dashboard',
  components: { Sheet },
  data() {
    return {
      got: 0,
      creating: false,
      error: false,
      dep: '',
      sec: '',
      grading: '',
      sem: '',
      sub: '',
      depFilter: '',
      secFilter: '',
      subFilter: '',
      semFilter: '',
      gradingFilter: '',
      ownerFilter: 'me'
    }
  },
  computed: {
    departments() {
      return this.$store.state.information.departments
    },
    sections() {
      const sections = this.$store.state.information.sections
      if (this.dep === '') return sections
      return sections.filter((e) => e.department === this.dep)
    },
    subjects() {
      return this.$store.state.information.subjects
    },
    totalSheets() {
      return this.$store.state.grading.sheets.length
    },
    sheets() {
      return this.$store.state.grading.sheets
        .filter((s) => s.department === this.depFilter)
        .filter((s) => {
          if (this.secFilter) return s.section === this.secFilter
          return true
        })
        .filter((s) => {
          if (this.semFilter) return s.sem === this.semFilter
          return true
        })
        .filter((s) => {
          if (this.gradingFilter) return s.grading === this.gradingFilter
          return true
        })
        .filter((s) => {
          if (this.subFilter) return s.subject === this.subFilter
          return true
        })
        .filter((s) => {
          if (this.ownerFilter === 'me')
            return s.teacher.username === this.username
          return true
        })
    },
    username() {
      return this.$store.state.user.user.user.username
    },
    role() {
      return this.$store.state.user.user.profile.role
    },
    newID() {
      return this.$store.state.grading.sheets[0].id
    }
  },
  watch: {
    departments(v) {
      this.depFilter = this.departments.filter(
        (e) => e.id === this.$store.state.user.user.profile.department
      )[0].url
    }
  },
  methods: {
    async createSheet() {
      this.creating = true
      this.error = false
      const payload = {
        department: this.dep,
        section: this.sec,
        subject: this.sub,
        sem: this.sem,
        grading: this.grading
      }
      await this.$store
        .dispatch('grading/createSheet', payload)
        .then(() => {
          this.$router.push(`/dashboard/sheets/${this.newID}`)
        })
        .finally(() => {
          this.creating = false
        })
    }
  },
  async mounted() {
    await this.$store
      .dispatch('information/getDepartments')
      .then(() => this.got++)
    await this.$store.dispatch('information/getSections').then(() => this.got++)
    await this.$store.dispatch('information/getSubjects').then(() => this.got++)
    await this.$store.dispatch('grading/retrieveSheets').then(() => this.got++)
  },
  head: {
    title: 'School | Grading Sheets'
  }
}
</script>

<style scoped>
header {
  margin-top: 60px;
  padding: 64px 0px !important;
  text-align: center;
}

header h1 {
  text-transform: capitalize;
}

.w3-content {
  max-width: 600px;
}

form {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid black;
}

.w3-button {
  width: 100%;
}

article {
  margin: 20px 0px;
}

.filter {
  padding: 8px;
}
</style>
