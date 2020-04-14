export default function({ $axios, redirect }) {
  const t = localStorage.getItem('school_access_token')
  if (t !== null) $axios.setToken(t, 'Bearer')

  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })
}
