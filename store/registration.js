export const state = () => ({
  code: '',
  credentials: {}
})

export const mutations = {
  SET_CODE(state, code) {
    state.code = code
  },
  SET_CREDENTIALS(state, cred) {
    state.credentials = cred
  }
}

export const actions = {
  checkCode({ commit }, code) {
    return this.$axios.post('accounts/check-permission/', { code })
  }
}
