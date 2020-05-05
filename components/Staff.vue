<template>
  <div class="cont"></div>
</template>

<script>
export default {
  props: {
    staff: Object
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.user.profile.role === 'admin'
    }
  }
}
</script>

<style scoped>
.cont {
  border: 2px solid #9e9e9e;
  border-radius: 4px;
  margin: 50px 0px;
  padding: 8px;
}
</style>
