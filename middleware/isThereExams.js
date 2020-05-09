export default function({ store, redirect }) {
  // Check if there's the token
  if (store.state.exams.exams.length === 0) {
    return redirect({
      name: 'exams'
    })
  }
}
