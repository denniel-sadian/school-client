<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Departments</h1>
        <p>
          Both teachers and admins can view this page, but only the admins can
          modify the departments. If you are an admin, please refrain from
          deleting departments, especially if some users (admins or teachers)
          are using them in this profile.
        </p>
      </div>
    </header>
    <div v-if="got < 1">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div v-else>
      <article class="w3-container" v-show="role === 'admin'">
        <form @submit.prevent="createDepartment" class="w3-content">
          <h2><i class="fas fa-plus-circle"></i> Add a Department</h2>
          <div class="inpt">
            <label>Department Name:</label>
            <input type="text" v-model="name" required :disabled="creating" />
          </div>
          <hr />
          <p class="w3-center w3-text-red w3-small" v-show="error">
            Please provide a unique name.
          </p>
          <button
            type="submit"
            :disabled="creating"
            class="w3-button w3-green w3-round"
          >
            <span v-if="creating"
              ><i class="fas fa-spinner w3-spin"></i> Adding...</span
            >
            <span v-else>Add This Department</span>
          </button>
        </form>
      </article>
      <article class="w3-container">
        <div class="w3-content">
          <div v-if="departments.length === 0" class="w3-center">
            <h4>There is no department yet.</h4>
          </div>
          <div v-else>
            <h2 class="w3-center">List of Departments</h2>
            <Department
              v-for="dep in departments"
              :dep="dep"
              :role="role"
              :key="dep.id"
            />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Department from '~/components/Department.vue'

export default {
  components: {
    Department
  },
  data() {
    return {
      got: 0,
      creating: false,
      error: false,
      name: ''
    }
  },
  computed: {
    departments() {
      return this.$store.state.information.departments
    },
    role() {
      return this.$store.state.user.user.profile.role
    }
  },
  methods: {
    async createDepartment() {
      this.creating = true
      this.error = false
      const payload = { name: this.name }
      await this.$store
        .dispatch('information/postDep', payload)
        .then(() => {
          this.name = ''
          this.error = false
        })
        .catch(() => {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 10000)
        })
        .finally(() => {
          this.creating = false
        })
    }
  },
  async mounted() {
    await this.$store
      .dispatch('information/getDepartments')
      .then(() => this.got++)
  },
  head: {
    title: 'School | Departments'
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

.w3-content {
  max-width: 600px;
}

form {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid black;
}

.w3-button {
  width: 100%;
}

article {
  margin: 20px 0px;
}
</style>
