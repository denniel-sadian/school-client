<template>
  <div>
    <header class="w3-container">
      <div id="profile-header">
        <div id="profile-photo">
          <img :src="photo" alt="Avatar" />
        </div>
        <div id="profile-info">
          <h1>{{ fullName }}</h1>
          <p>
            <strong>@{{ user.username }}</strong>
          </p>
          <p v-if="profile.role === 'admin'">
            Your role is one of the admins of this system.
          </p>
          <p v-else>Your role is a teacher.</p>
        </div>
      </div>
    </header>
    <article class="w3-container">
      <div class="w3-content"></div>
    </article>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      updated: false,
      updating: false,
      error: false,
      password: '',
      password1: '',
      password2: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user.user
    },
    fullName() {
      return `${this.user.student.first_name} ${this.user.student.last_name}`
    },
    photo() {
      if (this.user.student.photo !== null)
        return 'https://school.pythonanywhere.com/' + this.user.student.photo
      return '/anon_avatar.png'
    }
  },
  methods: {
    async updatePassword() {
      this.updatingPassword = true
      this.errorPassword = false
      const payload = {
        password: this.password,
        password1: this.password1,
        password2: this.password2
      }
      await this.$axios
        .put('accounts/change-password/', payload)
        .then(() => {
          this.errorPassword = false
          this.updatedPassword = true
          this.password = ''
          this.password1 = ''
          this.password2 = ''
          setTimeout(() => {
            this.updatedPassword = false
          }, 10000)
        })
        .catch(() => {
          this.errorPassword = true
          this.updatingPassword = false
          this.updatedPassword = false
          setTimeout(() => {
            this.errorPassword = false
          }, 10000)
        })
        .finally(() => (this.updatingPassword = false))
    }
  },
  async mounted() {},
  head: {
    title: 'School | Me'
  }
}
</script>

<style scoped>
header {
  margin-top: 60px;
  padding: 64px 0px;
}

.w3-content {
  max-width: 500px;
  padding: 16px 0px;
}

#profile-header {
  display: flex;
  justify-content: center;
}
#profile-photo,
#profile-info {
  display: flex;
}
#profile-photo img {
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;
  border-radius: 100%;
  object-fit: cover;
  border: 2px solid #9e9e9e;
}
#profile-info {
  padding: 16px;
  justify-content: center;
  flex-direction: column;
}
#profile-info h1 {
  font-weight: 800;
}
#profile-info h1,
#profile-info p {
  margin: 0px;
}

.w3-button {
  width: 100%;
  border-radius: 4px;
}

.or {
  margin: 64px 0px;
}

@media (max-width: 900px) {
  #profile-header {
    flex-direction: column;
    justify-content: center;
  }
  #profile-photo img {
    max-width: 100px;
    max-height: 100px;
    min-width: 100px;
    min-height: 100px;
  }
  #profile-info,
  #profile-photo {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
