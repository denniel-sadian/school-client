<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding">
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
      <div class="w3-content">
        <div id="first-grid">
          <div @click="$router.push('/departments')">
            <h3><i class="fas fa-school"></i><br />Departments</h3>
            <h2>{{ departments }}</h2>
          </div>
          <div @click="$router.push('/sections')">
            <h3><i class="fas fa-building"></i><br />Sections</h3>
            <h2>{{ sections }}</h2>
          </div>
          <div @click="$router.push('/students')">
            <h3><i class="fas fa-portrait"></i><br />Students</h3>
            <h2>{{ students }}</h2>
          </div>
          <div @click="$router.push('/sheets')">
            <h3><i class="fas fa-file-excel"></i><br />Grading Sheets</h3>
            <h2>{{ students }}</h2>
          </div>
          <div @click="$router.push('/permissions')">
            <h3><i class="fas fa-file-excel"></i><br />Viewing Permissions</h3>
            <h2>{{ students }}</h2>
          </div>
          <div @click="$router.push('/registration/permissions')">
            <h3>
              <i class="fas fa-file-excel"></i><br />Registration Permissions
            </h3>
            <h2>{{ students }}</h2>
          </div>
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
    departments() {
      return this.$store.state.information.departments.length
    },
    sections() {
      return this.$store.state.information.sections.length
    },
    students() {
      return this.$store.state.information.students.length
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
  grid-template-columns: 50% 50%;
}
#first-grid > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f1f1f1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;
  transition: 0.3s;
  margin: 8px;
}
#first-grid > div:hover {
  background: #8bc34a;
}
#first-grid > div > h2,
#first-grid > div > h3 {
  margin: 0px;
}
#first-grid > div > h2 {
  font-weight: 800;
}

@media (max-width: 425px) {
  #first-grid {
    grid-template-columns: 1fr;
  }

  #first-grid > div {
    margin: 8px 0px;
  }
}
</style>
