export const state = () => ({
  exams: [],
  exam: {}
})

export const mutations = {
  SET_EXAMS(state, exams) {
    state.exams = exams
  },
  SET_EXAM(state, exam) {
    state.exam = exam
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
      .then(({ data }) => commit('SET_EXAM', data))
  }
}
