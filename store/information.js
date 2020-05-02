export const state = () => ({
  departments: [],
  sections: [],
  students: [],
  subjects: [],
  summary: {}
})

export const mutations = {
  SET_SUMMARY(state, summary) {
    state.summary = summary
  },
  SET_DEPARTMENTS(state, deps) {
    state.departments = deps.sort((a, b) => {
      return b.id - a.id
    })
  },
  SET_SECTIONS(state, sections) {
    state.sections = sections.sort((a, b) => {
      return b.id - a.id
    })
  },
  SET_STUDENTS(state, students) {
    state.students = students.sort((a, b) => {
      return b.id - a.id
    })
  },
  SET_SUBJECTS(state, subjs) {
    state.subjects = subjs.sort((a, b) => {
      return b.id - a.id
    })
  },
  MODIFY_DEP(state, dep) {
    state.departments.filter((e) => e.id === dep.id)[0].name = dep.name
  },
  MODIFY_SEC(state, sec) {
    state.sections.filter((e) => e.id === sec.id)[0].name = sec.name
    state.sections.filter((e) => e.id === sec.id)[0].department = sec.department
  },
  MODIFY_SUB(state, sub) {
    state.subjects.filter((e) => e.id === sub.id)[0].name = sub.name
  },
  MODIFY_STU(state, stu) {
    state.students.filter((e) => e.id === stu.id)[0].first_name = stu.first_name
    state.students.filter((e) => e.id === stu.id)[0].last_name = stu.last_name
    state.students.filter((e) => e.id === stu.id)[0].gender = stu.gender
    state.students.filter((e) => e.id === stu.id)[0].id_number = stu.id_number
    state.students.filter((e) => e.id === stu.id)[0].cp_number = stu.cp_number
    state.students.filter((e) => e.id === stu.id)[0].guardian_cp_number =
      stu.guardian_cp_number
    state.students.filter((e) => e.id === stu.id)[0].address = stu.address
    state.students.filter((e) => e.id === stu.id)[0].photo = stu.photo
    state.students.filter((e) => e.id === stu.id)[0].department = stu.department
    state.students.filter((e) => e.id === stu.id)[0].grade_level =
      stu.grade_level
    state.students.filter((e) => e.id === stu.id)[0].section = stu.section
  },
  PUSH_DEPARTMENT(state, dep) {
    state.departments.push(dep)
    state.departments = state.departments.sort((a, b) => {
      return b.id - a.id
    })
  },
  PUSH_SECTION(state, sec) {
    state.sections.push(sec)
    state.sections = state.sections.sort((a, b) => {
      return b.id - a.id
    })
  },
  PUSH_STUDENT(state, s) {
    state.students.push(s)
    state.students = state.students.sort((a, b) => {
      return b.id - a.id
    })
  },
  PUSH_SUBJECT(state, s) {
    state.subjects.push(s)
    state.subjects = state.subjects.sort((a, b) => {
      return b.id - a.id
    })
  },
  DELETE_DEP(state, url) {
    state.departments = state.departments.filter((e) => e.url !== url)
  },
  DELETE_SEC(state, url) {
    state.sections = state.sections.filter((e) => e.url !== url)
  },
  DELETE_SUB(state, url) {
    state.subjects = state.subjects.filter((e) => e.url !== url)
  },
  DELETE_STU(state, url) {
    state.students = state.students.filter((e) => e.url !== url)
  }
}

export const actions = {
  getSummary({ commit }) {
    return this.$axios
      .get('information/summary/')
      .then(({ data }) => commit('SET_SUMMARY', data))
  },
  getDepartments({ commit }) {
    return this.$axios.get('information/departments/').then(({ data }) => {
      commit('SET_DEPARTMENTS', data)
    })
  },
  getSections({ commit }) {
    return this.$axios.get('information/sections/').then(({ data }) => {
      commit('SET_SECTIONS', data)
    })
  },
  getStudents({ commit }) {
    return this.$axios.get('information/students/').then(({ data }) => {
      commit('SET_STUDENTS', data)
    })
  },
  getSubjects({ commit }) {
    return this.$axios.get('information/subjects/').then(({ data }) => {
      commit('SET_SUBJECTS', data)
    })
  },
  postDep({ commit }, payload) {
    return this.$axios
      .post('information/departments/', payload)
      .then(({ data }) => {
        commit('PUSH_DEPARTMENT', data)
      })
  },
  postSec({ commit }, payload) {
    return this.$axios
      .post('information/sections/', payload)
      .then(({ data }) => {
        commit('PUSH_SECTION', data)
      })
  },
  postSub({ commit }, payload) {
    return this.$axios
      .post('information/subjects/', payload)
      .then(({ data }) => {
        commit('PUSH_SUBJECT', data)
      })
  },
  postStu({ commit }, payload) {
    return this.$axios
      .post('information/students/', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            'school_access_token'
          )}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(({ data }) => {
        commit('PUSH_STUDENT', data)
      })
  },
  putDep({ commit }, payload) {
    return this.$axios.put(payload.url, payload).then(({ data }) => {
      commit('MODIFY_DEP', data)
    })
  },
  putSec({ commit }, payload) {
    return this.$axios.put(payload.url, payload).then(({ data }) => {
      commit('MODIFY_SEC', data)
    })
  },
  putStu({ commit }, payload) {
    return this.$axios
      .put(payload.get('url'), payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            'school_access_token'
          )}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(({ data }) => {
        commit('MODIFY_STU', data)
      })
  },
  putSub({ commit }, payload) {
    return this.$axios.put(payload.url, payload).then(({ data }) => {
      commit('MODIFY_SUB', data)
    })
  },
  putPerm({ commit }, payload) {
    return this.$axios.put(payload.url, payload).then(({ data }) => {
      commit('MODIFY_PERM', data)
    })
  },
  deleteDep({ commit }, url) {
    return this.$axios.delete(url).then(() => {
      commit('DELETE_DEP', url)
    })
  },
  deleteSec({ commit }, url) {
    return this.$axios.delete(url).then(() => {
      commit('DELETE_SEC', url)
    })
  },
  deleteStu({ commit }, url) {
    return this.$axios.delete(url).then(() => {
      commit('DELETE_STU', url)
    })
  },
  deleteSub({ commit }, url) {
    return this.$axios.delete(url).then(() => {
      commit('DELETE_SUB', url)
    })
  },
  deletePerm({ commit }, url) {
    return this.$axios.delete(url).then(() => {
      commit('DELETE_PERM', url)
    })
  }
}
