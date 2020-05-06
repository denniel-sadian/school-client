export const state = () => ({
  credentials: null,
  permissions: [],
  notRegisteredStudents: null,
  sectionCode: null
})

export const mutations = {
  SET_CREDENTIALS(state, cred) {
    state.credentials = cred
  },
  SET_PERMS(state, perms) {
    state.permissions = perms
  },
  SET_STUDENTS(state, students) {
    state.notRegisteredStudents = students
  },
  SET_SECTION_CODE(state, code) {
    state.sectionCode = code
  },
  UPDATE_PERM(state, perm) {
    state.permissions.filter((e) => e.id === perm.id)[0].section = perm.section
    state.permissions.filter((e) => e.id === perm.id)[0].code = perm.code
  },
  ADD_PERM(state, perm) {
    state.permissions.push(perm)
    state.permissions = state.permissions.sort((a, b) => b.id - a.id)
  },
  DELETE_PERM(state, url) {
    state.permissions = state.permissions.filter((e) => e.url !== url)
  }
}

export const actions = {
  checkCode({ commit }, code) {
    return this.$axios
      .post('accounts/check-permission/', { code })
      .then(({ data }) => {
        commit('SET_CREDENTIALS', data)
      })
      .catch(() => {
        commit('SET_CREDENTIALS', null)
      })
  },
  checkSectionCode({ commit }, code) {
    return this.$axios
      .post('accounts/student-register/', { code })
      .then(({ data }) => {
        commit('SET_SECTION_CODE', code)
        commit('SET_STUDENTS', data)
      })
      .catch(() => {
        commit('SET_SECTION_CODE', null)
        commit('SET_STUDENTS', null)
      })
  },
  retrievePerms({ commit }) {
    // Get all the permissions
    return this.$axios
      .get('accounts/student-permissions/')
      .then(({ data }) => commit('SET_PERMS', data))
  },
  createPerm({ commit }, payload) {
    // Create a permission
    return this.$axios
      .post('accounts/student-permissions/', payload)
      .then(({ data }) => commit('ADD_PERM', data))
  },
  updatePerm({ commit }, payload) {
    // Update the permission
    return this.$axios
      .put(payload.url, payload)
      .then(({ data }) => commit('UPDATE_PERM', data))
  },
  deletePerm({ commit }, url) {
    // Delete the permission
    return this.$axios.delete(url).then(() => commit('DELETE_PERM', url))
  }
}
