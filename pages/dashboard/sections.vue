<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Sections</h1>
        <p>
          Both teachers and admins can view this page, but only the admins can
          modify the sections. If you are an admin, please refrain from deleting
          sections, especially if some objects are using them.
        </p>
      </div>
    </header>
    <div v-if="got < 2">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div v-else>
      <article class="w3-container" v-show="role === 'admin'">
        <form @submit.prevent="createSection" class="w3-content">
          <h2><i class="fas fa-plus-circle"></i> Add a Section</h2>
          <div class="inpt">
            <label>Section Name:</label>
            <input type="text" v-model="name" required :disabled="creating" />
          </div>
          <div class="inpt">
            <label>Department:</label>
            <select v-model="dep" required>
              <option v-for="d in departments" :value="d.url" :key="d.id">{{
                d.name
              }}</option>
            </select>
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
            <span v-else>Add This Section</span>
          </button>
        </form>
      </article>
      <article class="w3-container">
        <div class="w3-content">
          <div v-if="sections.length === 0" class="w3-center">
            <h4>There is no section yet.</h4>
          </div>
          <div v-else>
            <h2 class="w3-center">List of Sections</h2>
            <Section
              v-for="sec in sections"
              :sec="sec"
              :deps="departments"
              :role="role"
              :key="sec.id"
            />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Section from '~/components/Section.vue'

export default {
  layout: 'dashboard',
  components: {
    Section
  },
  data() {
    return {
      got: 0,
      creating: false,
      error: false,
      name: '',
      dep: ''
    }
  },
  computed: {
    departments() {
      return this.$store.state.information.departments
    },
    sections() {
      return this.$store.state.information.sections
    },
    role() {
      return this.$store.state.user.user.profile.role
    }
  },
  methods: {
    async createSection() {
      this.creating = true
      this.error = false
      const payload = {
        name: this.name,
        department: this.dep
      }
      await this.$store
        .dispatch('information/postSec', payload)
        .then(() => {
          this.name = ''
          this.dep = ''
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
    await this.$store.dispatch('information/getSections').then(() => this.got++)
  },
  head: {
    title: 'School | Sections'
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
