<template>
  <div>
    <header class="w3-container">
      <div class="w3-content">
        <h1>Welcome to the shool management system</h1>
        <p>
          <i class="fas fa-hand-sparkles"></i> Good day,
          <span class="fullname">{{ addressing }} {{ fullname }}</span
          >, one of the {{ role }}s of the system. Here, you can find the
          summary of the system's data.
        </p>
      </div>
    </header>
    <article class="w3-container w3-margin-top">
      <div class="w3-content" id="first-grid">
        <div>
          <h3><i class="fas fa-school"></i><br />Departments</h3>
          <p>{{ information }}</p>
        </div>
        <div>
          <h3><i class="fas fa-building"></i><br />Sections</h3>
        </div>
        <div>
          <h3><i class="fas fa-portrait"></i><br />Students</h3>
        </div>
      </div>
    </article>
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
    },
    role() {
      return this.$store.state.user.user.profile.role
    },
    information() {
      return this.$store.state.information.departments
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

#first-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
#first-grid > div {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
