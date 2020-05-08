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
  },
  SET_TEACHER(state, teacher) {
    state.exam.teacher = teacher
  },
  PUSH_ITEM(state, url) {
    state.exam.items.push(url)
  }
}

export const actions = {
  retrieveExams({ commit }) {
    return this.$axios
      .get('exam/exams/')
      .then(({ data }) => commit('SET_EXAMS', data))
  },
  retrieveTeacher({ commit }, url) {
    return this.$axios.get(url).then(({ data }) => commit('SET_TEACHER', data))
  },
  retrieveExam({ commit }, url) {
    return this.$axios.get(url).then(({ data }) => commit('SET_EXAM', data))
  },
  createExam({ commit }, payload) {
    return this.$axios.post('exam/exams/', payload)
  },
  createItem({ commit }, payload) {
    return this.$axios.post('exam/items/', payload.item).then(({ data }) => {
      commit('PUSH_ITEM', data.url)
      payload.choices.forEach((c) => {
        c.item = data.url
        this.$axios.post('exam/choices/', c)
      })
    })
  }
}
