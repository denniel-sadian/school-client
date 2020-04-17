export const state = () => ({
  departments: [],
  sections: [],
  students: [],
  subjects: [],
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
  SET_SUBJECTS(state, subjs) {
    state.subjects = subjs.sort((a, b) => {
      return b.id - a.id
    })
  },
  MODIFY_DEP(state, dep) {
    state.permissions.filter((e) => e.id === dep.id)[0].name = dep.name
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
  MODIFY_PERM(state, perm) {
    state.permissions.filter((e) => e.id === perm.id)[0].code = perm.code
    state.permissions.filter((e) => e.id === perm.id)[0].section = perm.section
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
    dispatch('getSubjects')
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
  getSubjects({ commit }) {
    return this.$axios.get('information/subjects/').then(({ data }) => {
      commit('SET_SUBJECTS', data)
    })
  },
  getPerms({ commit }) {
    return this.$axios.get('information/permissions/').then(({ data }) => {
      commit('SET_PERMISSIONS', data)
    })
  }
}
