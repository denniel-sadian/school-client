<template>
  <td class="w3-animate-zoom">
    <div v-if="editing && updating">
      <i class="fas fa-spinner w3-spin w3-text-green"></i>
    </div>
    <div @click="editing = true" v-else-if="!editing && !updating">
      {{ record.score }}
    </div>
    <form @submit.prevent="update" v-else class="w3-animate-opacity">
      <input
        type="number"
        min="1"
        :max="max"
        v-model="score"
        autofocus="autofocus"
        required
      />
      <button class="w3-button w3-green" type="submit">
        <i class="fas fa-check-circle"></i>
      </button>
      <button class="w3-button w3-pink" @click="editing = false">
        <i class="fas fa-times-circle"></i>
      </button>
    </form>
  </td>
</template>

<script>
export default {
  props: {
    record: Object
  },
  data() {
    return {
      editing: false,
      updating: false,
      score: 0
    }
  },
  computed: {
    max() {
      return this.$store.state.grading.currentSheet.works.filter(
        (e) => e.url === this.record.work
      )[0].highest_score
    }
  },
  watch: {
    editing(v) {
      if (v) this.score = this.record.score
    }
  },
  methods: {
    async update() {
      this.updating = true
      const payload = {
        gsheet: this.$store.state.grading.currentSheet.url,
        url: this.record.url,
        student: this.record.student,
        work: this.record.work,
        score: this.score
      }
      await this.$store
        .dispatch('grading/updateRecord', payload)
        .finally(() => {
          this.updating = false
          this.editing = false
        })
    }
  }
}
</script>

<style scoped>
td {
  text-align: center;
}

form {
  display: flex;
  border: 2px solid black;
}

input {
  width: 84px;
  text-align: center;
  border-style: none;
  border-right: 1px solid black;
}

button {
  max-width: 30px;
  max-height: 30px;
  min-width: 30px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
