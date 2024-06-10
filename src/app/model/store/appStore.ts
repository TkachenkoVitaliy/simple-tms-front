import axios from 'axios'
import { makeAutoObservable } from 'mobx'

import { AuthApi } from 'app/api/authApi'

import { appLocalStorage } from 'shared/lib/utils'

class AppStore {
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthApi.login(email, password)
      appLocalStorage.setAccessToken(response.data.accessToken)
      appLocalStorage.setRefreshToken(response.data.refreshToken)
      this.setAuth(true)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.toJSON)
      }
    }
  }
}

export const appStore = new AppStore()
