<template>
  <div class="cont w3-card-4" v-show="!deleting">
    <div v-if="!doneLoading" class="w3-center">
      <h1><i class="fas fa-spinner w3-spin w3-text-gray"></i></h1>
    </div>
    <div v-else class="display">
      <div v-if="!confirmDelete">
        <div v-if="!updatingItem">
          <h4 v-if="!editing">{{ item.question }}</h4>
          <div v-else class="inpt">
            <label>Question:</label>
            <input
              type="text"
              v-model="question"
              maxlength="255"
              :disabled="updatingItem"
            />
          </div>
        </div>
        <div v-else>
          <h3><i class="fas fa-spinner w3-spin w3-text-gray"></i></h3>
        </div>
        <Choice
          v-for="url in item.choices"
          :choiceUrl="url"
          :editing="editing"
          :updating="updating"
          :answer="item.correct"
          :key="url"
        />
        <div v-if="!updatingItem">
          <p v-if="!editing">Answer: {{ item.correct }}</p>
          <div v-else class="inpt">
            <label>Answer:</label>
            <select v-model="answer" :disabled="updatingItem">
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>
        </div>
        <div v-else>
          <p><i class="fas fa-spinner w3-spin w3-text-gray"></i></p>
        </div>
        <div v-show="editable" class="edit">
          <button
            @click="editing = true"
            v-show="!editing"
            class="w3-button w3-green"
          >
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button
            v-show="!editing"
            @click="confirmDelete = true"
            class="w3-button w3-pink"
          >
            <i class="fas fa-trash-alt "></i>
          </button>
          <button
            v-show="editing"
            @click="
              updating = !updating
              editing = false
            "
            class="w3-button w3-green"
          >
            <i class="fas fa-save"></i>
          </button>
          <button
            v-show="editing"
            @click="editing = false"
            class="w3-button w3-pink"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div v-else class="w3-center">
        <p>
          <i class="fas fa-exclamation-triangle w3-text-red"></i> Are you sure,
          you want to delete this item?
        </p>
        <button class="w3-button w3-small w3-round w3-pink" @click="deleteItem">
          Yes
        </button>
        <button
          class="w3-button w3-small w3-round w3-green"
          @click="confirmDelete = false"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Choice from '~/components/Choice.vue'

export default {
  components: { Choice },
  props: {
    itemUrl: String,
    editable: Boolean
  },
  data() {
    return {
      item: {},
      question: '',
      answer: '',
      doneLoading: false,
      editing: false,
      updating: false,
      updatingItem: false,
      confirmDelete: false,
      deleting: false
    }
  },
  watch: {
    editing(v) {
      if (v) {
        this.question = this.item.question
        this.answer = this.item.correct
      }
    },
    updating() {
      this.update()
    }
  },
  methods: {
    async update() {
      if (
        this.question === '' ||
        (this.item.question === this.question &&
          this.item.correct === this.answer)
      )
        return
      this.updatingItem = true
      const payload = {
        exam: this.item.exam,
        question: this.question,
        correct: this.answer,
        choices: []
      }
      await this.$axios
        .put(this.itemUrl, payload)
        .then(({ data }) => (this.item = data))
        .finally(() => {
          this.updatingItem = false
          this.editing = false
        })
    },
    async deleteItem() {
      this.deleting = true
      await this.$store.dispatch('exams/deleteItem', this.itemUrl)
    }
  },
  async mounted() {
    await this.$axios.get(this.itemUrl).then(({ data }) => (this.item = data))
    this.doneLoading = true
  }
}
</script>

<style scoped>
.cont {
  margin-bottom: 64px;
  border: 2px solid black;
  border-radius: 4px;
  padding: 8px;
}

.edit {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #9e9e9e;
  padding-top: 8px;
  margin-top: 8px;
}

.edit button {
  border-radius: 100%;
  max-width: 35px;
  max-height: 35px;
  min-width: 35px;
  min-height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
}

p {
  text-transform: capitalize;
}
</style>
