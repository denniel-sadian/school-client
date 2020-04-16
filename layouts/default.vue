<template>
  <div>
    <nav>
      <div>
        <div
          @click="
            $router.push('/profile')
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
            $router.push('/')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'index' }"
        >
          <i class="fas fa-home"></i> Home
        </button>
        <button
          @click="
            $router.push('/departments')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'departments' }"
        >
          <i class="fas fa-school"></i> Departments
        </button>
        <button
          @click="
            $router.push('/sections')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'sections' }"
        >
          <i class="fas fa-building"></i> Sections
        </button>
        <button
          @click="
            $router.push('/students')
            showLinks = false
          "
          class="w3-button"
          :class="{ current: pageName === 'students' }"
        >
          <i class="fas fa-portrait"></i> Students
        </button>
        <button
          @click="
            $router.push('/sheets')
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

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-family: 'Nunito';
}
</style>

<style scoped>
nav {
  position: fixed;
  top: 0px;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 8px;
  background: #f1f1f1;
}

nav {
  text-decoration: none;
  font-family: 'Nunito';
}

nav .main {
  display: flex;
  align-items: center;
  font-weight: 800;
  cursor: pointer;
}

nav .main #user-img {
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 100%;
  background: #9e9e9e;
  object-fit: cover;
}

nav .main span {
  padding: 0px 18px 0px 8px;
  text-transform: uppercase;
  font-weight: 800;
}

#links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

#links button {
  padding: 0px 16px;
  margin: 0px 4px;
  border: 1px solid #f1f1f1;
  color: #9e9e9e;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 32px;
}

#links button i {
  margin-right: 8px;
}

#links button:hover {
  border: 1px solid #9e9e9e;
  background: #fff !important;
  transition: 0.3s;
}

nav .toggle {
  width: 40px;
  height: 40px;
  background: #f1f1f1;
  border-radius: 100%;
  display: none;
  cursor: pointer;
}

@media (max-width: 1045px) {
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

  #links {
    flex-direction: column;
    display: none;
  }

  #links button {
    margin: 0px;
    height: 30px;
    background: #f1f1f1;
    border: none;
    border-radius: unset;
    width: 100%;
    height: 40px;
    color: black;
    border: 1px solid #f1f1f1;
  }
}

.current {
  background: #fff;
  border: 1px solid black !important;
  color: black !important;
}
</style>
