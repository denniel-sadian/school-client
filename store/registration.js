export const state = () => ({
  credentials: null
})

export const mutations = {
  SET_CREDENTIALS(state, cred) {
    state.credentials = cred
  }
}

export const actions = {
  checkCode({ commit }, code) {
    return this.$axios.post('accounts/check-permission/', { code })
  }
}
