<template>
  <div>
    <div v-if="!doneLoading" class="w3-center">
      <h4><i class="fas fa-spinner w3-spin w3-text-gray"></i></h4>
    </div>
    <div v-else class="choice">
      <div class="letter">{{ choice.letter }}</div>
      <div class="text">
        <div v-if="updatingChoice">
          <i class="fas fa-spinner w3-spin w3-text-gray"></i>
        </div>
        <div v-else>
          <span v-if="!editing">
            {{ choice.text }}
            <i
              v-show="answer === choice.letter"
              class="fas fa-check w3-text-green"
            ></i
          ></span>
          <input v-else type="text" maxlength="255" v-model="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    choice: Object,
    answer: String,
    editing: Boolean,
    updating: Boolean
  },
  data() {
    return {
      doneLoading: false,
      updatingChoice: false,
      text: ''
    }
  },
  watch: {
    editing(v) {
      if (v) this.text = this.choice.text
    },
    updating() {
      this.update()
    }
  },
  methods: {
    async update() {
      if (this.text === this.choice.text || this.text === '') return
      this.updatingChoice = true
      const payload = {
        url: this.choice.url,
        item: this.choice.item,
        letter: this.choice.letter,
        text: this.text
      }
      await this.$store.dispatch('exams/updateChoice', payload).finally(() => {
        this.updatingChoice = false
      })
    }
  },
  async mounted() {
    await this.$axios
      .get(this.choiceUrl)
      .then(({ data }) => (this.choice = data))
    this.doneLoading = true
  }
}
</script>

<style scoped>
.choice {
  display: grid;
  grid-template-columns: auto 1fr auto;
  border: 2px solid #9e9e9e;
  border-radius: 4px;
  margin: 8px 0px;
  transition: 0.3s;
}

.choice:hover {
  border-color: #2196f3;
}

.choice:hover .letter {
  background: #2196f3;
}

.letter {
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  height: 100%;
  background: #9e9e9e;
  color: white;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Slab', serif !important;
  font-weight: 800;
  transition: 0.3s;
}

.text {
  padding: 8px;
}

.text input {
  border: none;
  border-left: 2px solid #2196f3;
  padding-left: 8px;
  width: 100%;
}
</style>
