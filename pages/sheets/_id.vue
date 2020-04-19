<template>
  <div>
    <div v-if="got < 5" class="loading">
      <h1 class="w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </h1>
    </div>
    <div v-else>
      <header class="w3-center">
        <h1>
          Grading sheet of <mark>{{ section }}</mark> for
          <mark>{{ subject }}</mark>
        </h1>
        <p>{{ new Date(sheet.date).toDateString() }}</p>
        <p v-if="sheet.teacher.username === username">Prepared by: You</p>
        <p v-else>
          Prepared by: {{ sheet.teacher.first_name }}
          {{ sheet.teacher.last_name }}
        </p>
      </header>
      <div
        id="controls"
        v-show="role === 'teacher' && username === sheet.teacher.username"
      >
        <div id="editing-modal" v-show="showEditingForm">
          <div class="w3-animate-bottom w3-card-4">
            <div class="form-inputs">
              <h3><i class="fas fa-pencil-alt"></i> Edit the grading sheet</h3>
              <form @submit.prevent="updateSheet">
                <div class="inpt">
                  <label>Department:</label>
                  <select v-model="dep" :disabled="updating">
                    <option
                      v-for="d in departments"
                      :value="d.url"
                      :key="d.id"
                      >{{ d.name }}</option
                    >
                  </select>
                </div>
                <div class="inpt">
                  <label>Section:</label>
                  <select v-model="sec" :disabled="updating">
                    <option v-for="s in sections" :value="s.url" :key="s.id">{{
                      s.name
                    }}</option>
                  </select>
                </div>
                <div class="inpt">
                  <label>Subject:</label>
                  <select v-model="sub" :disabled="updating">
                    <option v-for="s in subjects" :value="s.url" :key="s.id">{{
                      s.name
                    }}</option>
                  </select>
                </div>
                <div class="inpt">
                  <label>Published:</label>
                  <select v-model="pub" :disabled="updating">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <p class="w3-text-green w3-small w3-center" v-show="updated">
                  Updated!
                </p>
                <button
                  type="submit"
                  :disabled="updating"
                  class="w3-button w3-green w3-round w3-small"
                >
                  Update
                </button>
              </form>
            </div>
            <div class="form-bottom-btns">
              <button
                class="w3-button w3-pink"
                @click="showEditingForm = false"
              >
                <i class="fas fa-times-circle"></i> Close
              </button>
            </div>
          </div>
        </div>
        <button
          @click="showEditingForm = true"
          v-show="!showEditingForm"
          class="w3-green w3-button w3-animate-zoom"
          id="edit-sheet-btn"
        >
          <i class="fas fa-pencil-alt"></i> Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      got: 0,
      showEditingForm: false,
      updating: false,
      updated: false,

      dep: '',
      sec: '',
      sub: '',
      pub: ''
    }
  },
  computed: {
    sheet() {
      return this.$store.state.grading.currentSheet
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
    },
    username() {
      return this.$store.state.user.user.user.username
    },
    role() {
      return this.$store.state.user.user.profile.role
    },
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
    }
  },
  watch: {
    showEditingForm(v) {
      if (v) {
        this.dep = this.sheet.department
        this.sec = this.sheet.section
        this.sub = this.sheet.subject
        this.pub = this.sheet.publish
      }
    }
  },
  methods: {
    updateSheet() {
      this.updating = true
      const payload = {
        url: this.sheet.url,
        department: this.dep,
        section: this.sec,
        subject: this.sub,
        publish: this.pub
      }
      this.$store
        .dispatch('grading/updateSheet', payload)
        .then(() => {
          this.updated = true
          setTimeout(() => (this.updated = false), 5000)
        })
        .finally(() => (this.updating = false))
    }
  },
  async mounted() {
    await this.$store
      .dispatch('information/getDepartments')
      .then(() => this.got++)
    await this.$store.dispatch('information/getSections').then(() => this.got++)
    await this.$store.dispatch('information/getSubjects').then(() => this.got++)
    await this.$store
      .dispatch('grading/retrieveSheets', url)
      .then(() => this.got++)
    const url = this.$store.state.grading.sheets.filter(
      (e) => e.id === parseInt(this.$route.params.id)
    )[0].url
    await this.$store
      .dispatch('grading/retrieveSheet', url)
      .then(() => this.got++)
  },
  validate(context) {
    return /^\d+$/.test(context.params.id)
  }
}
</script>

<style scoped>
.loading,
header {
  margin-top: 53px;
  padding: 64px 16px;
  text-transform: capitalize;
}

#edit-sheet-btn {
  display: absolute;
  position: fixed;
  bottom: 16px;
  right: 16px;
  border-radius: 32px;
}

#editing-modal {
  display: absolute;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  justify-content: flex-end;
}

#editing-modal > div {
  max-width: 500px;
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr auto;
  padding: 8px;
}

#editing-modal > div h3 {
  padding: 0px 0px 16px 0px;
}

.form-inputs .w3-button {
  width: 100%;
}

#editing-modal > div .form-bottom-btns {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #9e9e9e;
  padding-top: 8px;
}

#editing-modal > div .form-bottom-btns * {
  border-radius: 32px;
}
</style>
