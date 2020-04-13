<template>
  <div>
    <nav>
      <a href="#">
        <div class="main">
          <div id="user-img"></div>
          <span>Denniel luis Sadian</span>
        </div>
      </a>
      <div class="toggle" @click="showLinks = !showLinks"></div>
      <div id="links" :class="{ 'w3-show': showLinks }" class="w3-animate-top">
        <a href="#">Departments</a>
        <a href="#">Sections</a>
        <a href="#">Students</a>
        <a href="#">Permissions</a>
        <a href="#">Grading Sheets</a>
        <a @click="logout">Logout</a>
      </div>
    </nav>
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      showLinks: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
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
  height: unset;
  padding: unset;
  margin: unset;
}
</style>

<style scoped>
body {
  padding-top: 53px;
}

nav {
  position: fixed;
  top: 0px;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 8px;
  background: #f1f1f1;
}

nav a {
  text-decoration: none;
}

nav .main {
  display: flex;
  align-items: center;
}

nav .main #user-img {
  min-width: 40px;
  min-height: 40px;
  border-radius: 100%;
  background: #9e9e9e;
}

nav .main span {
  padding: 0px 18px 0px 8px;
}

nav > div:last-child {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

nav > div:last-child > a {
  padding: 0px 16px;
  margin: 0px 4px;
  border: 1px solid #f1f1f1;
  color: #9e9e9e;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 32px;
}

nav > div:last-child > a:hover {
  border: 1px solid #9e9e9e;
  background: #fff;
  color: black;
  transition: 0.3s;
}

nav .toggle {
  width: 40px;
  height: 40px;
  background: #f1f1f1;
  border: 1px solid #9e9e9e;
  border-radius: 100%;
  display: none;
  cursor: pointer;
}

@media (max-width: 900px) {
  nav {
    display: flex;
    flex-direction: column;
    padding: 0px;
  }

  nav .main {
    display: inline-flex;
    margin: 8px 0px 0px 8px;
  }

  nav .toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  nav > div:last-child {
    flex-direction: column;
    display: none;
  }

  nav > div:last-child > a {
    margin: 0px;
    height: 30px;
    background: #f1f1f1;
    border: none;
    border-radius: unset;
    width: 100%;
    height: 40px;
    justify-content: center;
    color: black;
    border: 1px solid #f1f1f1;
  }

  nav > div:last-child > a:hover {
    background: #fff;
  }
}
</style>
