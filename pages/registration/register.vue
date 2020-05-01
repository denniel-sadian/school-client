<template>
  <header>
    <div class="w3-animate-zoom">
      <h2>Registration</h2>
      <p class="w3-small w3-center">
        Good day, <b>{{ addressing }} {{ fullname }}</b
        >! You have been permitted by admin {{ fromWho }} to register
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
      <form @submit.prevent="register">
        <div class="inpt">
          <label>Username:</label>
          <input type="text" v-model="username" :disabled="disabled" />
        </div>
        <div class="inpt">
          <label>ID Number:</label>
          <input type="text" v-model="idNumber" :disabled="disabled" />
        </div>
        <div class="inpt">
          <label>Email:</label>
          <input type="email" v-model="email" :disabled="disabled" />
        </div>
        <div class="inpt">
          <label>Photo: <span class="w3-opacity">Optional</span></label>
          <input type="file" ref="file" v-on:change="handleFileUpload" />
        </div>
        <div class="inpt">
          <label>Password:</label>
          <input type="password" v-model="password" :disabled="disabled" />
        </div>
        <div class="inpt">
          <label>Password Again:</label>
          <input
            type="password"
            v-model="password1"
            @keypress.enter="register"
            :disabled="disabled"
          />
        </div>
        <p class="w3-small w3-text-red w3-center" v-show="wrong">
          There was something wrong. Perhaps, your username is already taken or
          your passwords did not match.
        </p>
        <hr />
        <button
          type="submit"
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
      </form>
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
      file: '',
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
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
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
        let formData = new FormData()
        if (this.file !== '') formData.append('photo', this.file)
        formData.append('code', this.creds.code)
        formData.append('username', this.username)
        formData.append('id_number', this.idNumber)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('password1', this.password1)
        await this.$axios
          .post('accounts/register/', formData)
          .then(async (res) => {
            await this.$store
              .dispatch('user/login', {
                username: this.username,
                password: this.password
              })
              .then(() => {
                this.$router.push('/dashboard')
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
  },
  head: {
    title: 'School | Registration'
  }
}
</script>

<style scoped>
header > div {
  overflow-y: auto;
  margin-top: 60px;
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
