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
            username: <b>{{ user.username }}</b>
          </p>
          <p>
            role: <b>{{ profile.role }}</b>
          </p>
        </div>
      </div>
    </header>
    <article class="w3-container">
      <div class="w3-content">
        <form @submit.prevent="update" :disabled="updating">
          <div class="inpt">
            <label>Username:</label>
            <input type="text" v-model="username" required />
          </div>
          <div class="inpt">
            <label>First Name:</label>
            <input type="text" v-model="firstName" required />
          </div>
          <div class="inpt">
            <label>Last Name:</label>
            <input type="text" v-model="lastName" required />
          </div>
          <div class="inpt">
            <label>Gender:</label>
            <select v-model="gender" required>
              <option value="f">Female</option>
              <option value="m">Male</option>
            </select>
          </div>
          <div class="inpt">
            <label>ID Number:</label>
            <input type="text" v-model="idNumber" required />
          </div>
          <div class="inpt">
            <label>Email:</label>
            <input type="text" v-model="email" required />
          </div>
          <div class="inpt">
            <label>Department:</label>
            <select v-model="department" required>
              <option
                v-for="dep in departments"
                :value="dep.id"
                :key="dep.id"
                >{{ dep.name }}</option
              >
            </select>
          </div>
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
              v-on:change="handleFileUpload"
              required
            />
          </div>
          <p v-show="errorFile" class="w3-small w3-text-red w3-center">
            There was something wrong with the photo you were trying to upload.
            Please choose a photo that has smaller size and filename, or you can
            rename the filename of this photo.
          </p>
          <p v-show="updated" class="w3-small w3-text-green w3-center">
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
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.user.user.user.username,
      firstName: this.$store.state.user.user.user.first_name,
      lastName: this.$store.state.user.user.user.last_name,
      gender: this.$store.state.user.user.profile.gender,
      email: this.$store.state.user.user.user.email,
      idNumber: this.$store.state.user.user.profile.id_number,
      department: this.$store.state.user.user.profile.department,
      updating: false,
      error: false,

      file: '',
      updatingFile: false,
      errorFile: false,
      updated: false,

      password: '',
      password1: '',
      password2: ''
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
        return this.$store.state.user.user.profile.photo
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
    async updatePhoto() {
      this.updatingFile = true
      this.errorFile = false
      let formData = new FormData()
      formData.append('photo', this.file)
      this.$store.dispatch('user/toogleRefresh')
      await this.$axios
        .post('accounts/change-dp/', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              'school_access_token'
            )}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(async () => {
          this.$store.dispatch('user/toogleRefresh')
          await this.$store.dispatch('user/getUser').then(() => {
            this.updatingFile = false
            this.errorFile = false
            this.updated = true
            setTimeout(() => {
              this.updated = false
            }, 8000)
            setTimeout(() => {
              this.$router.push('/profile')
            }, 10000)
          })
        })
        .catch(() => {
          this.$store.dispatch('user/toogleRefresh')
          this.errorFile = true
          this.updatingFile = false
          setTimeout(() => {
            this.errorFile = false
          }, 15000)
        })
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
      await this.$axios
        .post('accounts/profile/', payload)
        .then(async () => {
          await this.$store.dispatch('user/getUser').then(() => {
            this.updating = false
            this.error = false
            this.$router.push('/profile')
          })
        })
        .catch(() => {
          this.error = true
          this.updating = false
          setTimeout(() => {
            this.error = false
          }, 10000)
        })
    }
  }
}
</script>

<style scoped>
header {
  margin-top: 53px;
  padding: 64px 0px;
}

.w3-content {
  max-width: 500px;
  padding: 16px;
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
  max-width: 150px;
  max-height: 150px;
  min-width: 150px;
  min-height: 150px;
  border-radius: 100%;
  object-fit: cover;
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

.inpt input,
.inpt select {
  background: white;
  border-radius: 4px;
  border: 1px solid gray;
  height: 40px;
  transition: 0.3s;
  padding: 0px 8px;
}

.inpt input[type='file'] {
  font-size: 12px;
  display: flex;
  align-items: center;
  height: unset;
  padding: 0px;
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

@media (max-width: 900px) {
  #profile-header {
    flex-direction: column;
    justify-content: center;
  }
  #profile-photo img {
    max-width: 80px;
    max-height: 80px;
    min-width: 80px;
    min-height: 80px;
  }
  #profile-info,
  #profile-photo {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
