<template>
  <div>
    <!---
    <nav>
      <div>
        <div
          @click="
            $router.push('/dashboard/profile')
            showLinks = false
          "
          class="main"
        >
          <img id="user-img" :src="photo" />
          <span>{{ fullname }}</span>
        </div>
      </div>
      <div class="toggle" @click="showLinks = !showLinks">
        <i class="fas fa-bars" v-if="!showLinks"></i>
        <i class="fas fa-times" v-else></i>
      </div>
      <div id="links" :class="{ 'w3-show': showLinks }" class="w3-animate-top">
        <button
          @click="
            $router.push('/dashboard')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'index' }"
        >
          <i class="fas fa-home"></i> Home
        </button>
        <button
          @click="
            $router.push('/dashboard/departments')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'departments' }"
        >
          <i class="fas fa-school"></i> Departments
        </button>
        <button
          @click="
            $router.push('/dashboard/sections')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'sections' }"
        >
          <i class="fas fa-building"></i> Sections
        </button>
        <button
          @click="
            $router.push('/dashboard/subjects')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'subjects' }"
        >
          <i class="fas fa-percentage"></i> Subjects
        </button>
        <button
          @click="
            $router.push('/dashboard/students')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'students' }"
        >
          <i class="fas fa-portrait"></i> Students
        </button>
        <button
          @click="
            $router.push('/dashboard/cards')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'cards' }"
        >
          <i class="fas fa-id-card"></i> Cards
        </button>
        <button
          @click="
            $router.push('/dashboard/sheets')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'sheets' }"
        >
          <i class="fas fa-file-excel"></i> Grading Sheets
        </button>
        <button
          @click="
            $router.push('/login')
            showLinks = false
          "
          class="w3-button"
        >
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
    -->
    <nav>
      <nuxt-link to="/" class="home"
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
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  transition: 'page',
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

nav a:first-child {
  font-family: 'Nunito';
}
</style>
