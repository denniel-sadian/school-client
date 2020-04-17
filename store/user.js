export const state = () => ({
  user: JSON.parse(localStorage.getItem('school_user') || '{}'),
  permissions: [],
  canRefreshToken: true
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
  SET_REFRESHING_TRUE(state) {
    state.canRefreshToken = true
  },
  PUSH_PERM(state, perm) {
    state.permissions.push(perm)
    state.permissions = state.permissions.sort((a, b) => {
      return b.id - a.id
    })
  },
  TOGGLE_CAN_REFRESH(state) {
    state.canRefreshToken = !state.canRefreshToken
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
  logout({ commit }) {
    localStorage.clear()
    this.$axios.setToken(false)
    commit('SET_USER', {})
    commit('SET_PERMISSIONS', [])
    commit('SET_REFRESHING_TRUE')
  },
  toogleRefresh({ commit }) {
    commit('TOGGLE_CAN_REFRESH')
  }
}
