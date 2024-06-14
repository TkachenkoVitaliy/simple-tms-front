import axios, { AxiosResponse } from 'axios'

import { SignInResponse } from 'app/model/types/authTypes'

const siteUrl = window.location.hostname

const baseURL = __IS_DEV__
  ? `http://${siteUrl}:8000/auth`
  : 'http://back:8000/auth'

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

export const AuthApi = {
  signIn(
    email: string,
    password: string,
  ): Promise<AxiosResponse<SignInResponse>> {
    return API.post('signin', { email, password })
  },
  signUp(
    email: string,
    password: string,
  ): Promise<AxiosResponse<SignInResponse>> {
    return API.post('signup', { username: email, email, password })
  },
  refresh(refreshToken: string) {
    return API.post('refreshToken', { refreshToken })
  },
  signOut(): Promise<AxiosResponse> {
    return API.post('signout')
  },
}
