<template>
  <header>
    <div class="w3-animate-zoom">
      <h2>Registration</h2>
      <hr />
      <form @submit.prevent="register">
        <div class="inpt">
          <label>Who are you?</label>
          <select v-model="student" :disabled="disabled" required>
            <option v-for="s in students" :value="s.id" :key="s.id"
              >{{ s.first_name }} {{ s.last_name }}</option
            >
          </select>
        </div>
        <div class="inpt">
          <label>Username:</label>
          <input type="text" v-model="username" :disabled="disabled" required />
        </div>
        <div class="inpt">
          <label>Email:</label>
          <input type="email" v-model="email" :disabled="disabled" required />
        </div>
        <div class="inpt">
          <label>Password:</label>
          <input
            type="password"
            v-model="password"
            :disabled="disabled"
            required
          />
        </div>
        <div class="inpt">
          <label>Password Again:</label>
          <input
            type="password"
            v-model="password1"
            :disabled="disabled"
            required
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
  middleware: 'studentHasPermissionToRegister',
  layout: 'full_height_body',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password1: '',
      student: 0,
      registering: false,
      wrong: false,
      disabled: false
    }
  },
  computed: {
    students() {
      return this.$store.state.registration.notRegisteredStudents
    },
    code() {
      return this.$store.state.registration.sectionCode
    }
  },
  methods: {
    async register() {
      if (this.username && this.email && this.password && this.password1) {
        if (this.password !== this.password1) {
          this.wrong = true
          return
        }
        this.registering = true
        this.disabled = true
        this.wrong = false
        const payload = {
          code: this.code,
          username: this.username,
          email: this.email,
          password: this.password,
          student: this.student
        }
        await this.$axios
          .post('accounts/student-register/', payload)
          .then(async (res) => {
            await this.$store
              .dispatch('user/login', {
                username: this.username,
                password: this.password
              })
              .then(() => {
                this.$router.push('/exams')
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
