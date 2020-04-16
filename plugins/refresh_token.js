export default function({ $axios, app }) {
  const refresher = () => {
    if (app.store.state.user.canRefreshToken) {
      const rToken = localStorage.getItem('school_refresh_token')

      if (rToken === null || !app.store.state.user.canRefreshToken) return

      $axios
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
  setInterval(refresher, 30000)
}
