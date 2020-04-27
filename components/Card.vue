<template>
  <div class="cont">
    <div class="details">
      <h1>{{ card.student.first_name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object
  }
}
</script>

<style scoped></style>
