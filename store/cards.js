export const state = () => ({
  cards: []
})

export const mutations = {
  SET_CARDS(state, cards) {
    state.cards = cards
  }
}

export const actions = {
  retrieveCards({ commit }, payload) {
    return this.$axios
      .post('grading/view-cards/', payload)
      .then(({ data }) => commit('SET_CARDS', data.cards))
  }
}
