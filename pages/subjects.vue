<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Subjects</h1>
        <p>Both teachers and admins can view and modify the subjects.</p>
      </div>
    </header>
    <article class="w3-container">
      <div class="w3-content">
        <button
          @click="showForm = true"
          v-show="!showForm"
          class="w3-button w3-light-green w3-round"
        >
          Show Form
        </button>
        <form
          @submit.prevent="createSubject"
          v-show="showForm"
          class="w3-content w3-animate-top"
        >
          <h2><i class="fas fa-plus-circle"></i> Add a Subject</h2>
          <div class="inpt">
            <label>Subject Name:</label>
            <input type="text" v-model="name" required :disabled="creating" />
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
          <button
            class="w3-button w3-round w3-pink w3-margin-top"
            @click="showForm = false"
          >
            Hide Form
          </button>
        </form>
      </div>
    </article>
    <article class="w3-container">
      <div class="w3-content">
        <div v-if="subjects.length === 0" class="w3-center">
          <h4>There is no subject yet.</h4>
        </div>
        <div v-else>
          <h2 class="w3-center">List of Subjects</h2>
          <Subject v-for="s in subjects" :subj="s" :key="s.id" />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Subject from '~/components/Subject.vue'

export default {
  components: { Subject },
  data() {
    return {
      creating: false,
      error: false,
      showForm: false,
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
      await this.$axios
        .post('information/subjects/', { name: this.name })
        .then(({ data }) => {
          this.name = ''
          this.$store.commit('information/PUSH_SUBJECT', data)
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
    await this.$store.dispatch('information/getSubjects')
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
