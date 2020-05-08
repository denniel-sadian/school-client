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
    itemUrl: String
  },
  data() {
    return {
      item: {}
    }
  },
  async created() {
    await this.$axios.get(this.itemUrl).then(({ data }) => (this.item = data))
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
</style>
