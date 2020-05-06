export default function({ store, redirect }) {
  if (!store.state.registration.credentials) {
    return redirect('/registration/check-code')
  }

  if (!store.state.registration.notRegisteredStudents) {
    return redirect('/registration/check-section-code')
  }
}
