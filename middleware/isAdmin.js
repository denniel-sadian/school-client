export default function({ app, store, redirect }) {
  if (store.state.user.user.profile.role !== 'admin') {
    return redirect({
      name: 'not-allowed'
    })
  }
}
