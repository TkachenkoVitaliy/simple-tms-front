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
}
