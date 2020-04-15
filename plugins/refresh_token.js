export default function({ $axios, $store }) {
  const refresher = () => {
    if ($store.state.user.canRefreshToken) {
      const rToken = localStorage.getItem('school_refresh_token')

      if (rToken === null) return

      $axios
        .post('accounts/refresh-token/', {
          refresh: rToken
        })
        .then((res) => {
          localStorage.setItem('school_access_token', res.data.access)
          $axios.setToken(res.data.access, 'Bearer')
        })
    }
  }
  setInterval(refresher, 60000)
}
