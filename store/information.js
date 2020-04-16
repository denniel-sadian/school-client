export const state = () => ({
  departments: [],
  sections: [],
  students: []
})

export const mutations = {
  SET_DEPARTMENTS(state, deps) {
    state.departments = deps
  },
  SET_SECTIONS(state, sections) {
    state.sections = sections
  },
  SET_STUDENTS(state, students) {
    state.students = students
  },
  PUSH_DEP(state, dep) {
    state.departments.push(dep)
    state.departments = state.departments.sort((a, b) => {
      return b.id - a.id
    })
  }
}

export const actions = {
  getInformation({ commit }) {
    this.$axios.get('information/departments/').then(({ data }) => {
      commit('SET_DEPARTMENTS', data)
    })
    this.$axios.get('information/sections/').then(({ data }) => {
      commit('SET_SECTIONS', data)
    })
    this.$axios.get('information/students/').then(({ data }) => {
      commit('SET_STUDENTS', data)
    })
  }
}
