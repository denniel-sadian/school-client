export default function({ store, redirect }) {
  // Check if there's the token
  if (!store.state.registration.credentials) {
    return redirect('/registration/check-code')
  }
}
