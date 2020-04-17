export const state = () => ({
  departments: [],
  sections: [],
  students: [],
  permissions: []
})

export const mutations = {
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
  SET_PERMISSIONS(state, perms) {
    state.permissions = perms.sort((a, b) => {
      return b.id - a.id
    })
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
  PUSH_PERM(state, perm) {
    state.permissions.push(perm)
    state.permissions = state.permissions.sort((a, b) => {
      return b.id - a.id
    })
  }
}

export const actions = {
  getInformation({ dispatch }) {
    dispatch('getDepartments')
    dispatch('getSections')
    dispatch('getStudents')
    dispatch('getPerms')
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
  getPerms({ commit }) {
    return this.$axios.get('information/permissions/').then(({ data }) => {
      commit('SET_PERMISSIONS', data)
    })
  }
}
