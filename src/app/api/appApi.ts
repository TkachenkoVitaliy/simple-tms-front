import { AxiosResponse } from 'axios'

import { LoginResponse } from 'app/model/types/authTypes'

import { API } from 'shared/api'

const URL = '/auth'

export const AppAPI = {
  login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<LoginResponse>> {
    return API.post(URL, { email, password })
  },
}
