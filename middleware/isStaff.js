export default function({ store, redirect }) {
  // Check if there's the token
  if (store.state.user.user.user.student !== null) {
    return redirect({
      name: 'not-allowed'
    })
  }
}
