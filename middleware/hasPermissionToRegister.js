export default function({ store, redirect }) {
  // Check if there's the token
  if (store.registration.credentials === {}) {
    return redirect({ name: 'login' })
  }
}
