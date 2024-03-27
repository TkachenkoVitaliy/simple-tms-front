import { AxiosResponse } from 'axios'

import { API } from 'shared/api'
import { Page } from 'shared/types/api'

import { TestStepRepeatable } from '../model/types/testCase'

const URL = '/steps'

export const TestStepApi = {
  getRepeatableSteps(
    page: number,
    pageSize: number,
  ): Promise<AxiosResponse<Page<TestStepRepeatable>>> {
    return API.get(`${URL}/?page=${page}&pageSize=${pageSize}`)
  },
}
