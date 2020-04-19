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
                  <select v-model="dep" :disabled="updating" required>
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
                  <select v-model="sec" :disabled="updating" required>
                    <option v-for="s in sections" :value="s.url" :key="s.id">{{
                      s.name
                    }}</option>
                  </select>
                </div>
                <div class="inpt">
                  <label>Subject:</label>
                  <select v-model="sub" :disabled="updating" required>
                    <option v-for="s in subjects" :value="s.url" :key="s.id">{{
                      s.name
                    }}</option>
                  </select>
                </div>
                <div class="inpt">
                  <label>Published:</label>
                  <select v-model="pub" :disabled="updating" required>
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
              <hr />
              <div>
                <button
                  @click="showWorkForm = true"
                  v-show="!showWorkForm"
                  class="w3-button w3-green w3-small w3-round"
                >
                  Add a Work
                </button>
                <form
                  id="adding-form"
                  @submit.prevent="createWork"
                  v-if="showWorkForm"
                >
                  <h4>Add a Work</h4>
                  <div class="inpt">
                    <label>Name:</label>
                    <input
                      required
                      type="text"
                      v-model="wName"
                      name="wName"
                      :disabled="creatingWork"
                    />
                  </div>
                  <div class="inpt">
                    <label>Type:</label>
                    <select
                      v-model="wType"
                      name="wType"
                      :disabled="creatingWork"
                      required
                    >
                      <option value="a">Activity</option>
                      <option value="q">Quiz</option>
                      <option value="e">Examination</option>
                      <option value="p">Performance</option>
                      <option value="c">Extra</option>
                    </select>
                  </div>
                  <div class="inpt">
                    <label>Highest Score:</label>
                    <input
                      required
                      type="number"
                      v-model="wScore"
                      name="wScore"
                      min="1"
                      :disabled="creatingWork"
                    />
                  </div>
                  <button
                    type="submit"
                    :disabled="creatingWork"
                    class="w3-button w3-light-green w3-small w3-round"
                  >
                    Add Work
                  </button>
                  <button
                    style="margin-top: 8px;"
                    type="submit"
                    class="w3-button w3-pink w3-small w3-round"
                    :disabled="creatingWork"
                    @click="showWorkForm = false"
                  >
                    Close
                  </button>
                </form>
                <p v-if="!sheet.works" class="w3-small w3-center">
                  There are no works yet.
                </p>
                <div v-else>
                  <Work v-for="w in sheet.works" :work="w" :key="w.id" />
                </div>
              </div>
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
import Work from '~/components/Work.vue'

export default {
  components: {
    Work
  },
  data() {
    return {
      got: 0,
      showEditingForm: false,
      showWorkForm: false,
      updating: false,
      creatingWork: false,
      updated: false,

      dep: '',
      sec: '',
      sub: '',
      pub: '',
      wName: '',
      wType: '',
      wScore: ''
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
    createWork() {
      this.creatingWork = true
      const payload = {
        gsheet: this.sheet.url,
        name: this.wName,
        highest_score: this.wScore,
        work_type: this.wType
      }
      this.$store
        .dispatch('grading/createWork', payload)
        .then(() => (this.showWorkForm = false))
        .finally(() => (this.creatingWork = false))
    },
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

#adding-form {
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
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
  padding: 8px 0px 8px 8px;
}

#editing-modal > div h3 {
  padding: 0px 0px 16px 0px;
}

.form-inputs {
  overflow-y: auto;
  padding-right: 8px;
}

.form-inputs .w3-button {
  width: 100%;
}

#editing-modal > div .form-bottom-btns {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #9e9e9e;
  padding: 8px 8px 0px 0px;
}

#editing-modal > div .form-bottom-btns * {
  border-radius: 32px;
}
</style>
