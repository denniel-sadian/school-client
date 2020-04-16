<template>
  <div class="cont" v-show="!hide">
    <div class="display" v-if="!editing">
      <div class="content">
        <div class="img-cont">
          <img v-if="student.photo" :src="student.photo" alt="" />
          <img v-else src="/anon_avatar.png" alt="" />
        </div>
        <div class="details">
          <h4 class="w3-text-green">
            {{ student.first_name }} {{ student.last_name }}
          </h4>
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
              <th>Guardian's:</th>
              <td>{{ student.guardian_cp_number }}</td>
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
          @click="editing = true"
          class="w3-button w3-round w3-small w3-border w3-border-black"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button
          @click="deleteStudent"
          class="w3-button w3-text-red w3-round w3-small w3-border w3-border-red"
        >
          <i v-if="!deleting" class="fas fa-trash-alt"></i>
          <i v-else class="fas fa-spinner w3-spin"></i>
        </button>
      </div>
    </div>
    <form v-else @submit.prevent="update">
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
      fName: this.student.first_name,
      lName: this.student.last_name,
      gender: this.student.gender,
      idNum: this.student.id_number,
      phone: this.student.cp_number,
      guardianPhone: this.student.guardian_cp_number,
      address: this.student.address,
      file: this.student.photo,
      dep: this.student.department,
      sec: this.student.section,
      grade: this.student.grade_level
    }
  },
  computed: {
    department() {
      const dep = this.deps.filter((d) => d.url === this.student.department)[0]
      return dep.name
    },
    section() {
      const sec = this.secs.filter((s) => s.url === this.student.section)[0]
      return sec.name
    }
  },
  methods: {
    async deleteStudent() {
      this.deleting = true
      await this.$axios
        .delete(this.student.url)
        .then(() => {
          this.hide = true
          this.$store.dispatch('information/getStudents')
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
      formData.append('photo', this.file)
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
      await this.$axios
        .put(this.student.url, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              'school_access_token'
            )}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          this.editing = false
          this.file = ''
          this.fName = ''
          this.lName = ''
          this.gender = ''
          this.idNum = ''
          this.phone = ''
          this.guardianPhone = ''
          this.address = ''
          this.grade = ''
          this.dep = ''
          this.sec = ''
          this.error = false
          this.$store.dispatch('user/toogleRefresh')
          this.$store.dispatch('information/getStudents')
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
  padding: 2px 5px;
  border: 1px solid black;
  border-radius: 4px;
  margin: 30px 0px;
}

h3 {
  font-weight: 800;
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
  margin-left: 16px;
}

.w3-button {
  width: 100%;
  margin: 3px 0px;
}

.content {
  display: grid;
  grid-template-columns: auto 1fr;
}

.img-cont,
.details {
  padding: 8px;
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
}

th {
  text-align: left;
  font-family: 'Courier New', Courier, monospace;
}
</style>
