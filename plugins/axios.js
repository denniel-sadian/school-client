export default function({ $axios, redirect }) {
  const t = localStorage.getItem('school_access_token')
  if (t !== null) $axios.setToken(t, 'Bearer')

  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    if (error.response.status === 401) {
      if (
        error.response.data.detail !==
        'No active account found with the given credentials'
      )
        redirect('/login')
    }
  })
}
