export default async function({ $axios, app }) {
  if (
    localStorage.getItem('school_access_token') !== null &&
    localStorage.getItem('school_refresh_token') !== null
  ) {
    return await app.store.dispatch('user/getUser')
  }
}
