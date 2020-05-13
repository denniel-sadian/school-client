<template>
  <div>
    <div v-if="!doneLoading" class="loading">
      <h1 class="w3-text-white w3-center">
        <i class="fas fa-spinner w3-spin"></i>
      </h1>
    </div>
    <div v-else class="cont">
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
            <p>
              This is your student profile. You can only change either your
              username or password.
            </p>
          </div>
        </div>
      </header>
      <article class="w3-container">
        <div class="w3-content">
          <div class="table-cont">
            <table>
              <tr>
                <th>Gender:</th>
                <td>{{ user.student.gender === 'm' ? 'Male' : 'Female' }}</td>
              </tr>
              <tr>
                <th>ID Number:</th>
                <td>{{ user.student.id_number }}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <th>Phone Number:</th>
                <td>{{ user.student.cp_number }}</td>
              </tr>
              <tr>
                <th>Guardian's Phone Number:</th>
                <td>{{ user.student.guardian_cp_number }}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>{{ user.student.address }}</td>
              </tr>
              <tr>
                <th>Department:</th>
                <td>{{ department }}</td>
              </tr>
              <tr>
                <th>Section:</th>
                <td>{{ section }}</td>
              </tr>
              <tr>
                <th>Grade Level:</th>
                <td>{{ user.student.grade_level }}</td>
              </tr>
            </table>
          </div>

          <hr />
          <h3>Change your Username</h3>
          <div class="inpt">
            <label>Username:</label>
            <input
              type="text"
              v-model="username"
              @keypress.enter="updateUsername"
              :disabled="updating"
            />
          </div>
          <p v-show="errorUsername" class="w3-small w3-text-red w3-center">
            This is already taken.
          </p>
          <button
            class="w3-button w3-green"
            @click="updateUsername"
            :disabled="updating"
          >
            Change Username
          </button>
          <hr />
          <h3>Change your Password</h3>
          <div class="inpt">
            <label>Current Password:</label>
            <input
              type="password"
              v-model="password"
              @keypress.enter="updatePassword"
              :disabled="updating"
            />
          </div>
          <div class="inpt">
            <label>New Password:</label>
            <input
              type="password"
              v-model="password1"
              @keypress.enter="updatePassword"
            />
          </div>
          <div class="inpt">
            <label>Confirm Password:</label>
            <input
              type="password"
              v-model="password2"
              @keypress.enter="updatePassword"
            />
          </div>
          <p v-show="errorPassword" class="w3-small w3-text-red w3-center">
            Something was wrong. Perhaps, your current password was incorrect,
            or your new password was not confirmed correctly.
          </p>
          <p v-show="updatedPassword" class="w3-small w3-text-green w3-center">
            Your password has been updated.
          </p>
          <button
            class="w3-button w3-green"
            @click="updatePassword"
            :disabled="updating"
          >
            Change Password
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'student',
  data() {
    return {
      updated: false,
      updating: false,
      doneLoading: false,
      errorUsername: false,
      errorPassword: false,
      updatedPassword: false,
      department: '',
      section: '',
      username: '',
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
  watch: {
    user(v) {
      this.username = v.username
      this.email = v.email
    }
  },
  methods: {
    async updateUsername() {
      if (this.username === '') return
      const payload = {
        first_name: this.user.student.first_name,
        last_name: this.user.student.last_name,
        gender: this.user.student.gender,
        id_number: this.user.student.id_number,
        department: this.user.student.department,
        username: this.username,
        email: this.user.email
      }
      this.updating = true
      await this.$store
        .dispatch('user/updateProfile', payload)
        .catch(() => {
          this.errorUsername = true
          setTimeout(() => {
            this.errorUsername = false
          }, 10000)
        })
        .finally(() => (this.updating = false))
    },
    async updatePassword() {
      if (
        this.password === '' ||
        this.password1 === '' ||
        this.password2 === ''
      )
        return
      this.updating = true
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
          this.updating = false
          this.updatedPassword = false
          setTimeout(() => {
            this.errorPassword = false
          }, 10000)
        })
        .finally(() => (this.updating = false))
    }
  },
  async mounted() {
    await this.$axios
      .get(`information/departments/${this.user.student.department}/`)
      .then(({ data }) => (this.department = data.name))
    await this.$axios
      .get(`information/sections/${this.user.student.section}/`)
      .then(({ data }) => (this.section = data.name))
    this.username = this.user.username
    this.email = this.user.email
    this.doneLoading = true
  },
  head: {
    title: 'School | Me'
  }
}
</script>

<style scoped>
.cont {
  margin-bottom: 64px;
}

.loading {
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(128, 128, 128, 0.856);
}

.loading h1 {
  font-size: 90px;
}

header {
  margin-top: 60px;
  padding: 64px 0px;
}

.w3-content {
  max-width: 500px;
  padding: 16px 0px;
}

.table-cont {
  overflow-x: auto;
}

hr {
  margin: 150px 0px;
  border: 1px solid #9e9e9e;
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
  border: 1px solid #9e9e9e;
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

table {
  width: 100%;
}

th,
td {
  border: 1px solid #9e9e9e;
  padding: 4px 8px;
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
