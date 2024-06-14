import axios from 'axios'
import { makeAutoObservable } from 'mobx'

import { AuthApi } from 'app/api/authApi'
import { SignInResponse } from 'app/model/types/authTypes'

import { appLocalStorage } from 'shared/lib/utils'

class AppStore {
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  async signIn(email: string, password: string) {
    try {
      const response = await AuthApi.signIn(email, password)
      const responseData: SignInResponse = response.data
      if ('error' in responseData) {
        throw new Error(responseData.error)
      } else {
        appLocalStorage.setAccessToken(responseData.token)
        appLocalStorage.setRefreshToken(responseData.refreshToken)
        this.setAuth(true)
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.toJSON)
      }
    }
  }
}

export const appStore = new AppStore()
