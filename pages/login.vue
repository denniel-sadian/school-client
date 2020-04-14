<template>
  <header>
    <div>
      <h2>Credentials</h2>
      <p class="w3-small w3-center">Please, enter your credentials to login.</p>
      <hr />
      <div class="inpt">
        <label for="username">Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div class="inpt">
        <label for="password">Password:</label>
        <input type="password" @keypress.enter="login()" v-model="password" />
      </div>
      <p class="w3-small w3-text-green w3-center" v-show="disabled">
        Logging in...
      </p>
      <p class="w3-small w3-text-red w3-center" v-show="no_such_account">
        Wrong credentials.
      </p>
      <hr />
      <button
        @click="login"
        :disabled="disabled"
        class="w3-button w3-light-green"
      >
        Login
      </button>
      <div class="or">
        <hr />
        <span>Or</span>
        <hr />
      </div>
      <nuxt-link
        to="/registration/check-code"
        class="w3-button w3-light-blue"
        :disabled="disabled"
      >
        Register
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  layout: 'full_height_body',
  data() {
    return {
      username: '',
      password: '',
      no_such_account: false,
      disabled: false
    }
  },
  methods: {
    async login() {
      if (!this.username || !this.password) return
      this.disabled = true
      this.no_such_account = false
      await this.$store
        .dispatch('user/login', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
          this.no_such_account = true
          this.disabled = false
          setInterval(() => {
            this.no_such_account = false
          }, 5000)
        })
    }
  }
}
</script>
