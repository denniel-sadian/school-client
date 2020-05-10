export const state = () => ({
  exams: [],
  sessions: [],
  exam: {},
  toSubmit: {
    student: 0,
    exam: 0,
    answers: []
  }
})

export const mutations = {
  SET_EXAMS(state, exams) {
    state.exams = exams
  },
  SET_SESSIONS(state, sessions) {
    state.sessions = sessions
  },
  SET_EXAM(state, exam) {
    state.exam = exam
  },
  SET_TEACHER(state, teacher) {
    state.exam.teacher = teacher
  },
  SET_STUDENT_ID(state, id) {
    state.toSubmit.student = id
  },
  SET_EXAM_ID(state, id) {
    state.toSubmit.exam = id
  },
  PUSH_OR_MODIFY_ANSWER(state, d) {
    const answer = state.toSubmit.answers.filter((a) => a.item === d.item)[0]
    if (answer) {
      state.toSubmit.answers.filter((a) => a.item === d.item)[0].answer =
        d.answer
    } else {
      state.toSubmit.answers.push(d)
    }
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
  retrieveStrippedExams({ commit }) {
    return this.$axios
      .get('exam/stripped-exams/')
      .then(({ data }) => commit('SET_EXAMS', data))
  },
  retrieveSessions({ commit }) {
    return this.$axios
      .get('exam/sessions/')
      .then(({ data }) => commit('SET_SESSIONS', data))
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
  deleteItem({ commit }, url) {
    return this.$axios.delete(url).then(() => commit('DELETE_ITEM', url))
  }
}
