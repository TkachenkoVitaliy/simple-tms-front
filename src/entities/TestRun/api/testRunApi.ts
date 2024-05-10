import { AxiosResponse } from 'axios'

import { API } from 'shared/api'
import { Page } from 'shared/types/api'

import { TestRun, NewTestRun } from '../model/types/testRun'

const getBaseUrl = (projectId: number) => `projects/${projectId}/runs`

export const TestPlanAPI = {
  getProjectRunsPage(
    projectId: number,
    page: number,
    pageSize: number,
  ): Promise<AxiosResponse<Page<TestRun>>> {
    return API.get(`${getBaseUrl(projectId)}?page=${page}&pageSize=${pageSize}`)
  },

  getById(projectId: number, id: number): Promise<AxiosResponse<TestRun>> {
    return API.get(`${getBaseUrl(projectId)}/${id}`)
  },
  save(
    projectId: number,
    testRun: TestRun | NewTestRun,
  ): Promise<AxiosResponse<TestRun>> {
    return testRun.id === null
      ? this.create(projectId, testRun)
      : this.update(projectId, testRun)
  },
  create(
    projectId: number,
    testRun: NewTestRun,
  ): Promise<AxiosResponse<TestRun>> {
    return API.post(getBaseUrl(projectId), testRun)
  },
  update(projectId: number, testRun: TestRun): Promise<AxiosResponse<TestRun>> {
    return API.put(getBaseUrl(projectId), testRun)
  },
  delete(projectId: number, id: number): Promise<AxiosResponse<unknown>> {
    return API.delete(`${getBaseUrl(projectId)}/${id}`)
  },
}
