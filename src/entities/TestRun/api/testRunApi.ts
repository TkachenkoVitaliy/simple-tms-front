import { AxiosResponse } from 'axios'

import { API } from 'shared/api'
import { Page } from 'shared/types/api'

import { TestRun, CreateTestRunRequest } from '../model/types/testRun'

const getBaseUrl = (projectId: number) => `projects/${projectId}/runs`

export const TestRunAPI = {
  getProjectRunsPage(
    projectId: number,
    page: number,
    pageSize: number,
  ): Promise<AxiosResponse<Page<TestRun>>> {
    return API.get(`${getBaseUrl(projectId)}?page=${page}&pageSize=${pageSize}`)
  },

  getById(projectId: number, id: string): Promise<AxiosResponse<TestRun>> {
    return API.get(`${getBaseUrl(projectId)}/${id}`)
  },
  create(
    projectId: number,
    createTestRunRequest: CreateTestRunRequest,
  ): Promise<AxiosResponse<TestRun>> {
    return API.post(getBaseUrl(projectId), createTestRunRequest)
  },
  update(projectId: number, testRun: TestRun): Promise<AxiosResponse<TestRun>> {
    return API.put(getBaseUrl(projectId), testRun)
  },
  delete(projectId: number, id: string): Promise<AxiosResponse<unknown>> {
    return API.delete(`${getBaseUrl(projectId)}/${id}`)
  },
}
