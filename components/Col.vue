<template>
  <td>{{ record.score }}</td>
</template>

<script>
export default {
  props: {
    record: Object
  }
}
</script>

<style scoped>
td {
  text-align: center;
}
</style>
