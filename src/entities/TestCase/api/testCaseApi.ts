import { AxiosResponse } from 'axios'

import { API } from 'shared/api'

import { NewTestCase, TestCase } from '../model/types/testCase'

const URL = '/cases'

export const TestCaseAPI = {
  getById(id: number): Promise<AxiosResponse<TestCase>> {
    return API.get(`${URL}/${id}`)
  },
  save(testCase: TestCase | NewTestCase): Promise<AxiosResponse<TestCase>> {
    return testCase.id == null ? this.create(testCase) : this.update(testCase)
  },
  create(testCase: NewTestCase): Promise<AxiosResponse<TestCase>> {
    return API.post(URL, testCase)
  },
  // TODO: мб убрать
  update(testCase: TestCase): Promise<AxiosResponse<TestCase>> {
    return API.put(URL, testCase)
  },
}
