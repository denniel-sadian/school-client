<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Permissions For Viewing The Grading Sheets</h1>
        <p>
          Both teachers and admins can view this page, but only the admins can
          modify the permissions.
        </p>
      </div>
    </header>
    <article class="w3-container" v-show="role === 'admin'">
      <form @submit.prevent="createPerm" class="w3-content">
        <h2><i class="fas fa-plus-circle"></i> Add a Permission</h2>
        <div class="inpt">
          <label>Permission Code:</label>
          <input type="text" v-model="code" required :disabled="creating" />
        </div>
        <div class="inpt">
          <label>For Section:</label>
          <select v-model="sec" required>
            <option v-for="s in sections" :value="s.url" :key="s.id">{{
              s.name
            }}</option>
          </select>
        </div>
        <hr />
        <p class="w3-center w3-text-red w3-small" v-show="error">
          The code and section must be a unique combination.
        </p>
        <button
          type="submit"
          :disabled="creating"
          class="w3-button w3-green w3-round"
        >
          <span v-if="creating"
            ><i class="fas fa-spinner w3-spin"></i> Adding...</span
          >
          <span v-else>Add Permission</span>
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
          <VPerm
            v-for="perm in permissions"
            :perm="perm"
            :secs="sections"
            :role="role"
            :key="perm.id"
          />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import VPerm from '~/components/VPerm.vue'

export default {
  components: {
    VPerm
  },
  data() {
    return {
      creating: false,
      error: false,
      code: '',
      sec: ''
    }
  },
  computed: {
    permissions() {
      return this.$store.state.information.permissions
    },
    sections() {
      return this.$store.state.information.sections
    },
    role() {
      return this.$store.state.user.user.profile.role
    }
  },
  methods: {
    async createPerm() {
      this.creating = true
      this.error = false
      await this.$axios
        .post('information/permissions/', {
          code: this.code,
          section: this.sec
        })
        .then(({ data }) => {
          this.code = ''
          this.sec = ''
          this.error = false
          this.$store.commit('information/PUSH_PERM', data)
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
    await this.$store.dispatch('information/getPerms')
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
