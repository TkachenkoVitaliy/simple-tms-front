import { AxiosResponse } from 'axios'

import { API } from 'shared/api'

import { NewTestSuite, TestSuite } from '../model/types/testSuite'

const URL = '/suites'

export const TestSuiteAPI = {
  getById(id: number): Promise<AxiosResponse<TestSuite>> {
    return API.get(`${URL}/${id}`)
  },
  save(testSuite: TestSuite | NewTestSuite): Promise<AxiosResponse<TestSuite>> {
    return API.post(URL, testSuite)
  },
  // TODO: мб убрать
  create(testSuite: NewTestSuite): Promise<AxiosResponse<TestSuite>> {
    return API.post(URL, testSuite)
  },
  // TODO: мб убрать
  update(testSuite: TestSuite): Promise<AxiosResponse<TestSuite>> {
    return API.put(URL, testSuite)
  },
}
