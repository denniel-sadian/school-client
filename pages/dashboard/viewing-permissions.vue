<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Card Viewing Permissions</h1>
        <p>
          Both teachers and admins can modify the permissions.
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
        <form @submit.prevent="createPerm" class="w3-content">
          <h2><i class="fas fa-plus-circle"></i> Add a Permission</h2>
          <div class="inpt">
            <label>For Section:</label>
            <select v-model="section" :disabled="creating" required>
              <option v-for="s in sections" :value="s.url" :key="s.id">{{
                s.name
              }}</option>
            </select>
          </div>
          <div class="inpt">
            <label>Permission Code:</label>
            <input
              type="text"
              v-model="code"
              maxlength="50"
              required
              :disabled="creating"
            />
          </div>
          <hr />
          <p class="w3-center w3-text-red w3-small" v-show="error">
            The section and permission should be unique together.
          </p>
          <button
            type="submit"
            :disabled="creating"
            class="w3-button w3-green w3-round"
          >
            <span v-if="creating"
              ><i class="fas fa-spinner w3-spin"></i> Adding...</span
            >
            <span v-else>Add This Permission</span>
          </button>
        </form>
      </article>
      <article class="w3-container">
        <div class="w3-content">
          <div v-if="perms.length === 0" class="w3-center">
            <h4>There is no permission yet.</h4>
          </div>
          <div v-else>
            <h2 class="w3-center">List of Permissions</h2>
            <VPerm
              v-for="p in perms"
              :perm="p"
              :sections="sections"
              :key="p.id"
            />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import VPerm from '~/components/VPerm.vue'

export default {
  layout: 'dashboard',
  components: {
    VPerm
  },
  data() {
    return {
      got: 0,
      creating: false,
      error: false,
      section: '',
      code: ''
    }
  },
  computed: {
    sections() {
      return this.$store.state.information.sections
    },
    perms() {
      return this.$store.state.grading.permissions
    }
  },
  methods: {
    async createPerm() {
      this.creating = true
      this.error = false
      const payload = {
        code: this.code,
        section: this.section
      }
      await this.$store
        .dispatch('grading/createPerm', payload)
        .then(() => {
          this.section = ''
          this.code = ''
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
    await this.$store.dispatch('information/getSections').then(() => this.got++)
    await this.$store.dispatch('grading/retrievePerms').then(() => this.got++)
  },
  head: {
    title: 'School | Viewing Permissions'
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
