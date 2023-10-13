import { AxiosResponse } from 'axios'
import API from 'shared/api/api'
import { TestSuite, TestSuiteShort } from '../model/types'

const URL = '/suites'

export const TestSuiteAPI = {
  // getListProjectSuites: async (projectId: number) => {
  //   const { data }: AxiosResponse<TestSuiteShort[]> = await API.get(`${URL}`, {
  //     params: { projectId },
  //   })
  //   return data
  // },

  getTestSuite: async (id: number) => {
    const { data }: AxiosResponse<TestSuite> = await API.get(`${URL}/${id}`)
    return data
  },

  createTestSuite: async (testSuite: TestSuite) => {
    const { data }: AxiosResponse<TestSuite> = await API.post(URL, testSuite)
    return data
  },

  updateTestSuite: async (testSuite: TestSuite) => {
    const { data }: AxiosResponse<TestSuite> = await API.put(URL, testSuite)
    return data
  },
}
