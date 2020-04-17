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
            <h3>{{ departments }}</h3>
            <p>Departments</p>
          </div>
          <div @click="$router.push('/sections')">
            <h3>{{ sections }}</h3>
            <p>Sections</p>
          </div>
          <div @click="$router.push('/students')">
            <h3>{{ students }}</h3>
            <p>Students</p>
          </div>
          <div @click="$router.push('/sheets')">
            <h3>{{ students }}</h3>
            <p>Grading Sheets</p>
          </div>
          <div @click="$router.push('/permissions')">
            <h3>{{ vPerms }}</h3>
            <p>Grading Sheets Viewing Permissions</p>
          </div>
          <div
            @click="$router.push('/registration/permissions')"
            v-show="role === 'admin'"
          >
            <h3>{{ regPerms }}</h3>
            <p>Registration Permissions</p>
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
    },
    regPerms() {
      return this.$store.state.user.permissions.length
    },
    vPerms() {
      return this.$store.state.information.permissions.length
    }
  },
  async mounted() {
    await this.$store.dispatch('information/getInformation')
    if (this.role === 'admin') {
      await this.$store.dispatch('user/getPerms')
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  text-align: center;
  background: #f1f1f1;
  border-radius: 4px;
  border: 1.5px solid #8bc34a;
  cursor: pointer;
  transition: 0.3s;
  margin: 8px;
}
#first-grid > div:hover {
  background: #8bc34a;
}
#first-grid > div > h3 {
  margin: 0px;
  font-size: 50px;
  font-weight: 800;
  font-family: 'Courier New', Courier, monospace;
}
#first-grid > div > p {
  margin: 0px;
  background: #8bc34a;
  padding: 8px;
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
