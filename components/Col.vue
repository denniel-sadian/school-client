<template>
  <td>{{ record.score }} {{ record.work }}</td>
</template>

<script>
export default {
  props: {
    record: Object
  }
}
</script>

<style scoped></style>
