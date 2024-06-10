import axios from 'axios'

const siteUrl = window.location.hostname

const baseURL = __IS_DEV__
  ? `http://${siteUrl}:8000/auth`
  : 'http://back:8000/auth'

const AUTH_API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
})

AUTH_API.interceptors.request.use((config) => {
  config.headers.set('Accept-Language', 'ru', true)
  return config
})

export default AUTH_API
