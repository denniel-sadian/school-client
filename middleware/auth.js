export default function({ app, store, redirect }) {
  // Check if there's the token
  if (
    localStorage.getItem('school_access_token') === null &&
    localStorage.getItem('school_refresh_token') === null
  ) {
    return redirect({
      name: 'login'
    })
  }
  store.dispatch('information/getInformation')
}
