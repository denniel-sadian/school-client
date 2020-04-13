export default async function({ app, store, redirect }) {
  // Check if there's the token
  if (
    localStorage.getItem('school_access_token') !== null &&
    localStorage.getItem('school_refresh_token') !== null
  ) {
    app.$axios.setToken(localStorage.getItem('school_access_token'), 'Bearer')
    app.$axios.setHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('school_access_token')
    )
    app.$auth.ctx.app.$axios.setHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('school_access_token')
    )
  }

  // Redirect to login page if there's no token
  else {
    return redirect({
      name: 'login'
    })
  }

  // Get the user
  await app.$axios.get('accounts/profile/').then((res) => {
    store.commit('user/SET_USER', res.data)
  })
}
