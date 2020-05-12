<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Announcements</h1>
        <p>
          Both admins and teachers can view this page. Both of them can create
          thier own announcements as well, but they can only delete the
          announcements they created.
        </p>
      </div>
    </header>
    <div v-if="!doneLoading">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div v-else>
      <article class="w3-container">
        <form @submit.prevent="createAnn" class="w3-content">
          <h2><i class="fas fa-plus-circle"></i> Add an Announcement</h2>
          <div class="inpt">
            <label>Message:</label>
            <textarea v-model="message" :disabled="creating"></textarea>
          </div>
          <hr />
          <button
            type="submit"
            :disabled="creating"
            class="w3-button w3-green w3-round"
          >
            <span v-if="creating"
              ><i class="fas fa-spinner w3-spin"></i> Adding...</span
            >
            <span v-else>Add Announcement</span>
          </button>
        </form>
      </article>
      <article class="w3-container">
        {{ announcements }}
        <div class="w3-content">
          <div v-if="announcements.length === 0" class="w3-center">
            <h4>There is no announcement yet.</h4>
          </div>
          <div v-else>
            <h2 class="w3-center">Announcements</h2>
            <Announcement
              v-for="a in announcements"
              :announcement="a"
              :key="a.url"
            />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Announcement from '~/components/Announcement.vue'

export default {
  layout: 'dashboard',
  components: {
    Announcement
  },
  data() {
    return {
      doneLoading: false,
      creating: false,
      message: ''
    }
  },
  computed: {
    announcements() {
      return this.$store.state.information.announcements
    }
  },
  methods: {
    createAnn() {
      this.creating = true
      const payload = { message: this.message }
      this.$store.dispatch('information/postAnn', payload).finally(() => {
        this.creating = false
        this.message = ''
      })
    }
  },
  mounted() {
    this.$store
      .dispatch('information/getAnnouncements')
      .then(() => (this.doneLoading = true))
  },
  head: {
    title: 'School | Announcements'
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
