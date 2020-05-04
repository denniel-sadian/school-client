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
            <label>Role:</label>
            <select v-model="role" :disabled="creating" required>
              <option value="admin">As an Admin</option>
              <option value="teacher">As a Teacher</option>
            </select>
          </div>
          <div class="inpt">
            <label>First Name:</label>
            <input type="text" v-model="fName" :disabled="creating" required />
          </div>
          <div class="inpt">
            <label>Last Name:</label>
            <input type="text" v-model="lName" :disabled="creating" required />
          </div>
          <div class="inpt">
            <label>Gender:</label>
            <select v-model="gender" :disabled="creating" required>
              <option value="f">Female</option>
              <option value="m">Male</option>
            </select>
          </div>
          <div class="inpt">
            <label>Code:</label>
            <input type="text" v-model="code" :disabled="creating" required />
          </div>
          <div class="inpt">
            <label>Department:</label>
            <select v-model="dep" :disabled="creating" required>
              <option
                v-for="dep in departments"
                :value="dep.id"
                :key="dep.id"
                >{{ dep.name }}</option
              >
            </select>
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
            <RegPerm
              v-for="perm in permissions"
              :perm="perm"
              :deps="departments"
              :key="perm.id"
            />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import RegPerm from '~/components/RegPerm.vue'

export default {
  layout: 'dashboard',
  middleware: 'isAdmin',
  components: { RegPerm },
  data() {
    return {
      got: 0,
      creating: false,
      error: false,
      role: '',
      fName: '',
      lName: '',
      gender: '',
      code: '',
      dep: ''
    }
  },
  computed: {
    permissions() {
      return this.$store.state.user.permissions
    },
    departments() {
      return this.$store.state.information.departments
    }
  },
  methods: {
    async createPermission() {
      this.creating = true
      this.error = false
      const payload = {
        code: this.code,
        role: this.role,
        first_name: this.fName,
        last_name: this.lName,
        gender: this.gender,
        department: this.dep
      }
      await this.$store
        .dispatch('user/postPerm', payload)
        .then(() => {
          this.code = ''
          this.role = ''
          this.fName = ''
          this.lName = ''
          this.gender = ''
          this.dep = ''
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
    await this.$store.dispatch('user/getPerms').then(() => this.got++)
    await this.$store
      .dispatch('information/getDepartments')
      .then(() => this.got++)
  },
  head: {
    title: 'School | Registration Permissions'
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
