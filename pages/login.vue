<template>
  <header>
    <div class="w3-animate-zoom">
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
      <p class="w3-small w3-text-red w3-center" v-show="no_such_account">
        Wrong credentials.
      </p>
      <hr />
      <button
        @click="login"
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
  border: 1px solid #9e9e9e;
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

.inpt {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 16px;
}

.inpt label {
  font-size: 12px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}

.inpt input {
  border-radius: 4px;
  border: 1px solid gray;
  height: 40px;
  transition: 0.3s;
  padding: 0px 8px;
}

.w3-button {
  width: 100%;
  border-radius: 4px;
}

.or {
  display: flex;
  align-items: center;
  padding: 8px 0px;
}

.or hr {
  width: 100%;
  margin: 0px;
  border: 0.5px solid gray;
}

.or span {
  padding: 0px 16px;
}
</style>
