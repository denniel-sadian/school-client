<template>
  <header>
    <div class="w3-animate-zoom">
      <h2>Credentials</h2>
      <p class="w3-small w3-center">Please, enter your credentials to login.</p>
      <hr />
      <form @submit.prevent="login">
        <div class="inpt">
          <label for="username">Username:</label>
          <input type="text" v-model="username" :disabled="disabled" />
        </div>
        <div class="inpt">
          <label for="password">Password:</label>
          <input
            type="password"
            @keypress.enter="login()"
            v-model="password"
            :disabled="disabled"
          />
        </div>
        <p class="w3-small w3-text-red w3-center" v-show="no_such_account">
          Wrong credentials.
        </p>
        <hr />
        <button
          type="submit"
          :disabled="disabled"
          class="w3-button w3-light-green"
        >
          <span v-if="disabled"
            ><i class="fas fa-spinner w3-spin"></i> Logging in...</span
          >
          <span v-else>Login</span>
        </button>
        <div class="or">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <button
          @click="$router.push('/registration/check-code')"
          class="w3-button w3-light-blue"
          :disabled="disabled"
        >
          Register
        </button>
      </form>
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
  },
  mounted() {
    this.$store.dispatch('user/logout')
  },
  head: {
    title: 'School | Login'
  }
}
</script>

<style scoped>
header {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

header > div {
  border: 1.5px solid #9e9e9e;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  padding: 16px;
}

header h2 {
  text-align: center;
  font-family: 'Nunito' !important;
}

.w3-button {
  width: 100%;
  border-radius: 4px;
}
</style>
