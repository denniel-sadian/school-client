<template>
  <div class="cont">
    <div class="display">
      <h4>{{ item.question }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    choiceUrl: String
  },
  data() {
    return {
      choice: {}
    }
  },
  async created() {
    await this.$axios
      .get(this.choiceUrl)
      .then(({ data }) => (this.choice = data))
  }
}
</script>

<style scoped>
.cont {
  border: 2px solid black;
  border-radius: 4px;
  padding: 8px;
}
</style>
