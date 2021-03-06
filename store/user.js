export const state = () => ({
  user: JSON.parse(localStorage.getItem('school_user') || '{}'),
  permissions: []
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('school_user', JSON.stringify(user))
  },
  SET_PERMISSIONS(state, perms) {
    state.permissions = perms.sort((a, b) => {
      return b.id - a.id
    })
  },
  PUSH_PERM(state, perm) {
    state.permissions.push(perm)
    state.permissions = state.permissions.sort((a, b) => {
      return b.id - a.id
    })
  },
  MODIFY_PERM(state, p) {
    state.permissions.filter((pe) => pe.id === p.id)[0].role = p.role
    state.permissions.filter((pe) => pe.id === p.id)[0].first_name =
      p.first_name
    state.permissions.filter((pe) => pe.id === p.id)[0].last_name = p.last_name
    state.permissions.filter((pe) => pe.id === p.id)[0].gender = p.gender
    state.permissions.filter((pe) => pe.id === p.id)[0].code = p.code
    state.permissions.filter((pe) => pe.id === p.id)[0].department =
      p.department
  },
  DELETE_PERM(state, id) {
    delete state.permissions.filter((p) => p.id === id)[0]
  }
}

export const actions = {
  login({ commit }, credentials) {
    return this.$axios
      .post('accounts/obtain-token/', credentials)
      .then(async (res) => {
        localStorage.setItem('school_access_token', res.data.access)
        localStorage.setItem('school_refresh_token', res.data.refresh)
        this.$axios.setToken(res.data.access, 'Bearer')
        await this.$axios.get('accounts/profile/').then(({ data }) => {
          commit('SET_USER', data)
        })
      })
  },
  getUser({ commit }) {
    return this.$axios.get('accounts/profile/').then(({ data }) => {
      commit('SET_USER', data)
    })
  },
  getPerms({ commit, state }) {
    if (state.user.profile.role !== 'admin') return
    return this.$axios.get('accounts/permissions/').then(({ data }) => {
      commit('SET_PERMISSIONS', data)
    })
  },
  postPerm({ commit }, payload) {
    return this.$axios
      .post('accounts/permissions/', payload)
      .then(({ data }) => {
        commit('PUSH_PERM', data)
      })
  },
  putPerm({ commit }, payload) {
    return this.$axios
      .put(`accounts/permissions/${payload.id}/`, payload)
      .then(({ data }) => {
        commit('MODIFY_PERM', data)
      })
  },
  updatePhoto({ dispatch }, payload) {
    return this.$axios
      .post('accounts/change-dp/', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            'school_access_token'
          )}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => dispatch('getUser'))
  },
  updateProfile({ dispatch }, payload) {
    return this.$axios
      .post('accounts/profile/', payload)
      .then(() => dispatch('getUser'))
  },
  deletePerm({ commit }, id) {
    return this.$axios.delete(`accounts/permissions/${id}/`).then(() => {
      commit('DELETE_PERM', id)
    })
  },
  logout({ commit }) {
    localStorage.clear()
    this.$axios.setToken(false)
    commit('SET_USER', {})
    commit('SET_PERMISSIONS', [])
  }
}
