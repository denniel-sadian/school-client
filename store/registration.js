export const state = () => ({
  code: '',
  credentials: {}
})

export const mutations = {
  SET_CODE(state, code) {
    state.code = code
  }
}

export const actions = {
  checkCode({ commit }, code) {
    return this.$axios.post('accounts/check-permission/', { code })
  }
}
