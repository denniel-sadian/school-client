export default function({ store, redirect }) {
  if (store.state.grading.summary.length === 0) {
    return redirect('/dashboard/sheets')
  }
}
