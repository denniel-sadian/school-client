export const state = () => ({
  user: JSON.parse(localStorage.getItem('school_user') || '{}')
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('school_user', JSON.stringify(user))
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
        await this.$axios.get('accounts/profile/').then((res) => {
          commit('SET_USER', res.data)
        })
      })
  },
  getUser({ commit }) {
    return this.$axios.get('accounts/profile/').then(({ data }) => {
      commit('SET_USER', data)
    })
  },
  logout({ commit }) {
    localStorage.clear()
    commit('SET_USER', {})
  }
}
