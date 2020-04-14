<template>
  <header>
    <div>
      <h2>Registration</h2>
      <p class="w3-small w3-center">
        Good day, <b>{{ addressing }} {{ fullname }}</b
        >! You have been permitted by admin {{ fromWho }} to register an account
        on the system.
      </p>
      <hr />
      <div class="inpt">
        <label>Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div class="inpt">
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>
      <div class="inpt">
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <div class="inpt">
        <label>Password Again:</label>
        <input type="password" v-model="password1" />
      </div>
      <p class="w3-small w3-text-green" v-show="registering">Registering...</p>
      <p class="w3-small w3-red" v-show="wrong">
        There was something wrong. Perhaps, your username is already taken or
        your passwords did not match.
      </p>
      <hr />
      <button @click="register" class="w3-button w3-light-green">
        Register
      </button>
      <div class="or">
        <hr />
        <span>Or</span>
        <hr />
      </div>
      <nuxt-link to="/login" class="w3-button w3-light-blue">Login</nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  middleware: 'hasPermissionToRegister',
  layout: 'full_height_body',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password1: '',
      registering: false,
      wrong: false
    }
  },
  computed: {
    creds() {
      return this.$store.state.registration.credentials
    },
    addressing() {
      if (this.creds.gender === 'f') return 'miss'
      return 'mister'
    },
    fullname() {
      return `${this.creds.first_name} ${this.creds.last_name}`
    },
    fromWho() {
      return `${this.creds.from_who.first_name} ${this.creds.from_who.last_name}`
    }
  },
  methods: {
    register() {
      if (this.username && this.email && this.password && this.password1) {
      }
    }
  }
}
</script>

<style scoped>
header > div {
  overflow-y: auto;
}
</style>
