<template>
  <div>
    <header class="w3-container w3-green">
      <div class="w3-content w3-padding">
        <h1>Welcome to the grading sheet system</h1>
        <p>
          <i class="fas fa-hand-sparkles"></i> Good day,
          <span class="fullname">{{ addressing }} {{ fullname }}</span
          >, one of the {{ role }}s of the system. Here, you can find the
          summary of the system's data.
        </p>
      </div>
    </header>
    <article class="w3-container">
      <div class="w3-content">
        <h1 v-if="!doneLoading" class="w3-text-green w3-center">
          <i class="fas fa-spinner w3-spin"></i> Loading...
        </h1>
        <div v-else id="first-grid" class="w3-animate-zoom">
          <div @click="$router.push('/dashboard/departments')">
            <h3><i class="fas fa-school"></i></h3>
            <p>
              {{ departments }} Department<span v-show="departments > 1"
                >s</span
              >
            </p>
          </div>
          <div @click="$router.push('/dashboard/sections')">
            <h3><i class="fas fa-building"></i></h3>
            <p>{{ sections }} Section<span v-show="sections > 1">s</span></p>
          </div>
          <div @click="$router.push('/dashboard/subjects')">
            <h3><i class="fas fa-percentage"></i></h3>
            <p>{{ subjects }} Subject<span v-show="subjects > 1">s</span></p>
          </div>
          <div @click="$router.push('/dashboard/students')">
            <h3><i class="fas fa-portrait"></i></h3>
            <p>{{ students }} Student<span v-show="students > 1">s</span></p>
          </div>
          <div @click="$router.push('/dashboard/cards')">
            <h3><i class="fas fa-id-card"></i></h3>
            <p>{{ cards }} Report Card<span v-show="students > 1">s</span></p>
          </div>
          <div @click="$router.push('/dashboard/sheets')">
            <h3><i class="fas fa-file-excel"></i></h3>
            <p>{{ sheets }} Grading Sheet<span v-show="sheets > 1">s</span></p>
          </div>
          <div @click="$router.push('/dashboard/viewing-permissions')">
            <h3><i class="fas fa-eye"></i></h3>
            <p>
              {{ vPerms }} Card Viewing Permission<span v-show="sheets > 1"
                >s</span
              >
            </p>
          </div>
          <div
            @click="$router.push('/registration/permissions')"
            v-show="role === 'admin'"
          >
            <h3><i class="fas fa-key"></i></h3>
            <p>
              {{ regPerms }} Registration Permission<span v-show="regPerms > 1"
                >s</span
              >
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return { got: 0 }
  },
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
    doneLoading() {
      if (this.role === 'admin') return this.got === 5
      return this.got === 4
    },
    departments() {
      return this.$store.state.information.departments.length
    },
    sections() {
      return this.$store.state.information.sections.length
    },
    subjects() {
      return this.$store.state.information.subjects.length
    },
    students() {
      return this.$store.state.information.students.length
    },
    regPerms() {
      return this.$store.state.user.permissions.length
    },
    vPerms() {
      return this.$store.state.grading.permissions.length
    },
    sheets() {
      return this.$store.state.grading.sheets.length
    },
    cards() {
      return this.$store.state.grading.cards.length
    }
  },
  async mounted() {
    await this.$store
      .dispatch('information/getInformation')
      .then(() => this.got++)
    await this.$store.dispatch('grading/retrieveSheets').then(() => this.got++)
    await this.$store.dispatch('grading/retrieveCards').then(() => this.got++)
    await this.$store.dispatch('grading/retrievePerms').then(() => this.got++)
    if (this.role === 'admin')
      await this.$store.dispatch('user/getPerms').then(() => this.got++)
  },
  head: {
    title: 'School | Home'
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
  margin: 64px 0px;
}
#first-grid > div {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  text-align: center;
  border-radius: 4px;
  border: 1.5px solid #9e9e9e;
  cursor: pointer;
  transition: 0.3s;
  margin: 8px;
}
#first-grid > div:hover {
  background: #f1f1f1;
}
#first-grid > div > h3 {
  margin: 0px;
  font-size: 50px;
  font-weight: 800;
  font-family: 'Courier New', Courier, monospace;
  color: #9e9e9e;
}
#first-grid > div > p {
  margin: 0px;
  padding: 8px;
}
@media (max-width: 425px) {
  #first-grid {
    grid-template-columns: 1fr 1fr;
  }

  #first-grid > div {
    margin: 8px;
  }
}
</style>