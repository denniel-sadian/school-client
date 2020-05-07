export const state = () => ({
  exams: []
})

export const mutations = {
  SET_EXAMS(state, exams) {
    state.exams = exams
  }
}

export const actions = {
  retrieveExams({ commit }) {
    return this.$axios
      .get('exam/exams/')
      .then(({ data }) => commit('SET_EXAMS', data))
  }
}
