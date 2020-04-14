<template>
  <div>
    <header class="w3-container">
      <div class="w3-content">
        <h1>Welcome to the shool management system</h1>
        <p>
          Good day, <span class="fullname">{{ addressing }} {{ fullname }}</span
          >.
        </p>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    fullname() {
      const f = this.$store.state.user.user.user.first_name
      const l = this.$store.state.user.user.user.last_name
      return f + ' ' + l
    },
    addressing() {
      if (this.$store.state.user.user.profile.gender === 'f') return 'miss'
      return 'mister'
    }
  }
}
</script>

<style scoped>
header {
  margin-top: 53px;
  padding: 64px 0px !important;
  text-align: center;
}

header h1 {
  text-transform: capitalize;
}

.fullname {
  text-transform: capitalize;
}
</style>
