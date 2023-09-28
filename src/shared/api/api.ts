import axios from 'axios'

const siteUrl = window.location.hostname

const baseURL = __IS_DEV__
  ? `http://${siteUrl}:8000/api/v1`
  : 'http://back:8000/api/v1'

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
})

API.interceptors.request.use((config) => {
  config.headers.set('Accept-Language', 'ru', true)
  return config
})

export default API
