import { AxiosResponse } from 'axios'

import { LoginResponse } from 'app/model/types/authTypes'

import { API } from 'shared/api'

export const AuthApi = {
  login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<LoginResponse>> {
    return API.post('signin', { email, password })
  },
}
