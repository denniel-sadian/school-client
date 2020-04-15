<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-center">
        <h1>Account Registration Permissions</h1>
        <p>
          This page can only be accessed by the admins. Before anyone creates an
          account, an admin must provide a permission first.
        </p>
      </div>
    </header>
    <article class="w3-container">
      <form
        @submit.prevent="createPermission"
        class="w3-content w3-round w3-border"
      >
        <h2><i class="fas fa-plus-circle"></i> Create permisson</h2>
        <div class="inpt">
          <label>Role:</label>
          <select v-model="role" required>
            <option value="admin">As an Admin</option>
            <option value="teacher">As a Teacher</option>
          </select>
        </div>
        <div class="inpt">
          <label>First Name:</label>
          <input type="text" v-model="fName" required />
        </div>
        <div class="inpt">
          <label>Last Name:</label>
          <input type="text" v-model="lName" required />
        </div>
        <div class="inpt">
          <label>Gender:</label>
          <select v-model="gender" required>
            <option value="f">Female</option>
            <option value="m">Male</option>
          </select>
        </div>
        <div class="inpt">
          <label>Code:</label>
          <input type="text" v-model="code" required />
        </div>
        <div class="inpt">
          <label>Department:</label>
          <select v-model="dep" required>
            <option v-for="dep in departments" :value="dep.id" :key="dep.id">{{
              dep.name
            }}</option>
          </select>
        </div>
        <hr />
        <p class="w3-center w3-text-red w3-small" v-show="error">
          Something was wrong. Perhaps, there is already a permission that holds
          the code you gave. Please, provide a unique code.
        </p>
        <button type="submit" :disabled="creating" class="w3-button w3-green w3-round">
          <span v-if="creating"
            ><i class="fas fa-spinner w3-spin"></i> Creating</span
          >
          <span v-else>Create Permission</span>
        </button>
      </form>
    </article>
    <article class="w3-container">
      <p v-if="loadingPerms" class="w3-center">
        <i class="fas fa-spinner w3-spin"></i>
      </p>
      <div v-else class="w3-content">
        <div v-if="permissions.length === 0" class="w3-center">
          <h4>There are no permissions yet.</h4>
        </div>
        <div v-else>
          <RegPerm v-for="perm in permissions" :perm="perm" :key="perm.id" />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import RegPerm from '~/components/RegPerm.vue'

export default {
  middleware: 'isAdmin',
  components: { RegPerm },
  data() {
    return {
      loadingPerms: true,
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
        role: this.role,
        first_name: this.fName,
        last_name: this.lName,
        gender: this.gender,
        department: this.dep
      }
      await this.$axios
        .post('accounts/permissions/', payload)
        .then(({ data }) => {
          this.$store.commit('user/PUSH_PERM', data)
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
    await this.$store.dispatch('user/getPerms').then(() => {
      this.loadingPerms = false
    })
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

.inpt {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 16px;
}

.inpt label {
  font-size: 12px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}

.inpt input,
.inpt select {
  border-radius: 4px;
  border: 1px solid gray;
  height: 40px;
  transition: 0.3s;
  padding: 0px 8px;
  background: white;
}

form {
  padding: 16px;
}

.w3-button {
  width: 100%;
}

article {
  margin: 20px 0px;
}
</style>
