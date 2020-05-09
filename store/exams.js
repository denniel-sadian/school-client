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
  },
  DELETE_ITEM(state, url) {
    state.exam.items = state.exam.items.filter((i) => i !== url)
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
    return this.$axios
      .post('exam/items/', payload.item)
      .then(async ({ data }) => {
        commit('PUSH_ITEM', data.url)
        await payload.choices.forEach(async (c) => {
          c.item = data.url
          await this.$axios.post('exam/choices/', c)
        })
      })
  },
  deleteItem({ commit }, url) {
    return this.$axios.delete(url).then(() => commit('DELETE_ITEM', url))
  }
}
