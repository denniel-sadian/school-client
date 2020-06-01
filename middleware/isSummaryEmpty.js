export default function({ store, redirect }) {
  if (!store.state.grading.summary === []) {
    return redirect('/dashboard/sheets')
  }
}
