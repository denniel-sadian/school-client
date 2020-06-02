<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Subjects</h1>
        <p>Both teachers and admins can view and modify the subjects.</p>
      </div>
    </header>
    <div v-if="got < 1">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div v-else>
      <article class="w3-container">
        <form
          @submit.prevent="createSubject"
          class="w3-animate-zoom w3-content"
        >
          <h2><i class="fas fa-plus-circle"></i> Add a Subject</h2>
          <div class="inpt">
            <label>Subject Name:</label>
            <input
              type="text"
              v-model="name"
              maxlength="50"
              required
              :disabled="creating"
            />
          </div>
          <hr />
          <p class="w3-center w3-text-red w3-small" v-show="error">
            Please provide a unique subject name.
          </p>
          <button
            type="submit"
            :disabled="creating"
            class="w3-button w3-green w3-round"
          >
            <span v-if="creating"
              ><i class="fas fa-spinner w3-spin"></i> Adding...</span
            >
            <span v-else>Add This Subject</span>
          </button>
        </form>
      </article>
      <article class="w3-container">
        <div class="w3-content">
          <div v-if="subjects.length === 0" class="w3-center">
            <h4>There is no subject yet.</h4>
          </div>
          <div v-else>
            <h2 class="w3-center">List of Subjects</h2>
            <div v-for="s in subjects" :key="s.id">
              <Subject
                v-if="!s.name.toLowerCase().includes('mapeh (')"
                :subj="s"
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Subject from '~/components/Subject.vue'

export default {
  layout: 'dashboard',
  components: { Subject },
  data() {
    return {
      got: 0,
      creating: false,
      error: false,
      name: ''
    }
  },
  computed: {
    subjects() {
      return this.$store.state.information.subjects
    }
  },
  methods: {
    async createSubject() {
      this.creating = true
      this.error = false
      const payload = { name: this.name }
      await this.$store
        .dispatch('information/postSub', payload)
        .then(() => {
          this.name = ''
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
    await this.$store.dispatch('information/getSubjects').then(() => this.got++)
  },
  head: {
    title: 'School | Subjects'
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
