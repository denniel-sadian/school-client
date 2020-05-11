<template>
  <div class="cont">
    <div v-if="!doneLoading" class="loading">
      <h1 class="w3-text-white w3-center">
        <i class="fas fa-spinner w3-spin"></i>
      </h1>
    </div>
    <div v-else>
      <header class="w3-container">
        <div class="w3-content">
          <h1>Quarterly Test for the grading sheets below</h1>
          <div class="sheet" v-for="s in sheets" :key="s.url">
            <span
              class="w3-tag w3-round-xxlarge w3-text-green w3-white w3-border w3-border-green"
              >{{ s.section }}</span
            >
            <span
              class="w3-tag w3-round-xxlarge w3-text-pink w3-white w3-border w3-border-pink"
              >{{ s.subject }}</span
            >
            <span
              class="w3-tag w3-round-xxlarge w3-text-blue w3-white w3-border w3-border-blue"
              >{{ s.sem === 1 ? 'First Sem' : 'Second Sem' }}</span
            >
            <span
              class="w3-tag w3-round-xxlarge w3-text-purple w3-white w3-border w3-border-purple"
              >{{ s.grading }}</span
            >
          </div>
          <p class="w3-small">
            Prepared by
            {{ exam.teacher.profile.gender === 'm' ? 'Mr.' : 'Ms.' }}
            {{ exam.teacher.first_name }} {{ exam.teacher.last_name }} on
            {{ new Date(exam.date).toDateString() }}.
          </p>
          <p v-show="published" class="w3-small">
            This exam has been published already and is currently visible to the
            students.
          </p>
          <div v-show="editable" class="checkbox">
            <span v-if="doingPublish"
              ><i class="fas fa-spinner w3-spin"></i> Loading ...</span
            >
            <label v-else class="container"
              >Published
              <input v-model="published" :value="false" type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </header>
      <div v-show="editable" class="w3-container">
        <div class="w3-content">
          <div class="inputs">
            <h2><i class="fas fa-plus-circle"></i> Add an Item</h2>
            <div class="inpt">
              <label>Question:</label>
              <input
                type="text"
                v-model="question"
                maxlength="255"
                :disabled="creatingItem"
              />
            </div>
            <hr v-show="question !== ''" />
            <div class="inpt w3-animate-opacity" v-show="question !== ''">
              <label>Choice:</label>
              <input
                type="text"
                v-model="choice"
                @keypress.enter="addChoice"
                maxlength="255"
                :disabled="choices.length === 4"
              />
              <button
                @click="addChoice"
                :disabled="choices.length === 4"
                class="w3-small w3-button w3-round w3-light-green"
              >
                Add Choice
              </button>
              <div
                v-for="c in choices"
                :key="c.letter"
                class="choice w3-hover-shadow"
              >
                <div class="letter">{{ c.letter }}</div>
                <div class="text">{{ c.text }}</div>
                <div class="del">
                  <button
                    @click="deleteChoice(c.letter)"
                    :disabled="creatingItem"
                    class="w3-button"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
            <hr v-show="choices.length === 4" />
            <div class="inpt w3-animate-opacity" v-show="choices.length === 4">
              <label>Correct Answer:</label>
              <select v-model="correct" :disabled="creatingItem">
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
              </select>
            </div>
            <hr v-show="correct !== ''" />
            <button
              @click="createItem"
              :disabled="creatingItem"
              v-show="correct !== ''"
              class="w3-button w3-green w3-round w3-animate-opacity"
            >
              <i v-if="creatingItem" class="fas fa-spinner w3-spin"></i>
              <span v-else>Add Item</span>
            </button>
          </div>
        </div>
      </div>
      <div class="w3-container">
        <div v-if="exam.items.length === 0" class="w3-content">
          <h2>No items yet.</h2>
        </div>
        <div v-else class="w3-content">
          <h2>Items ({{ exam.items.length }})</h2>
          <Item
            v-for="i in exam.items"
            :item="i"
            :editable="editable"
            :key="i.url"
          />
        </div>
      </div>
      <div v-show="editable" class="w3-container">
        <div class="w3-content">
          <button
            class="w3-red w3-round w3-button"
            @click="confirmDelete = true"
            v-show="!confirmDelete"
          >
            Delete Exam
          </button>
          <div
            v-show="confirmDelete"
            class="w3-khaki w3-margin-top w3-padding w3-center"
          >
            <h3>
              <i class="fas fa-exclamation-triangle w3-text-red"></i> Warning!
            </h3>
            <p>
              Deleting this exam will delete this for real, of course. Are you
              sure to continue?
            </p>
            <hr />
            <div class="w3-margin-top">
              <button class="w3-button w3-red w3-round" @click="deleteExam">
                Yes
              </button>
              <button
                class="w3-button w3-green w3-round w3-margin-top"
                @click="confirmDelete = false"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from '~/components/Item.vue'

