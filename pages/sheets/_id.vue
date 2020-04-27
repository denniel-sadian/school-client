<template>
  <div>
    <div v-if="got < 6" class="loading">
      <h1 class="w3-text-white w3-center">
        <i class="fas fa-spinner w3-spin"></i>
      </h1>
    </div>
    <div v-else>
      <header class="w3-center w3-pale-green">
        <h1>
          Grading sheet of {{ section }} for
          {{ subject.name }}
        </h1>
        <p>{{ new Date(sheet.date).toDateString() }}</p>
        <p v-if="sheet.teacher.username === username">Prepared by: You</p>
        <p v-else>
          Prepared by: Teacher {{ sheet.teacher.first_name }}
          {{ sheet.teacher.last_name }}
        </p>
      </header>
      <div id="sheet-cont">
        <table id="sheet">
        <tr>
          <th rowspan="2">Learners' Names</th>
          <th class="w3-orange" :colspan="writtenWorks.length + 3">Written Works (20%)</th>
          <th class="w3-green" :colspan="performances.length + 3">Performance Tasks (60%)</th>
          <th class="w3-purple" :colspan="3">Quarterly Assessment Tasks (20%)</th>
          <th rowspan="3">Initial Grade</th>
          <th rowspan="3">Quarterly Grade</th>
        </tr>
        <tr>
          <th class="w3-orange" v-for="i in writtenWorks.length" :key="'ww' + i + Math.random()">{{ i }}</th>
          <th class="w3-orange">Total</th>
          <th class="w3-orange">PS</th>
          <th class="w3-orange">WS</th>
          <th class="w3-green" v-for="i in performances.length" :key="'pp' + i + Math.random()">{{ i }}</th>
          <th class="w3-green">Total</th>
          <th class="w3-green">PS</th>
          <th class="w3-green">WS</th>
          <th class="w3-purple">1</th>
          <th class="w3-purple">PS</th>
          <th class="w3-purple">WS</th>
        </tr>
        <tr>
          <th>Highest Possible Score</th>
          <th class="w3-orange" v-for="w in writtenWorks" :key="w.url">{{ w.highest_score }}</th>
          <th class="w3-orange">{{ totalWrittenWorksScore }}</th>
          <th class="w3-orange">100.00</th>
          <th class="w3-orange">20%</th>
          <th class="w3-green" v-for="p in performances" :key="p.url">{{ p.highest_score }}</th>
          <th class="w3-green">{{ totalPerformancesScore }}</th>
          <th class="w3-green">100.00</th>
          <th class="w3-green">60%</th>
          <th class="w3-purple">{{ exam.highest_score }}</th>
          <th class="w3-purple">100.00</th>
          <th class="w3-purple">20%</th>
        </tr>
        <tr>
          <th>Male</th>
          <th class="w3-orange" v-for="i in writtenWorks.length" :key="'1w' + i+ Math.random()"></th>
          <th class="w3-orange"></th>
          <th class="w3-orange"></th>
          <th class="w3-orange"></th>
          <th class="w3-green" v-for="i in performances.length" :key="'1p' + i+ Math.random()"></th>
          <th class="w3-green"></th>
          <th class="w3-green"></th>
          <th class="w3-green"></th>
          <th class="w3-purple"></th>
          <th class="w3-purple"></th>
          <th class="w3-purple"></th>
          <th></th>
          <th></th>
        </tr>
        <Row as="tr" v-for="b in boys" :shouldSubmit="submitFinalGrade" :topTotalActScore="totalWrittenWorksScore" :topTotalPerfScore="totalPerformancesScore" :student="b" :key="b.url"/>
        <tr>
          <th>Female</th>
          <th v-for="i in writtenWorks.length" :key="'2w' + i+ Math.random()"></th>
          <th></th>
          <th></th>
          <th></th>
          <th v-for="i in performances.length" :key="'2p' + i+ Math.random()"></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <Row as="tr" v-for="g in girls" :shouldSubmit="submitFinalGrade" :topTotalActScore="totalWrittenWorksScore" :topTotalPerfScore="totalPerformancesScore" :student="g" :key="g.url"/>
      </table>
      </div>

      <div
        id="controls"
        v-show="role === 'teacher' && username === sheet.teacher.username"
      >
        <div id="editing-modal" v-show="showEditingForm" class="w3-animate-opacity">
          <div class="w3-animate-bottom w3-card-4">
            <div class="form-inputs">
              <div>
                <h3>
                  <i class="fas fa-pencil-alt"></i> Works
                </h3>
              </div>
              <div class="scrolled">
                <div>
                  <form
                    id="adding-form"
                    @submit.prevent="createWork"
                    class="w3-animate-top"
                  >
                    <div class="inpt">
                      <label>Work Name:</label>
                      <input
                        required
                        type="text"
                        v-model="wName"
                        name="wName"
                        :disabled="creatingWork"
                      />
                    </div>
                    <div class="inpt">
                      <label>Work Type:</label>
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
                      <span v-if="creatingWork"
                        ><i class="fas fa-spinner w3-spin"></i> Adding
                        work...</span
                      >
                      <span v-else>Add Work</span>
                    </button>
                  </form>
                  <p v-if="!sheet.works" class="w3-small w3-center">
                    There are no works yet.
                  </p>
                  <div v-else>
                    <Work v-for="w in sheet.works" :work="w" :key="w.url" />
                  </div>
                </div>
                <div class="or">
                  <hr />
                  <span>Or</span>
                  <hr />
                </div>
                <form @submit.prevent="updateSheet" v-if="!deleting">
                  <div class="inpt">
                    <label>Grading:</label>
                    <select v-model="grading" :disabled="updating">
                      <option value="prelim">Perlim</option>
                      <option value="midterm">Midterm</option>
                      <option value="finals">Finals</option>
                    </select>
                  </div>
                  <div class="inpt">
                    <label>Semester:</label>
                    <select v-model="sem" :disabled="updating">
                      <option value="1">First Semester</option>
                      <option value="2">Second Semester</option>
                    </select>
                  </div>
                  <div class="inpt">
                    <label>Done:</label>
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
                    <span v-if="updating"
                      ><i class="fas fa-spinner w3-spin"></i> Updating...</span
                    >
                    <span v-else>Update</span>
                  </button>
                  <button @click="deleting = true" class="w3-button w3-red w3-round w3-small w3-margin-top">Delete Grading Sheet</button>
                </form>
                <div v-else class="w3-center w3-khaki w3-padding w3-round w3-animate-zoom">
                  <div v-if="!reallyDeleting">
                    <h3><i class="fas fa-exclamation-circle w3-text-red"></i> Warning!</h3>
                    <p>You cannot bring back the records of this grading sheet once
                      it's deleted, unless, of course, you start from the top. Are you sure you want to continue?</p>
                    <hr>
                  <button @click="deleteSheet" class="w3-button w3-round w3-small w3-red">Yes. I understand.</button>
                  <button class="w3-button w3-round w3-small w3-green w3-margin-top" @click="deleting = false">No! Take me back.</button>
                  </div>
                  <div v-else>
                    <h1 class="w3-text-yellow">
                      <i class="fas fa-spinner w3-spin"></i>
                    </h1>
                  </div>
                </div>
                <div class="or">
                  <hr />
                  <span>Or</span>
                  <hr />
                </div>
                <button :disabled="!sheet.publish" @click="submitFinalGrade = true" class="w3-green w3-button w3-round">{{ finalGrades.length }} Publish Grades to Cards</button>
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
          class="w3-green w3-button w3-animate-zoom w3-card-4"
          id="edit-sheet-btn"
        >
          <i class="fas fa-pencil-alt"></i> Add Works
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Work from '~/components/Work.vue'
import Row from '~/components/Row.vue'

