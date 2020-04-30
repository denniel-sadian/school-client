<template>
  <div>
    <nav>
      <nuxt-link to="/" class="home"
        ><img src="/icon.png" /> Grading System</nuxt-link
      >
      <nuxt-link v-show="showLinks" to="/" class="s"
        ><i class="fas fa-info-circle"></i> About</nuxt-link
      >
      <nuxt-link v-show="showLinks" to="/login" class="s"
        ><i class="fas fa-sign-in-alt"></i> Sign In</nuxt-link
      >
      <nuxt-link v-show="showLinks" to="/registration/check-code" class="s"
        ><i class="fas fa-user-plus"></i> Sign Up</nuxt-link
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
  transition: 'page',
  data() {
    return { showLinks: true }
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

nav {
  background: #ebf7e3;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  position: fixed;
  top: 0px;
  width: 100%;
}

nav img {
  max-width: 45px;
  max-height: 45px;
  min-width: 45px;
  min-height: 45px;
}

nav a {
  margin: 8px;
  text-decoration: none;
  font-family: 'Nunito';
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  transition: 0.3s;
}

nav a > *:first-child {
  margin-right: 4px;
}

.home {
  font-size: 20px;
  font-weight: 800;
  font-family: 'Courier New', Courier, monospace;
}

.s {
  padding: 0px 16px;
}

.s:hover {
  background: #9bd770;
  border-radius: 32px;
}

#nav-toggle {
  display: none;
  position: absolute;
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

@media screen and (max-width: 650px) {
  nav {
    grid-template-columns: 100%;
  }

  #nav-toggle {
    display: block;
  }
}
</style>