export default {
  layout: 'dashboard',
  components: { Item },
  data() {
    return {
      sheets: [],

      question: '',
      choices: [],
      choice: '',
      correct: '',
      doingPublish: false,
      published: false,
      creatingItem: false,
      doneLoading: false,
      confirmDelete: false
    }
  },
  computed: {
    exam() {
      return this.$store.state.exams.exam
    },
    username() {
      return this.$store.state.user.user.user.username
    },
    editable() {
      return this.username === this.exam.teacher.username
    }
  },
  watch: {
    published() {
      this.setPublishedOrNot()
    },
    choices(v) {
      for (let i = 0; i < v.length; i++) {
        switch (i) {
          case 0:
            v[0].letter = 'a'
            continue
          case 1:
            v[1].letter = 'b'
            continue
          case 2:
            v[2].letter = 'c'
            continue
          case 3:
            v[3].letter = 'd'
        }
      }
    }
  },
  methods: {
    async setPublishedOrNot() {
      if (!this.editable) return
      this.doingPublish = true
      this.doingPublish = true
      const payload = {
        published: this.published,
        sheets: this.exam.sheets,
        items: this.exam.items
      }
      await this.$axios
        .put(this.exam.url, payload)
        .then(({ data }) => (this.published = data.published))
        .finally(() => (this.doingPublish = false))
    },
    async getName(url) {
      const { data } = await this.$axios.get(url)
      return data.name
    },
    addChoice() {
      if (this.choices.filter((c) => c.text === this.choice).length !== 0)
        return
      this.choices.push({ text: this.choice })
      this.choice = ''
    },
    async createItem() {
      if (this.question && this.correct && this.choices.length === 4) {
        this.creatingItem = true
        const payload = {
          exam: this.exam.url,
          question: this.question,
          correct: this.correct,
          choices: []
        }
        let item = {}
        await this.$axios
          .post('exam/items/', payload)
          .then(({ data }) => (item = data))
        this.choices.forEach(async (c) => (c.item = item.url))
        await this.$axios
          .post('exam/choices/', this.choices[0])
          .then(({ data }) => item.choices.push(data))
        await this.$axios
          .post('exam/choices/', this.choices[1])
          .then(({ data }) => item.choices.push(data))
        await this.$axios
          .post('exam/choices/', this.choices[2])
          .then(({ data }) => item.choices.push(data))
        await this.$axios
          .post('exam/choices/', this.choices[3])
          .then(({ data }) => item.choices.push(data))
        this.$store.commit('exams/PUSH_ITEM', item)
        this.question = ''
        this.correct = ''
        this.choices = []
        this.creatingItem = false
      }
    },
    deleteChoice(letter) {
      this.choices = this.choices.filter((c) => c.letter !== letter)
    },
    async deleteExam() {
      this.doneLoading = false
      await this.$axios
        .delete(this.exam.url)
        .then(() => this.$router.push('/dashboard/exams'))
    }
  },
  async mounted() {
    const url = `exam/exams/${parseInt(this.$route.params.id)}/`
    await this.$store.dispatch('exams/retrieveExam', url)
    await this.$store.dispatch('exams/retrieveTeacher', this.exam.teacher)
    await this.exam.sheets.forEach(async (s) => {
      await this.$axios.get(s).then(async ({ data }) => {
        let sheet = data
        sheet.subject = await this.getName(data.subject)
        sheet.section = await this.getName(data.section)
        this.sheets.push(sheet)
      })
    })
    this.published = this.exam.published
    this.doneLoading = true
  },
  validate(context) {
    return /^\d+$/.test(context.params.id)
  }
}
</script>

<style scoped>
.loading {
  position: absolute;
  z-index: 1;
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
  margin-top: 60px;
  padding: 64px 16px;
  text-transform: capitalize;
  background: #375f1b;
  color: white;
  text-align: center;
}

.sheet {
  margin-bottom: 16px;
  padding: 8px;
  padding-top: 12px;
  border: 1px solid #9e9e9e;
  background: #f1f1f1;
  border-radius: 4px;
}

.w3-content {
  max-width: 600px;
  margin-bottom: 32px;
}

.inputs {
  border: 1px solid black;
  border-radius: 4px;
  padding: 8px;
  margin: 32px 0px;
}

.w3-button {
  width: 100%;
}

.inpt button {
  margin: 8px 0px;
}

.choice {
  display: grid;
  grid-template-columns: auto 1fr auto;
  border: 1px solid #e91e63;
  border-radius: 4px;
  margin: 4px 0px;
}

.letter {
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  height: 100%;
  background: #e91e63;
  color: white;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  padding: 8px;
}

.del {
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  color: #e91e63;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
}

.del button {
  min-width: 38px;
  min-height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  margin: 0px;
}

.checkbox {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #87ceeb;
  padding: 8px 16px 8px 8px;
  border-radius: 32px;
}

.checkbox .container {
  margin-bottom: 0px;
}

.checkbox .container .checkmark {
  border-radius: 100%;
}
</style>
