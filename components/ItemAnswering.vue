<template>
  <div class="item">
    <h4>{{ item.question }}</h4>
    <label class="container" v-for="c in item.choices" :key="c.url">
      <span>{{ c.text }}</span>
      <input v-model="answer" :value="c.letter" type="radio" />
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      answer: ''
    }
  },
  watch: {
    answer(v) {
      this.$store.commit('exams/PUSH_OR_MODIFY_ANSWER', {
        item: this.item.id,
        answer: v
      })
    }
  }
}
</script>

<style scoped>
.item {
  margin: 50px 0px;
}

.checkmark {
  border-radius: 32px;
}
</style>
