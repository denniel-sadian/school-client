export default async function({ $axios, store }) {
  const refresher = async () => {
    if (store.state.user.canRefreshToken) {
      const rToken = localStorage.getItem('school_refresh_token')

      if (rToken === null) return

      await $axios
        .post(
          'accounts/refresh-token/',
          { refresh: rToken },
          { progress: false }
        )
        .then((res) => {
          localStorage.setItem('school_access_token', res.data.access)
          $axios.setToken(res.data.access, 'Bearer')
        })
    }
  }
  await refresher()
  setInterval(refresher, 10000)
}
