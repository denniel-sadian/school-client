export const state = () => ({
  cards: []
})

export const mutations = {
  SET_CARDS(state, cards) {
    state.cards = cards
  }
}

export const actions = {
  retrieveCards({ commit }, code) {
    this.$axios
      .post('grading/view-cards/', { code })
      .then(({ data }) => commit('SET_CARDS', data))
  }
}
