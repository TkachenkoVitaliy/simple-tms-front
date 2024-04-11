import { AxiosResponse } from 'axios'

import { API } from 'shared/api'
import { Page } from 'shared/types/api'

import { NewTestPlan, TestPlan } from '../model/types/testPlan'

const getBaseUrl = (projectId: number) => `projects/${projectId}/plans`

export const TestPlanAPI = {
  getProjectPlansPage(
    projectId: number,
    page: number,
    pageSize: number,
  ): Promise<AxiosResponse<Page<TestPlan>>> {
    return API.get(`${getBaseUrl(projectId)}?page=${page}&pageSize=${pageSize}`)
  },
  getById(projectId: number, id: number): Promise<AxiosResponse<TestPlan>> {
    return API.get(`${getBaseUrl(projectId)}/${id}`)
  },
  save(
    projectId: number,
    testPlan: TestPlan | NewTestPlan,
  ): Promise<AxiosResponse<TestPlan>> {
    return testPlan.id === null
      ? this.create(projectId, testPlan)
      : this.update(projectId, testPlan)
  },
  create(
    projectId: number,
    testPlan: NewTestPlan,
  ): Promise<AxiosResponse<TestPlan>> {
    return API.post(getBaseUrl(projectId), testPlan)
  },
  update(
    projectId: number,
    testPlan: TestPlan,
  ): Promise<AxiosResponse<TestPlan>> {
    return API.put(getBaseUrl(projectId), testPlan)
  },
  delete(projectId: number, id: number): Promise<AxiosResponse<unknown>> {
    return API.delete(`${getBaseUrl(projectId)}/${id}`)
  },
}
