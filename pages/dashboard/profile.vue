<template>
  <div>
    <header class="w3-container">
      <div id="profile-header">
        <div id="profile-photo">
          <img :src="photo" alt="Avatar" />
        </div>
        <div id="profile-info">
          <h1>{{ user.first_name }} {{ user.last_name }}</h1>
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
      <div class="w3-content">
        <form @submit.prevent="update">
          <div class="inpt">
            <label>Username:</label>
            <input
              type="text"
              v-model="username"
              :disabled="updating"
              required
            />
          </div>
          <div class="inpt">
            <label>First Name:</label>
            <input
              type="text"
              v-model="firstName"
              :disabled="updating"
              required
            />
          </div>
          <div class="inpt">
            <label>Last Name:</label>
            <input
              type="text"
              v-model="lastName"
              :disabled="updating"
              required
            />
          </div>
          <div class="inpt">
            <label>Gender:</label>
            <select v-model="gender" :disabled="updating" required>
              <option value="f">Female</option>
              <option value="m">Male</option>
            </select>
          </div>
          <div class="inpt">
            <label>ID Number:</label>
            <input
              type="text"
              maxlength="255"
              v-model="idNumber"
              :disabled="updating"
              required
            />
          </div>
          <div class="inpt">
            <label>Email:</label>
            <input type="text" v-model="email" :disabled="updating" required />
          </div>
          <div class="inpt">
            <label>Department:</label>
            <select v-model="department" :disabled="updating" required>
              <option
                v-for="dep in departments"
                :value="dep.id"
                :key="dep.id"
                >{{ dep.name }}</option
              >
            </select>
          </div>
          <p v-show="updated" class="w3-small w3-text-green w3-center">
            Your profile has been updated.
          </p>
          <p v-show="error" class="w3-small w3-text-red w3-center">
            There was something wrong. Perhaps you are trying to specify values
            that were already taken by other users.
          </p>
          <button :disabled="updating" type="submit" class="w3-button w3-green">
            <span v-if="updating"
              ><i class="fas fa-spinner w3-spin"></i> Updating...</span
            >
            <span v-else>Update Profile</span>
          </button>
        </form>
        <div class="or">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <form @submit.prevent="updatePhoto" enctype="multipart/form-data">
          <div class="inpt">
            <label>Photo:</label>
            <input
              type="file"
              ref="file"
              :disabled="updatingFile"
              v-on:change="handleFileUpload"
              required
            />
          </div>
          <p v-show="errorFile" class="w3-small w3-text-red w3-center">
            There was something wrong with the photo you were trying to upload.
            Please choose a photo that has smaller size and filename, or you can
            rename the filename of this photo.
          </p>
          <p v-show="updatedPhoto" class="w3-small w3-text-green w3-center">
            Your profile picture has been updated. It would take a few moments
            to display your new photo depending on your connection.
          </p>
          <button
            :disabled="updatingFile"
            type="submit"
            class="w3-button w3-green"
          >
            <span v-if="updatingFile"
              ><i class="fas fa-spinner w3-spin"></i> Updating...</span
            >
            <span v-else>Update Profile Picture</span>
          </button>
        </form>
        <div class="or">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <form @submit.prevent="updatePassword">
          <div class="inpt">
            <label>Current Password:</label>
            <input
              type="password"
              v-model="password"
              :disabled="updatingPassword"
              required
            />
          </div>
          <div class="inpt">
            <label>New Password:</label>
            <input
              type="password"
              v-model="password1"
              :disabled="updatingPassword"
              required
            />
          </div>
          <div class="inpt">
            <label>Confirm Password:</label>
            <input
              type="password"
              v-model="password2"
              :disabled="updatingPassword"
              required
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
            :disabled="updatingPassword"
            type="submit"
            class="w3-button w3-green"
          >
            <span v-if="updatingPassword"
              ><i class="fas fa-spinner w3-spin"></i> Updating...</span
            >
            <span v-else>Update Password</span>
          </button>
        </form>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      username: this.$store.state.user.user.user.username,
      firstName: this.$store.state.user.user.user.first_name,
      lastName: this.$store.state.user.user.user.last_name,
      gender: this.$store.state.user.user.profile.gender,
      email: this.$store.state.user.user.user.email,
      idNumber: this.$store.state.user.user.profile.id_number,
      department: this.$store.state.user.user.profile.department,
      updated: false,
      updating: false,
      error: false,

      file: '',
      updatingFile: false,
      errorFile: false,
      updatedPhoto: false,

      password: '',
      password1: '',
      password2: '',
      updatingPassword: false,
      errorPassword: false,
      updatedPassword: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user.user
    },
    profile() {
      return this.$store.state.user.user.profile
    },
    photo() {
      if (this.profile.photo !== null)
        return (
          'https://school.pythonanywhere.com/' +
          this.$store.state.user.user.profile.photo
        )
      return '/anon_avatar.png'
    },
    departments() {
      return this.$store.state.information.departments
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
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
    },
    async updatePhoto() {
      this.updatingFile = true
      this.errorFile = false
      this.updatedPhoto = false
      let formData = new FormData()
      formData.append('photo', this.file)
      await this.$store
        .dispatch('user/updatePhoto', formData)
        .then(() => {
          this.errorFile = false
          this.updatedPhoto = true
          setTimeout(() => {
            this.updatedPhoto = false
          }, 8000)
        })
        .catch(() => {
          this.errorFile = true
          setTimeout(() => {
            this.errorFile = false
          }, 15000)
        })
        .finally(() => (this.updatingFile = false))
    },
    async update() {
      this.updating = true
      this.error = false
      const payload = {
        username: this.username,
        first_name: this.firstName,
        last_name: this.lastName,
        gender: this.gender,
        email: this.email,
        id_number: this.idNumber,
        department: this.department
      }
      await this.$store
        .dispatch('user/updateProfile', payload)
        .then(() => {
          this.updated = true
          this.error = false
        })
        .catch(() => {
          this.error = true
          this.updated = false
          setTimeout(() => {
            this.error = false
          }, 10000)
        })
        .finally(() => (this.updating = false))
    }
  },
  async mounted() {
    await this.$store.dispatch('information/getDepartments')
    await this.$store.dispatch('user/getUser')
  },
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
