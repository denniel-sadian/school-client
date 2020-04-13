export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      $axios.setToken(false)
      console.log('error ' + error)
      $axios
        .post('accounts/refresh-token/', {
          refresh: localStorage.getItem('school_refresh_token')
        })
        .then((res) => {
          localStorage.setItem('school_access_token', res.data.access)
          $axios.setToken(res.data.access, 'Bearer')
        })
    }
  })
}
