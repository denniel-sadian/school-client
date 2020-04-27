<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Cards</h1>
        <p>
          Both teachers and admins can view this page, but only the teachers can
          modify the cards. The cards are automatically created, so teachers do
          not need to create them manually.
        </p>
      </div>
    </header>
    <div v-if="got < 1">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div class="w3-container" v-else>
      <div class="w3-content">
        <div class="w3-light-gray w3-round w3-border w3-border-gray w3-padding">
          <h3><i class="fas fa-filter"></i> Filter the Cards</h3>
          <div class="inpt">
            <label>Section:</label>
            <select v-model="secFilter" required>
              <option v-for="s in sections" :value="s.url" :key="s.id">{{
                s.name
              }}</option>
            </select>
          </div>
        </div>
        <Card v-for="c in cards" :card="c" :key="c.url" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card.vue'

export default {
  components: { Card },
  data() {
    return {
      got: 0,
      secFilter: ''
    }
  },
  computed: {
    cards() {
      return this.$store.state.grading.cards
    },
    sections() {
      return this.$store.state.information.sections
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
    await this.$store.dispatch('grading/retrieveCards').then(() => this.got++)
  },
  head: {
    title: 'School | Cards'
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
