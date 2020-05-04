<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>Student Account Creation Permissions</h1>
        <p>
          This page can only be accessed by the admins. Before the students of
          the school create an account on the system, an admin must provide a
          permission for them, first.
        </p>
      </div>
    </header>
    <div v-if="got < 2">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div v-else>
      <article class="w3-container">
        <form @submit.prevent="createPermission" class="w3-content">
          <h2><i class="fas fa-plus-circle"></i> Create permisson</h2>
          <div class="inpt">
            <label>Section:</label>
            <select v-model="sec" :disabled="creating" required>
              <option v-for="sec in sections" :value="sec.name" :key="sec.id">{{
                sec.name
              }}</option>
            </select>
          </div>
          <div class="inpt">
            <label>Code:</label>
            <input type="text" v-model="code" :disabled="creating" required />
          </div>
          <hr />
          <p class="w3-center w3-text-red w3-small" v-show="error">
            Something was wrong. Perhaps, there is already a permission that
            holds the code you gave. Please, provide a unique code.
          </p>
          <button
            type="submit"
            :disabled="creating"
            class="w3-button w3-green w3-round"
          >
            <span v-if="creating"
              ><i class="fas fa-spinner w3-spin"></i> Creating...</span
            >
            <span v-else>Create Permission</span>
          </button>
        </form>
      </article>
      <article class="w3-container">
        <div class="w3-content">
          <div v-if="permissions.length === 0" class="w3-center">
            <h4>There is no permission yet.</h4>
          </div>
          <div v-else>
            <h2 class="w3-center">List of Permissions</h2>
            <student-permission
              v-for="perm in permissions"
              :perm="perm"
              :key="perm.url"
            />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import StudentPermission from '~/components/StudentPermission.vue'

export default {
  layout: 'dashboard',
  middleware: 'isAdmin',
  components: { StudentPermission },
  data() {
    return {
      got: 0,
      creating: false,
      error: false,
      code: '',
      sec: ''
    }
  },
  computed: {
    permissions() {
      return this.$store.state.registration.permissions
    },
    sections() {
      return this.$store.state.information.sections
    }
  },
  methods: {
    async createPermission() {
      this.creating = true
      this.error = false
      const payload = {
        code: this.code,
        section: this.sec
      }
      await this.$store
        .dispatch('registration/createPerm', payload)
        .then(() => {
          this.code = ''
          this.sec = ''
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
      .dispatch('registration/retrievePerms')
      .then(() => this.got++)
    await this.$store.dispatch('information/getSections').then(() => this.got++)
  },
  head: {
    title: 'School | Student Permissions'
  }
}
</script>

<style scoped>
header {
  margin-top: 60px;
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
