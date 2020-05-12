<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1><i class="fas fa-bullhorn"></i> Announcements</h1>
      </div>
    </header>
    <div v-if="!doneLoading">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div v-else>
      <article class="w3-container">
        <div class="w3-content">
          <div v-if="announcements.length === 0" class="w3-center">
            <h4>There is no announcement yet.</h4>
          </div>
          <div v-else>
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
  layout: 'student',
  components: {
    Announcement
  },
  data() {
    return { doneLoading: false }
  },
  computed: {
    announcements() {
      return this.$store.state.information.announcements
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
