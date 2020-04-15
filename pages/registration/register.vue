<template>
  <header>
    <div class="w3-animate-zoom">
      <h2>Registration</h2>
      <p class="w3-small w3-center">
        Good day, <b>{{ addressing }} {{ fullname }}</b
        >! You have been permitted by admin {{ fromWho }} to register for
        {{ creds.role === 'admin' ? "an admin's" : "a teacher's" }} account on
        the system.
        <span class="w3-opacity"
          >Not you?
          <nuxt-link class="w3-text-blue" to="/registration/check-code"
            >Go back</nuxt-link
          >.</span
        >
      </p>
      <hr />
      <div class="inpt">
        <label>Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div class="inpt">
        <label>ID Number:</label>
        <input type="text" v-model="idNumber" />
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
        <input type="password" v-model="password1" @keypress.enter="register" />
      </div>
      <p class="w3-small w3-text-red w3-center" v-show="wrong">
        There was something wrong. Perhaps, your username is already taken or
        your passwords did not match.
      </p>
      <hr />
      <button
        @click="register"
        :disabled="disabled"
        class="w3-button w3-light-green"
      >
        <span v-if="registering">
          <i class="fas fa-spinner w3-spin"></i> Registering...
        </span>
        <span v-else>Register</span>
      </button>
      <div class="or">
        <hr />
        <span>Or</span>
        <hr />
      </div>
      <button
        :disabled="disabled"
        @click="$router.push('/login')"
        class="w3-button w3-light-blue"
      >
        Login
      </button>
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
      idNumber: '',
      email: '',
      password: '',
      password1: '',
      registering: false,
      wrong: false,
      disabled: false
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
    async register() {
      if (
        this.username &&
        this.idNumber &&
        this.email &&
        this.password &&
        this.password1
      ) {
        this.registering = true
        this.disabled = true
        const payload = {
          code: this.creds.code,
          username: this.username,
          id_number: this.idNumber,
          email: this.email,
          password: this.password,
          password1: this.password1
        }
        await this.$axios
          .post('accounts/register/', payload)
          .then(async (res) => {
            await this.$store
              .dispatch('user/login', {
                username: this.username,
                password: this.password
              })
              .then(() => {
                this.$router.push('/')
              })
          })
          .catch(() => {
            this.wrong = true
            this.registering = false
            this.disabled = false
            setTimeout(() => {
              this.wrong = false
            }, 10000)
          })
      }
    }
  }
}
</script>

<style scoped>
header > div {
  overflow-y: auto;
}

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

.w3-button {
  width: 100%;
  border-radius: 4px;
}
</style>
