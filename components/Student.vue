<template>
  <div
    class="cont w3-card-4 w3-pale-yellow w3-animate-zoom"
    :class="{ 'w3-opacity': deleting }"
    v-show="!hide"
  >
    <div class="display" v-if="!editing">
      <div class="content">
        <div>
          <img v-if="student.photo" :src="student.photo" alt="" />
          <img v-else src="/anon_avatar.png" alt="" />
          <h4>
            {{ student.first_name }} {{ student.last_name }}
            <span
              v-if="student.user !== null"
              class="w3-tag w3-small w3-yellow w3-round-xxlarge"
              >has an account</span
            >
          </h4>
        </div>
        <div class="table-cont">
          <table>
            <tr>
              <th>ID Number:</th>
              <td>{{ student.id_number }}</td>
            </tr>
            <tr>
              <th>Gender:</th>
              <td>{{ student.gender === 'm' ? 'Male' : 'Female' }}</td>
            </tr>
            <tr>
              <th>Phone Number:</th>
              <td>{{ student.cp_number }}</td>
            </tr>
            <tr>
              <th>Guardian's Phone Number:</th>
              <td>{{ student.cp_number }}</td>
            </tr>
            <tr v-if="student.user !== null">
              <th>Email:</th>
              <td>{{ student.user.email }}</td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>{{ student.address }}</td>
            </tr>
            <tr>
              <th>Grade Level:</th>
              <td>{{ student.grade_level }}</td>
            </tr>
            <tr>
              <th>Department:</th>
              <td>{{ department }}</td>
            </tr>
            <tr>
              <th>Section:</th>
              <td>{{ section }}</td>
            </tr>
          </table>
        </div>
      </div>
      <p class="w3-center w3-small w3-text-red" v-show="errorDelete">
        You cannot delete a student that has records.
      </p>
      <div class="btn">
        <button
          @click="edit"
          :disabled="deleting"
          class="w3-button w3-round w3-green w3-small"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button
          @click="deleteStudent"
          :disabled="deleting"
          class="w3-button w3-round w3-small w3-pink"
        >
          <i v-if="!deleting" class="fas fa-trash-alt"></i>
          <i v-else class="fas fa-spinner w3-spin"></i>
        </button>
      </div>
    </div>
    <form v-else @submit.prevent="update">
      <div v-if="!confirmUserDelete">
        <div class="inpt">
          <label>First Name:</label>
          <input type="text" v-model="fName" required :disabled="updating" />
        </div>
        <div class="inpt">
          <label>Last Name:</label>
          <input type="text" v-model="lName" required :disabled="updating" />
        </div>
        <div class="inpt">
          <label>ID Number:</label>
          <input type="text" v-model="idNum" required :disabled="updating" />
        </div>
        <div class="inpt">
          <label>Gender:</label>
          <select v-model="gender" required :disabled="updating">
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
        </div>
        <div class="inpt">
          <label>Phone Number:</label>
          <input type="text" v-model="phone" required :disabled="updating" />
        </div>
        <div class="inpt">
          <label>Guardian's Phone Number:</label>
          <input
            type="text"
            v-model="guardianPhone"
            required
            :disabled="updating"
          />
        </div>
        <div class="inpt">
          <label>Address:</label>
          <input type="text" v-model="address" required :disabled="updating" />
        </div>
        <div class="inpt">
          <label>Grade Level:</label>
          <select
            class="form-control"
            v-model="grade"
            required
            :disabled="updating"
          >
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
            <option value="c1">First Year College</option>
            <option value="c2">Second Year College</option>
            <option value="c3">Third Year College</option>
            <option value="c4">Fourth Year College</option>
          </select>
        </div>
        <div class="inpt">
          <label>Department:</label>
          <select v-model="dep" required :disabled="updating">
            <option v-for="d in deps" :value="d.url" :key="d.id">{{
              d.name
            }}</option>
          </select>
        </div>
        <div class="inpt">
          <label>Section:</label>
          <select v-model="sec" required :disabled="updating">
            <option v-for="s in secs" :value="s.url" :key="s.id">{{
              s.name
            }}</option>
          </select>
        </div>
        <div class="inpt">
          <label>Photo: <span class="w3-opacity">Optional</span></label>
          <input
            type="file"
            ref="file"
            @change="handleFileUpload"
            :disabled="updating"
          />
        </div>
        <hr />
        <p v-show="error" class="w3-small w3-text-red w3-center">
          Please provide a unique value for the ID number.
        </p>
        <button
          type="submit"
          :disabled="updating"
          class="w3-button w3-light-green w3-round w3-small w3"
        >
          <span v-if="updating"
            ><i class="fas fa-spinner w3-spin"></i> Updating...</span
          >
          <span v-else>Update</span>
        </button>
        <button
          :disabled="updating"
          class="w3-pink w3-round w3-button w3-small"
          @click="editing = false"
        >
          Cancel
        </button>
        <div v-if="student.user !== null && isAdmin">
          <hr />
          <button
            :disabled="updating"
            @click="confirmUserDelete = true"
            class="w3-red w3-round w3-button w3-small"
          >
            Delete Student's Account
          </button>
        </div>
      </div>
      <div v-else class="w3-center">
        <h2><i class="fas fa-exclamation-triangle w3-text-red"></i> Warning</h2>
        <p>
          Are you use you want to delete the account of
          {{ student.first_name }} {{ student.last_name }}? The account to of
          this student will be deleted but not the records.
        </p>
        <hr />
        <button
          :disabled="updating"
          class="w3-pink w3-round w3-button w3-small"
          @click="deleteUser"
        >
          Yes
        </button>
        <button
          :disabled="updating"
          class="w3-green w3-round w3-button w3-small"
          @click="confirmUserDelete = false"
        >
          No
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    student: Object,
    deps: Array,
    secs: Array
  },
  data() {
    return {
      editing: false,
      updating: false,
      deleting: false,
      error: false,
      errorDelete: false,
      hide: false,
      confirmUserDelete: false,
      fName: '',
      lName: '',
      gender: '',
      idNum: '',
      phone: '',
      guardianPhone: '',
      address: '',
      file: '',
      dep: '',
      sec: '',
      grade: ''
    }
  },
  computed: {
    department() {
      const dep = this.deps.filter((d) => d.url === this.student.department)[0]
      if (!dep) return
      return dep.name
    },
    section() {
      const sec = this.secs.filter((s) => s.url === this.student.section)[0]
      if (!sec) return
      return sec.name
    },
    isAdmin() {
      return this.$store.state.user.user.profile.role === 'admin'
    }
  },
  methods: {
    edit() {
      this.editing = true
      this.fName = this.student.first_name
      this.lName = this.student.last_name
      this.gender = this.student.gender
      this.idNum = this.student.id_number
      this.phone = this.student.cp_number
      this.guardianPhone = this.student.guardian_cp_number
      this.address = this.student.address
      this.dep = this.student.department
      this.sec = this.student.section
      this.grade = this.student.grade_level
    },
    async deleteUser() {
      this.deleting = true
      console.log(`accounts/users/${this.student.user.id}/`)
      await this.$axios
        .delete(`accounts/users/${this.student.user.id}/`)
        .then(() =>
          this.$store.commit(
            'information/REMOVE_USER_OF_STUDENT',
            this.student.id
          )
        )
        .finally(() => {
          this.deleting = false
          this.editing = false
        })
    },
    async deleteStudent() {
      this.deleting = true
      await this.$store
        .dispatch('information/deleteStu', this.student.url)
        .then(() => {
          this.hide = true
        })
        .catch(() => {
          this.errorDelete = true
          setTimeout(() => {
            this.errorDelete = false
          }, 10000)
        })
        .finally(() => {
          this.deleting = false
        })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    async update() {
      this.updating = true
      this.error = false
      let formData = new FormData()
      if (this.file !== '') formData.append('photo', this.file)
      formData.append('url', this.student.url)
      formData.append('first_name', this.fName)
      formData.append('last_name', this.lName)
      formData.append('gender', this.gender)
      formData.append('id_number', this.idNum)
      formData.append('cp_number', this.phone)
      formData.append('guardian_cp_number', this.guardianPhone)
      formData.append('address', this.address)
      formData.append('grade_level', this.grade)
      formData.append('department', this.dep)
      formData.append('section', this.sec)
      await this.$store
        .dispatch('information/putStu', formData)
        .then(() => {
          this.editing = false
        })
        .catch((err) => {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 10000)
        })
        .finally(() => (this.updating = false))
    }
  }
}
</script>

<style scoped>
.cont {
  padding: 5px 5px 2px 5px;
  border: 2px solid black;
  border-radius: 4px;
  margin: 64px 0px;
}

h4 {
  font-weight: 800;
  font-family: 'Roboto Slab', serif !important;
}

.btn {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #9e9e9e;
  padding-top: 2px;
}

.btn button {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-left: 8px;
  background: white;
}

.w3-button {
  width: 100%;
  margin: 3px 0px;
}

.content > div {
  display: flex;
  align-items: center;
}

img {
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  max-height: 50px;
  object-fit: cover;
  border-radius: 100%;
  background: #9e9e9e;
  border: 1px solid black;
}

h4 {
  font-weight: 800;
  margin-left: 8px;
}

th {
  text-align: left;
  font-family: 'Courier New', Courier, monospace;
}

.table-cont,
table {
  overflow-x: auto;
  width: 100%;
  margin-top: 8px;
}

th,
td {
  border: 1px solid #9e9e9e;
  padding-left: 4px;
  white-space: nowrap;
}
</style>
