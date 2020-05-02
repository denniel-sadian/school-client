<template>
  <div>
    <nav>
      <nuxt-link to="/dashboard/profile" class="home"
        ><img :src="photo" /> {{ fullname }}</nuxt-link
      >
      <nuxt-link
        to="/"
        :class="{ show: showLinks }"
        class="s w3-animate-top w3-text-orange"
        ><i class="fas fa-home"></i> Home</nuxt-link
      >
      <nuxt-link
        to="/dashboard"
        :class="{ show: showLinks }"
        class="s w3-animate-top w3-text-green"
        ><i class="fas fa-solar-panel"></i> Dashboard</nuxt-link
      >
      <nuxt-link
        to="/about"
        :class="{ show: showLinks }"
        class="s w3-animate-top w3-text-blue"
        ><i class="fas fa-info-circle"></i> About</nuxt-link
      >
      <nuxt-link
        to="/login"
        :class="{ show: showLinks }"
        class="s w3-animate-top w3-text-pink"
        ><i class="fas fa-sign-out-alt"></i> Sign Out</nuxt-link
      >
    </nav>
    <button id="nav-toggle" @click="showLinks = !showLinks">
      <i class="fas fa-bars" v-if="!showLinks"></i>
      <i class="fas fa-times" v-else></i>
    </button>
    <div class="page">
      <div class="content">
        <nuxt />
      </div>
      <Vfooter />
    </div>
  </div>
</template>

<script>
import Vfooter from '~/components/Vfooter.vue'

export default {
  middleware: 'auth',
  transition: 'page',
  components: { Vfooter },
  data() {
    return {
      showLinks: false
    }
  },
  computed: {
    pageName() {
      return this.$route.name
    },
    fullname() {
      if (this.$store.state.user.user) {
        const f = this.$store.state.user.user.user.first_name
        const l = this.$store.state.user.user.user.last_name
        return f + ' ' + l
      }
      return 'user'
    },
    photo() {
      if (this.$store.state.user.user) {
        if (this.$store.state.user.user.profile.photo !== null)
          return (
            'https://school.pythonanywhere.com' +
            this.$store.state.user.user.profile.photo
          )
        return '/anon_avatar.png'
      }
      return ''
    }
  },
  watch: {
    $route: function() {
      this.showLinks = false
    }
  },
  async mounted() {
    await this.$store.dispatch('user/getUser')
  }
}
</script>

<style scoped>
nav {
  grid-template-columns: 1fr repeat(8, auto);
}

nav img {
  border-radius: 100%;
  background: #9e9e9e;
}
</style>