export default {
  components: {
    Work,
    Row
  },
  data() {
    return {
      got: 0,
      showEditingForm: true,
      updating: false,
      creatingWork: false,
      updated: false,
      deleting: false,
      reallyDeleting: false,
      submitFinalGrade: false,

      pub: '',
      sem: '',
      grading: '',
      wName: '',
      wType: '',
      wScore: 0
    }
  },
  computed: {
    finalGrades() {
      return this.$store.state.grading.finalGrades
    },
    sheet() {
      return this.$store.state.grading.currentSheet
    },
    allWorks() {
      return this.sheet.works
    },
    writtenWorks() {
      return this.allWorks.filter(
        (e) => e.work_type === 'a' || e.work_type === 'q'
      )
    },
    performances() {
      return this.allWorks.filter((e) => e.work_type === 'p')
    },
    exam() {
      const exam = this.allWorks.filter((e) => e.work_type === 'e')[0]
      if (exam) return exam
      else return { highest_score: 0 }
    },
    totalPerformancesScore() {
      let score = 0
      this.performances.forEach((w) => (score += w.highest_score))
      return score
    },
    totalWrittenWorksScore() {
      let score = 0
      this.writtenWorks.forEach((w) => (score += w.highest_score))
      return score
    },
    username() {
      return this.$store.state.user.user.user.username
    },
    role() {
      return this.$store.state.user.user.profile.role
    },
    section() {
      const sections = this.$store.state.information.sections
      return sections.filter((e) => e.url === this.sheet.section)[0].name
    },
    subject() {
      return this.$store.state.information.subjects.filter((e) => (
        e.url === this.sheet.subject
      ))[0]
    },
    students() {
      return this.$store.state.information.students.filter((s) => 
        (s.section === this.sheet.section)
      )
    },
    boys() {
      return this.students.filter((s) => (
        s.section === this.sheet.section && s.gender === 'm')
      ).sort((a, b)=> {
        const x = (a.last_name+a.first_name).toLowerCase();
  const y = (b.last_name+b.first_name).toLowerCase();
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0;
      })
    },
    girls() {
      return this.students.filter((s) => (
        s.section === this.sheet.section && s.gender === 'f')
      ).sort((a, b)=> {
        const x = (a.last_name+a.first_name).toLowerCase();
  const y = (b.last_name+b.first_name).toLowerCase();
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0;
      })
    }
  },
  watch: {
    finalGrades(v) {
      if (v.length === this.students.length) this.publishGrades()
    },
    showEditingForm(v) {
      if (v) {
        this.pub = this.sheet.publish
        this.sem = this.sheet.sem
        this.grading = this.sheet.grading
      }
    },
    creatingWork(v) {
      if (!v) {
        this.wName = ''
        this.wType = ''
        this.wScore = ''
      }
    },
  },
  methods: {
    publishGrades() {
      const payload = {
        sem: this.sheet.sem,
        grading: this.sheet.grading,
        subject: this.subject.id,
        grades: this.finalGrades
      }
    },
    async createRecords() {
      if (this.username !== this.sheet.teacher.username) return
      let records = []
      this.students.forEach((s) => {
        this.allWorks.forEach((w) => {
          if (
            !this.sheet.records.filter(
              (r) => r.student === s.url && r.work === w.url
            )[0]
          ) {
            const rec = {
              gsheet: this.sheet.url,
              student: s.url,
              work: w.url,
              score: 0
            }
            records.push(rec)
          }
        })
      })
      if (records.length !== 0)
        await this.$store.dispatch('grading/createRecords', records)
    },
    async deleteSheet() {
      this.reallyDeleting = true
      await this.$store.dispatch('grading/deleteSheet', this.sheet.url).finally(()=>this.$router.push('/sheets'))
    },
    async createWork() {
      this.creatingWork = true
      const payload = {
        gsheet: this.sheet.url,
        name: this.wName,
        highest_score: this.wScore,
        work_type: this.wType
      }
      await this.$store
        .dispatch('grading/createWork', payload)
        .then(async () => (await this.createRecords()))
        .finally(() => (this.creatingWork = false))
    },
    updateSheet() {
      this.updating = true
      const payload = {
        url: this.sheet.url,
        department: this.sheet.department,
        section: this.sheet.section,
        subject: this.sheet.subject,
        publish: this.pub,
        sem: this.sem,
        grading: this.grading
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
    await this.$store.dispatch('information/getStudents').then(() => this.got++)
    await this.$store
      .dispatch('grading/retrieveSheets', url)
      .then(() => this.got++)
    const url = this.$store.state.grading.sheets.filter(
      (e) => e.id === parseInt(this.$route.params.id)
    )[0].url
    await this.$store
      .dispatch('grading/retrieveSheet', url)
      .then(() => this.got++)
    this.createRecords()
    this.pub = this.sheet.publish
    this.sem = this.sheet.sem
    this.grading = this.sheet.grading
  },
  validate(context) {
    return /^\d+$/.test(context.params.id)
  },
  head: {
      title: 'School | Grading Sheet'
  }
}
</script>

<style scoped>
.loading {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(128, 128, 128, 0.856);
}

.loading h1 {
  font-size: 90px;
}

header {
  margin-top: 53px;
  padding: 64px 16px;
  text-transform: capitalize;
}

#adding-form {
  margin-bottom: 8px;
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
  background: rgba(0, 0, 0, 0.459);
}

#editing-modal > div {
  max-width: 500px;
  width: 100%;
  height: 100%;
  background: white;
  border: 2px solid #9e9e9e;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr auto;
}

#editing-modal > div > .form-inputs h3 {
  padding: 8px;
}

.form-inputs > div:first-child {
  border-bottom: 1px solid #9e9e9e;
}

.form-inputs {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr;
  overflow-y: auto;
}

.scrolled {
  overflow-y: auto;
  padding: 16px 8px;
}

.form-inputs .w3-button {
  width: 100%;
}

#editing-modal > div .form-bottom-btns {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #9e9e9e;
  padding: 8px;
}

#editing-modal > div .form-bottom-btns * {
  border-radius: 32px;
}

.or {
  margin: 30px 0px;
}

#sheet {
  width: 100%;
}

#sheet-cont {
  overflow-x: auto;
  margin-bottom: 64px;
}

table, th {
  border: 2px solid black;
}
</style>
