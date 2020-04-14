<template>
  <div>
    <header class="w3-container">
      <div class="w3-content" id="profile-header">
        <div id="profile-photo">
          <img :src="photo" alt="Avatar" />
        </div>
        <div id="profile-info">
          <h1>{{ firstName }} {{ lastName }}</h1>
          <p>
            username: <b>{{ username }}</b>
          </p>
          <p>
            role: <b>{{ profile.role }}</b>
          </p>
        </div>
      </div>
    </header>
    <article class="w3-container">
      <form @submit.prevent="update" class="w3-content" :disabled="updating">
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
            <option v-for="dep in departments" :value="dep.id" :key="dep.id">{{
              dep.name
            }}</option>
          </select>
        </div>
        <p v-show="updating" class="w3-small w3-text-green w3-center">
          Updating...
        </p>
        <p v-show="error" class="w3-small w3-text-red w3-center">
          There was something wrong. Perhaps you are trying to specify values
          that were already taken by other users.
        </p>
        <button :disabled="updating" type="submit" class="w3-button w3-green">
          Update Profile
        </button>
      </form>
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
      error: false
    }
  },
  computed: {
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
      console.log(payload)
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
  padding-top: 64px;
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

.w3-button {
  width: 100%;
  border-radius: 4px;
}
</style>
