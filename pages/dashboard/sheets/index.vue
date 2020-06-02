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
    <div v-if="!doneLoading">
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
              <option v-for="d in departments" :value="d.name" :key="d.name">{{
                d.name
              }}</option>
            </select>
          </div>
          <div class="inpt">
            <label>For Section:</label>
            <select v-model="sec" :disabled="creating">
              <option v-for="s in sections" :value="s.name" :key="s.name">{{
                s.name
              }}</option>
            </select>
          </div>
          <div class="inpt">
            <label>For Subject:</label>
            <select v-model="sub" :disabled="creating">
              <template v-for="s in subjects">
                <option
                  v-if="!s.name.toLowerCase().includes('mapeh (')"
                  :value="s.name"
                  :key="s.name"
                  >{{ s.name }}</option
                >
              </template>
            </select>
          </div>
          <div v-show="showGrading" class="inpt">
            <label>For Grading:</label>
            <select v-model="grading" :disabled="creating">
              <option value="1st">First Quarter</option>
              <option value="2nd">Second Quarter</option>
              <option value="3rd">Third Quarter</option>
              <option value="4th">Fourth Quarter</option>
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
            <label>Written Work Percent:</label>
            <input
              type="number"
              min="0"
              max="100"
              v-model="wo"
              :disabled="creating"
            />
          </div>
          <div class="inpt">
            <label>Performance Task Percent:</label>
            <input
              type="number"
              min="0"
              max="100"
              v-model="pt"
              :disabled="creating"
            />
          </div>
          <div class="inpt">
            <label>Quarterly Assessment Percent:</label>
            <input
              type="number"
              min="0"
              max="100"
              v-model="qa"
              :disabled="creating"
            />
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
          <div v-if="totalGroups === 0" class="w3-center">
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
                    :value="d.name"
                    :key="d.name"
                    >{{ d.name }}</option
                  >
                </select>
              </div>
              <div class="inpt">
                <label>Section:</label>
                <select v-model="secFilter">
                  <option v-for="s in sections" :value="s.name" :key="s.name">{{
                    s.name
                  }}</option>
                </select>
              </div>
              <div class="inpt">
                <label>Subject:</label>
                <select v-model="subFilter">
                  <template v-for="s in subjects">
                    <option
                      v-if="!s.name.toLowerCase().includes('mapeh (')"
                      :value="s.name"
                      :key="s.name"
                      >{{ s.name }}</option
                    >
                  </template>
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
                  <option value="1st">First Quarter</option>
                  <option value="2nd">Second Quarter</option>
                  <option value="3rd">Third Quarter</option>
                  <option value="4th">Fourth Quarter</option>
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
              {{ groups.length }} found with this filter.
            </p>
            <Sheet
              v-for="s in groups"
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
      wo: 30,
      pt: 50,
      qa: 20,
      creating: false,
      error: false,
      doneLoading: false,
      dep: '',
      sec: '',
      grading: '1st',
      sem: '1',
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
    showGrading() {
      return this.sub.toLowerCase() === 'mapeh'
    },
    departments() {
      return this.$store.state.information.departments
    },
    sections() {
      return this.$store.state.information.sections
    },
    subjects() {
      return this.$store.state.information.subjects
    },
    totalGroups() {
      return this.$store.state.grading.groups.length
    },
    groups() {
      return this.$store.state.grading.groups
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
      return this.$store.state.grading.currentSheet.id
    }
  },
  watch: {
    departments(v) {
      this.depFilter = this.departments.filter(
        (e) => e.id === this.$store.state.user.user.profile.department
      )[0].name
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
        grading: this.grading,
        wo_percent: this.wo,
        pt_percent: this.pt,
        qa_percent: this.qa
      }
      await this.$store
        .dispatch('grading/createGroup', payload)
        .then(() => {
          this.$router.push(`/dashboard/sheets/${this.newID}`)
        })
        .finally(() => {
          this.creating = false
        })
    }
  },
  async mounted() {
    await this.$store.dispatch('information/getDepartments')
    await this.$store.dispatch('information/getSections')
    await this.$store.dispatch('information/getSubjects')
    await this.$store.dispatch('grading/retrieveGroups')
    this.doneLoading = true
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
