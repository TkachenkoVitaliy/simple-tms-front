import axios from 'axios'

const baseURL = __IS_DEV__ ? 'http://localhost:8080' : 'http://back:8080'

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default API
