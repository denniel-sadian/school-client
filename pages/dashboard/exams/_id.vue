<template>
  <div class="cont">
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
      </div>
    </header>
    <div class="w3-content">
      <div class="w3-content">
        <div class="inputs">
          <h2><i class="fas fa-plus-circle"></i> Add an Item</h2>
          <div class="inpt">
            <label>Question:</label>
            <input type="text" v-model="question" :disabled="creatingItem" />
          </div>
          <hr v-show="question !== ''" />
          <div class="inpt w3-animate-opacity" v-show="question !== ''">
            <label>Choice:</label>
            <input
              type="text"
              v-model="choice"
              @keypress.enter="addChoice"
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
                <button @click="deleteChoice(c.letter)" class="w3-button">
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
      <div class="w3-content">
        <h2>Items</h2>
        <Item v-for="url in exam.items" :itemUrl="url" :key="url" />
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
      creatingItem: false
    }
  },
  computed: {
    exam() {
      return this.$store.state.exams.exam
    },
    username() {
      return this.$store.state.user.user.user.username
    }
  },
  watch: {
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
          item: {
            exam: this.exam.url,
            question: this.question,
            correct: this.correct,
            choices: []
          },
          choices: this.choices
        }
        await this.$store
          .dispatch('exams/createItem', payload)
          .then(() => {
            this.question = ''
            this.correct = ''
            this.choices = []
          })
          .finally(() => (this.creatingItem = false))
      }
    },
    deleteChoice(letter) {
      this.choices = this.choices.filter((c) => c.letter !== letter)
    }
  },
  async mounted() {
    const url = `exam/exams/${parseInt(this.$route.params.id)}/`
    await this.$store.dispatch('exams/retrieveExam', url)
    await this.$store.dispatch('exams/retrieveTeacher', this.exam.teacher)
    this.exam.sheets.forEach(async (s) => {
      await this.$axios.get(s).then(async ({ data }) => {
        let sheet = data
        sheet.subject = await this.getName(data.subject)
        sheet.section = await this.getName(data.section)
        this.sheets.push(sheet)
      })
    })
  },
  validate(context) {
    return /^\d+$/.test(context.params.id)
  }
}
</script>

<style scoped>
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
</style>
