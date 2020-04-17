<template>
  <div
    class="cont"
    :class="{ 'w3-border-green': perm.used, 'w3-hide': deleting }"
  >
    <div class="display" v-if="!editing">
      <h3 :class="{ 'w3-text-green': perm.used }">
        <i class="fas fa-key"></i> {{ perm.code }}
      </h3>
      <p>
        {{ perm.url }} This permission was given to
        <b
          >{{ perm.gender === 'm' ? 'Mister' : 'Miss' }} {{ perm.first_name }}
          {{ perm.last_name }}</b
        >
        by <span v-if="perm.from_who.username === username">you</span
        ><span v-else
          >admin {{ perm.from_who.first_name }}
          {{ perm.from_who.last_name }}</span
        >
        to create
        {{ perm.role === 'admin' ? "an admin's" : "a teacher's" }} account on
        the system.
        <span v-if="perm.used" class="w3-text-green"
          >This permission has been used already.</span
        >
        <span v-else>This permission is not yet used.</span>
      </p>
      <p class="w3-small">{{ new Date(perm.date).toDateString() }}</p>
      <div class="btn" v-show="perm.from_who.username === username">
        <button
          @click="edit"
          v-show="!perm.used"
          class="w3-button w3-round w3-small w3-border w3-border-black"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button
          @click="deletePerm"
          class="w3-button w3-text-red w3-round w3-small w3-border w3-border-red"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
    <form v-else @submit.prevent="update">
      <div class="inpt">
        <label>Role:</label>
        <select v-model="role" required>
          <option value="admin">As an Admin</option>
          <option value="teacher">As a Teacher</option>
        </select>
      </div>
      <div class="inpt">
        <label>First Name:</label>
        <input type="text" v-model="fName" required />
      </div>
      <div class="inpt">
        <label>Last Name:</label>
        <input type="text" v-model="lName" required />
      </div>
      <div class="inpt">
        <label>Gender:</label>
        <select v-model="gender" required>
          <option value="f">Female</option>
          <option value="m">Male</option>
        </select>
      </div>
      <div class="inpt">
        <label>Code:</label>
        <input type="text" v-model="code" required />
      </div>
      <div class="inpt">
        <label>Department:</label>
        <select v-model="dep" required>
          <option v-for="d in deps" :value="d.id" :key="d.id">{{
            d.name
          }}</option>
        </select>
      </div>
      <hr />
      <p v-show="error" class="w3-small w3-text-red w3-center">
        Please provide a unique code.
      </p>
      <button
        type="submit"
        :disabled="updating"
        class="w3-button w3-light-green w3-round w3-small w3"
      >
        <span v-if="updating"
          ><i class="fas fa-spinner w3-spin"></i> Updating...</span
        >
        <span v-else>Update Permission</span>
      </button>
      <button
        :disabled="updating"
        class="w3-pink w3-round w3-button w3-small"
        @click="editing = false"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    perm: Object,
    deps: Array
  },
  data() {
    return {
      editing: false,
      updating: false,
      deleting: false,
      error: false,
      role: this.perm.role,
      fName: this.perm.first_name,
      lName: this.perm.last_name,
      gender: this.perm.gender,
      code: this.perm.code,
      dep: this.perm.department
    }
  },
  computed: {
    username() {
      return this.$store.state.user.user.user.username
    }
  },
  methods: {
    edit() {
      this.editing = true
      this.role = this.perm.role
      this.fName = this.perm.first_name
      this.lName = this.perm.last_name
      this.gender = this.perm.gender
      this.code = this.perm.code
      this.dep = this.perm.department
    },
    async deletePerm() {
      this.deleting = true
      await this.$axios
        .delete(`accounts/permissions/${this.perm.id}/`)
        .then(() => {
          this.$store.dispatch('user/getPerms')
        })
    },
    async update() {
      this.updating = true
      this.error = false
      const payload = {
        code: this.code,
        role: this.role,
        first_name: this.fName,
        last_name: this.lName,
        gender: this.gender,
        department: this.dep
      }
      await this.$axios
        .put(`accounts/permissions/${this.perm.id}/`, payload)
        .then(({ data }) => {
          this.editing = false
          this.$store.commit('user/MODIFY_PERM', data)
        })
        .catch(() => {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 10000)
        })
        .finally(() => {
          this.updating = false
        })
    }
  }
}
</script>

<style scoped>
.cont {
  padding: 16px;
  border: 1px solid black;
  border-radius: 4px;
  margin: 16px 0px;
}

h3 {
  font-weight: 800;
}

.btn {
  display: flex;
  justify-content: flex-end;
}

.btn button {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-left: 16px;
}

.w3-button {
  width: 100%;
  margin: 3px 0px;
}
</style>
