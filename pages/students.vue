<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-padding w3-center">
        <h1>The Students</h1>
        <p>
          Both teachers and admins can view and modify the students' data.
        </p>
      </div>
    </header>
    <article class="w3-container">
      <form @submit.prevent="createStudent" class="w3-animate-zoom w3-content">
        <h2><i class="fas fa-plus-circle"></i> Add a Student</h2>
        <div class="inpt">
          <label>First Name:</label>
          <input type="text" v-model="fName" required :disabled="creating" />
        </div>
        <div class="inpt">
          <label>Last Name:</label>
          <input type="text" v-model="lName" required :disabled="creating" />
        </div>
        <div class="inpt">
          <label>ID Number:</label>
          <input type="text" v-model="idNum" required :disabled="creating" />
        </div>
        <div class="inpt">
          <label>Gender:</label>
          <select v-model="gender" required>
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
        </div>
        <div class="inpt">
          <label>Phone Number:</label>
          <input type="text" v-model="phone" required :disabled="creating" />
        </div>
        <div class="inpt">
          <label>Guardian's Phone Number:</label>
          <input
            type="text"
            v-model="guardianPhone"
            required
            :disabled="creating"
          />
        </div>
        <div class="inpt">
          <label>Address:</label>
          <input type="text" v-model="address" required :disabled="creating" />
        </div>
        <div class="inpt">
          <label>Grade Level:</label>
          <select class="form-control" v-model="grade" required>
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
          <select v-model="dep" required>
            <option v-for="d in departments" :value="d.url" :key="d.id">{{
              d.name
            }}</option>
          </select>
        </div>
        <div class="inpt">
          <label>Section:</label>
          <select v-model="sec" required>
            <option v-for="s in sections" :value="s.url" :key="s.id">{{
              s.name
            }}</option>
          </select>
        </div>
        <div class="inpt">
          <label>Photo: <span class="w3-opacity">Optional</span></label>
          <input type="file" ref="file" @change="handleFileUpload" />
        </div>
        <hr />
        <p class="w3-center w3-text-red w3-small" v-show="error">
          Please provide unique values for the ID number.
        </p>
        <button
          type="submit"
          :disabled="creating"
          class="w3-button w3-green w3-round"
        >
          <span v-if="creating"
            ><i class="fas fa-spinner w3-spin"></i> Adding...</span
          >
          <span v-else>Add This Student</span>
        </button>
      </form>
    </article>
    <article class="w3-container">
      <div class="w3-content">
        <div v-if="totalStudents === 0" class="w3-center">
          <h4>There is no student yet.</h4>
        </div>
        <div v-else>
          <h2 class="w3-center">List of Students</h2>
          <div class="filter w3-gray w3-round">
            <h3><i class="fas fa-filter"></i> Filter The List</h3>
            <div class="w3-padding w3-white w3-round">
              <div class="inpt">
                <label>Department:</label>
                <select v-model="depFilter" required>
                  <option
                    v-for="d in departments"
                    :value="d.url"
                    :key="d.url"
                    >{{ d.name }}</option
                  >
                </select>
              </div>
              <div class="inpt">
                <label>Grade Level:</label>
                <select class="form-control" v-model="gradeFilter" required>
                  <option value="a">All</option>
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
                <label>Section:</label>
                <select v-model="secFilter" required>
                  <option value="a">All</option>
                  <option v-for="s in sections" :value="s.url" :key="s.url">{{
                    s.name
                  }}</option>
                </select>
              </div>
              <div class="inpt">
                <label>Gender:</label>
                <select v-model="genderFilter" required>
                  <option value="a">All</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
              </div>
              <div class="inpt">
                <label>Search Name:</label>
                <input type="text" v-model="search" />
              </div>
            </div>
          </div>
          <p
            class="w3-text-red w3-small w3-center"
            v-if="students.length === 0"
          >
            No student found with the above filters.
          </p>
          <p v-else class="w3-text-green w3-small w3-center">
            {{ students.length }} found.
          </p>
          <Student
            v-for="s in students"
            :student="s"
            :deps="departments"
            :secs="sections"
            :key="s.id"
          />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Student from '~/components/Student.vue'

export default {
  components: { Student },
  data() {
    return {
      creating: false,
      error: false,

      gradeFilter: 'a',
      secFilter: 'a',
      genderFilter: 'a',
      depFilter: '',
      search: '',

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
    totalStudents() {
      return this.$store.state.information.students.length
    },
    students() {
      return this.$store.state.information.students
        .filter((e) => e.department === this.depFilter)
        .filter((e) => {
          if (this.gradeFilter === 'a') return true
          else return e.grade_level === this.gradeFilter
        })
        .filter((e) => {
          if (this.secFilter === 'a') return true
          else return e.section === this.secFilter
        })
        .filter((e) => {
          if (this.genderFilter === 'a') return true
          else return e.gender === this.genderFilter
        })
        .filter((e) => {
          if (this.search === '') return true
          else
            return `${e.first_name} ${e.last_name}`.includes(
              this.search.toUpperCase()
            )
        })
    },
    departments() {
      return this.$store.state.information.departments
    },
    sections() {
      return this.$store.state.information.sections
    }
  },
  watch: {
    departments: function(v) {
      this.depFilter = this.departments.filter(
        (e) => e.id === this.$store.state.user.user.profile.department
      )[0].url
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    async createStudent() {
      this.creating = true
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
      await this.$store
        .dispatch('information/postStu', formData)
        .then(() => {
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
        })
        .catch(() => {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 10000)
        })
        .finally(() => {
          this.creating = false
        })
    }
  },
  async mounted() {
    await this.$store.dispatch('information/getInformation')
  }
}
</script>

<style scoped>
header {
  margin-top: 53px;
  padding: 64px 0px !important;
  text-align: center;
}

header h1 {
  text-transform: capitalize;
}

.w3-content {
  max-width: 600px;
}

form {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid black;
}

.w3-button {
  width: 100%;
}

article {
  margin: 20px 0px;
}

.filter {
  padding: 8px;
}
</style>
