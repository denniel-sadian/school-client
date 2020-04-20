export const state = () => ({
  sheets: [],
  currentSheet: {}
})

export const mutations = {
  SET_SHEETS(state, sheets) {
    state.sheets = sheets
    state.sheets = state.sheets.sort((a, b) => b.id - a.id)
  },
  ADD_SHEET(state, sheets) {
    state.sheets.push(sheets)
    state.sheets = state.sheets.sort((a, b) => b.id - a.id)
  },
  SET_CURRENT_SHEET(state, sheet) {
    state.currentSheet = sheet
  },
  UPDATE_CURRENT_SHEET(state, sheet) {
    state.currentSheet.department = sheet.department
    state.currentSheet.subject = sheet.subject
    state.currentSheet.section = sheet.section
    state.currentSheet.publish = sheet.publish
  },
  ADD_WORK(state, work) {
    state.currentSheet.works.push(work)
  },
  SORT_WORKS(state) {
    state.currentSheet.works = state.currentSheet.works.sort(
      (a, b) => b.id - a.id
    )
  },
  ADD_RECORD(state, record) {
    state.currentSheet.records.push(record)
    state.currentSheet.records = state.currentSheet.records.sort(
      (a, b) => b.id - a.id
    )
  },
  UPDATE_WORK(state, work) {
    state.currentSheet.works.filter((e) => e.id === work.id)[0].name = work.name
    state.currentSheet.works.filter((e) => e.id === work.id)[0].work_type =
      work.work_type
    state.currentSheet.works.filter((e) => e.id === work.id)[0].gsheet =
      work.gsheet
    state.currentSheet.works.filter((e) => e.id === work.id)[0].highest_score =
      work.highest_score
  },
  UPDATE_RECORD(state, record) {
    state.currentSheet.records.filter((e) => e.id === record.id)[0].gsheet =
      record.gsheet
    state.currentSheet.records.filter((e) => e.id === record.id)[0].work =
      record.work
    state.currentSheet.records.filter((e) => e.id === record.id)[0].student =
      record.student
    state.currentSheet.records.filter((e) => e.id === record.id)[0].score =
      record.score
  },
  DELETE_WORK(state, url) {
    state.currentSheet.works = state.currentSheet.works.filter(
      (e) => e.url !== url
    )
  },
  DELETE_RECORD(state, url) {
    state.currentSheet.records = state.currentSheet.records.filter(
      (e) => e.url !== url
    )
  }
}

export const actions = {
  retrieveSheets({ commit }) {
    // Get all the grading sheets
    return this.$axios
      .get('grading/sheets/')
      .then(({ data }) => commit('SET_SHEETS', data))
  },
  createSheet({ commit }, payload) {
    // Create a grading sheet
    return this.$axios
      .post('grading/sheets/', payload)
      .then(({ data }) => commit('ADD_SHEET', data))
  },
  retrieveSheet({ commit }, url) {
    // Get the grading sheet
    return this.$axios.get(url).then(({ data }) => {
      commit('SET_CURRENT_SHEET', data)
      commit('SORT_WORKS')
    })
  },
  updateSheet({ commit }, payload) {
    // Update the grading sheet
    return this.$axios
      .put(payload.url, payload)
      .then(({ data }) => commit('UPDATE_CURRENT_SHEET', data))
  },
  deleteSheet({ commit }, url) {
    // Delete the grading sheet
    return this.$axios.delete(url)
  },
  createWork({ commit }, payload) {
    // Create a work
    return this.$axios.post('grading/works/', payload).then(({ data }) => {
      commit('ADD_WORK', data)
      commit('SORT_WORKS')
    })
  },
  updateWork({ commit }, payload) {
    // Update the work
    return this.$axios
      .put(payload.url, payload)
      .then(({ data }) => commit('UPDATE_WORK', data))
  },
  deleteWork({ commit }, url) {
    // Delete the work
    return this.$axios.delete(url).then(() => commit('DELETE_WORK', url))
  },
  createRecord({ commit }, payload) {
    // Create the record
    return this.$axios
      .post('grading/records/', payload)
      .then(({ data }) => commit('ADD_RECORD', data))
  },
  updateRecord({ commit }, payload) {
    // Update the record
    return this.$axios
      .put(payload.url, payload)
      .then(({ data }) => commit('UPDATE_RECORD', data))
  },
  deleteRecord({ commit }, url) {
    // Delete the record
    return this.$axios.delete(url).then(() => commit('DELETE_RECORD', url))
  }
}
