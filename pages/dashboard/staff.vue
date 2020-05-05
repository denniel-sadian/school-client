<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Staff</h1>
        <p>
          Both teachers and admins can view this page, but only the admins can
          deal with the staff.
        </p>
      </div>
    </header>
    <div v-if="got < 2">
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
          <div class="inpt">
            <label>Semester:</label>
            <select v-model="semFilter">
              <option value="1">First Semester</option>
              <option value="2">Second Semester</option>
            </select>
          </div>
          <div class="inpt">
            <label>Grading:</label>
            <select v-model="gradingFilter">
              <option value="prelim">Prelim</option>
              <option value="midterm">Midterm</option>
              <option value="finals">Finals</option>
            </select>
          </div>
          <div class="inpt">
            <label>Name:</label>
            <input type="text" v-model="nameFilter" />
          </div>
        </div>
        <p class="w3-small w3-text-green w3-center">
          {{ cards.length }} found.
        </p>
        <Card v-for="c in cards" :card="c" :key="c.url" />
        <div
          v-show="confirmDelete"
          class="w3-container w3-center w3-khaki w3-round w3-padding w3-margin-bottom w3-animate-opacity"
        >
          <div v-if="!deleting">
            <h2>
              <i class="fas fa-exclamation-triangle w3-text-red"></i> Warning!
            </h2>
            <p>
              Are you sure, you want to delete all of the cards listed above?
              Doing so will not bring them back, of course. However, you can
              always tell the other teachers to publish their grading sheets to
              create the cards again.
            </p>
            <hr />
            <button
              @click="deleteAllListed"
              class="w3-button w3-red w3-round w3-margin-top"
            >
              Yes, I understand.
            </button>
            <button
              @click="confirmDelete = false"
              class="w3-button w3-green w3-round w3-margin-top"
            >
              No, take me back.
            </button>
          </div>
          <div v-else>
            <h1><i class="fas fa-spinner w3-spin w3-text-yellow"></i></h1>
          </div>
        </div>
        <hr />
        <div
          v-show="cards.length !== 0 && !confirmDelete && anAdmin"
          class="del w3-center"
        >
          <p>
            You should only be deleting cards at the end of the school year.
          </p>
          <button
            @click="confirmDelete = true"
            class="w3-button w3-red w3-round w3-animate-opacity"
          >
            Delete all cards listed above
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card.vue'

export default {
  layout: 'dashboard',
  components: { Card },
  data() {
    return {
      got: 0,
      secFilter: '',
      semFilter: '1',
      gradingFilter: 'prelim',
      nameFilter: '',

      confirmDelete: false,
      deleting: false,
      toDelete: 0,
      deleted: 0
    }
  },
  computed: {
    anAdmin() {
      return this.$store.state.user.user.profile.role === 'admin'
    },
    sections() {
      return this.$store.state.information.sections
    },
    cards() {
      return this.$store.state.grading.cards
        .filter((c) => {
          if (this.secFilter) return c.student.section.url === this.secFilter
          else return true
        })
        .filter((c) => {
          if (this.semFilter) return c.sem === this.semFilter
          else return true
        })
        .filter((c) => {
          if (this.gradingFilter) return c.grading === this.gradingFilter
          else return true
        })
        .filter((c) => {
          if (this.nameFilter)
            return `${c.student.first_name} ${c.student.last_name}`
              .toLowerCase()
              .includes(this.nameFilter.toLowerCase())
          else return true
        })
    }
  },
  watch: {
    deleted(v) {
      if (v === this.toDelete) {
        this.deleting = false
        this.confirmDelete = false
        this.toDelete = 0
        this.deleted = 0
      }
    }
  },
  methods: {
    async deleteAllListed() {
      this.deleting = true
      this.toDelete = this.cards.length
      await this.cards.forEach(
        async (c) =>
          await this.$store
            .dispatch('grading/deleteCard', c.url)
            .then(() => this.deleted++)
      )
    }
  },
  async mounted() {
    await this.$store.dispatch('grading/retrieveCards').then(() => this.got++)
    await this.$store.dispatch('information/getSections').then(() => this.got++)
    this.secFilter = this.sections[0].url
  },
  head: {
    title: 'School | Cards'
  }
}
</script>

<style scoped>
header {
  margin-top: 60px;
  padding: 64px 0px !important;
  text-align: center;
}

.w3-content {
  max-width: 600px;
}

form {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid black;
}

.del {
  width: 100%;
  margin: 64px 0px;
}

article {
  margin: 20px 0px;
}
</style>
