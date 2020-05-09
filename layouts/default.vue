<template>
  <div>
    <nav>
      <nuxt-link to="/"><img src="/icon.png" /> Grading System</nuxt-link>
      <nuxt-link
        to="/dashboard"
        v-if="isStaff"
        :class="{ show: showLinks && isStaff }"
        class="s w3-animate-top w3-text-green"
        ><i class="fas fa-solar-panel"></i> Dashboard</nuxt-link
      >
      <nuxt-link
        to="/exams"
        v-else-if="thereIsUser"
        :class="{ show: showLinks }"
        class="s w3-animate-top w3-text-green"
        ><i class="fas fa-pencil-alt"></i> Exams</nuxt-link
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
        class="s w3-animate-top w3-text-purple"
        ><i class="fas fa-sign-in-alt"></i> Sign In</nuxt-link
      >
      <nuxt-link
        to="/registration/check-code"
        :class="{ show: showLinks }"
        class="s w3-animate-top w3-text-pink"
        ><i class="fas fa-user-plus"></i> Sign Up</nuxt-link
      >
      <button id="nav-toggle" @click="showLinks = !showLinks">
        <i class="fas fa-bars" v-if="!showLinks"></i>
        <i class="fas fa-times" v-else></i>
      </button>
    </nav>
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
  transition: 'page',
  components: { Vfooter },
  data() {
    return { showLinks: false }
  },
  computed: {
    thereIsUser() {
      return this.$store.state.user.user.hasOwnProperty('user')
    },
    isStaff() {
      if (this.thereIsUser)
        return this.$store.state.user.user.user.student === null
    }
  },
  watch: {
    $route: function() {
      this.showLinks = false
    }
  }
}
</script>

<style>
html,
body,
#__nuxt,
#__layout,
#__layout > div {
  height: 100vh;
  padding: 0px;
  margin: 0px;
}

.page {
  height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr auto;
}

.content {
  height: 100%;
}

nav {
  background: #ebf7e3;
  display: grid;
  grid-template-columns: 1fr repeat(4, auto);
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 1;
}

nav img {
  max-width: 45px;
  max-height: 45px;
  min-width: 45px;
  min-height: 45px;
  object-fit: cover;
}

nav > * {
  margin: 8px;
  text-decoration: none;
  font-family: 'Nunito';
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  transition: 0.3s;
}

nav * > *:first-child {
  margin-right: 8px;
}

nav > *:first-child {
  font-size: 20px;
  font-weight: 800;
  font-family: 'Roboto Slab', serif;
}

.s {
  padding: 0px 16px;
}

.s:hover {
  background: #fff;
  border-radius: 32px;
}

.show {
  display: inline-flex !important;
}

#nav-toggle {
  display: none;
  z-index: 1;
  max-width: 45px;
  max-height: 45px;
  min-width: 45px;
  min-height: 45px;
  top: 0px;
  right: 0px;
  margin: 8px 8px 0px 0px;
  border: none;
  background: none;
  position: fixed;
}

h2,
h3,
h4,
h5,
h6,
p {
  font-family: 'Nunito';
}

header h1 {
  text-transform: capitalize;
  font-family: 'Roboto Slab', serif;
}

@media screen and (max-width: 800px) {
  nav {
    grid-template-columns: 100% !important;
  }

  .s {
    display: none;
    height: 45px;
    margin: 0px;
    border-radius: 0px !important;
  }

  #nav-toggle {
    display: block;
  }
}
</style>
