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
    <div v-if="got < 1">
      <p class="w3-large w3-text-green w3-center">
        <i class="fas fa-spinner w3-spin"></i> Loading...
      </p>
    </div>
    <div class="w3-container" v-else>
      <div class="w3-content">
        <staff v-for="s in staff" :staff="s" :key="s.id" />
      </div>
    </div>
  </div>
</template>

<script>
import Staff from '~/components/Staff.vue'

export default {
  layout: 'dashboard',
  components: { Staff },
  data() {
    return {
      got: 0
    }
  },
  computed: {
    staff() {
      return this.$store.state.information.staff
    }
  },
  async mounted() {
    await this.$store.dispatch('information/getStaff').then(() => this.got++)
  },
  head: {
    title: 'School | Staff'
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
</style>
