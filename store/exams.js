export const state = () => ({
  exams: []
})

export const mutations = {
  SET_EXAMS(state, exams) {
    state.exams = exams
  },
  PUSH_EXAM(state, exam) {
    state.exams.push(exam)
    state.exams = state.exams.sort((a, b) => {
      return b.id - a.id
    })
  }
}

export const actions = {
  retrieveExams({ commit }) {
    return this.$axios
      .get('exam/exams/')
      .then(({ data }) => commit('SET_EXAMS', data))
  },
  createExam({ commit }, payload) {
    return this.$axios
      .post('exam/exams/', payload)
      .then(({ data }) => commit('PUSH_EXAM', data))
  }
}
