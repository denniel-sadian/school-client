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
  PUSH_COMMENT(state, comment) {
    state.exam.comments.push(comment)
  },
  PUSH_ITEM(state, item) {
    state.exam.items.push(item)
  },
  TOGGLE_PUBLISHED(state, b) {
    state.exam.published = b
  },
  UPDATE_ITEM(state, item) {
    state.exam.items.filter((i) => i.id === item.id)[0].question = item.question
    state.exam.items.filter((i) => i.id === item.id)[0].correct = item.correct
  },
  UPDATE_CHOICE(state, choice) {
    const item = state.exam.items.filter((i) => i.url === choice.item)[0]
    item.choices.filter((c) => c.id === choice.id)[0].text = choice.text
  },
  DELETE_ITEM(state, url) {
    state.exam.items = state.exam.items.filter((i) => i.url !== url)
  }
}

export const actions = {
  retrieveExams({ commit }) {
    return this.$axios
      .get('exam/exams/')
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
  togglePublished({ commit }, payload) {
    return this.$axios
      .put(payload.url, payload)
      .then(({ data }) => commit('TOGGLE_PUBLISHED', data.published))
  },
  updateItem({ commit }, payload) {
    return this.$axios
      .put(payload.url, payload)
      .then(({ data }) => commit('UPDATE_ITEM', data))
  },
  updateChoice({ commit }, payload) {
    return this.$axios
      .put(payload.url, payload)
      .then(({ data }) => commit('UPDATE_CHOICE', data))
  },
  createExam({ commit }, payload) {
    return this.$axios.post('exam/exams/', payload)
  },
  deleteItem({ commit }, url) {
    return this.$axios.delete(url).then(() => commit('DELETE_ITEM', url))
  }
}
