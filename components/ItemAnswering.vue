<template>
  <div class="item">
    <h4>{{ item.question }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>

<style scoped>
.item {
  margin: 50px 0px;
}
</style>
