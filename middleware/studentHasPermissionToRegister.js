export default function({ store, redirect }) {
  // Check if there's the token
  if (!store.state.registration.notRegisteredStudents) {
    return redirect('/registration/check-code')
  }
}
