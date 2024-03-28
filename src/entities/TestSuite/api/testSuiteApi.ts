import { AxiosResponse } from 'axios'

import { API } from 'shared/api'

import { NewTestSuite, TestSuite } from '../model/types/testSuite'

const getProjectUrl = (projectId: number) => `projects/${projectId}/suites`

export const TestSuiteAPI = {
  getById(projectId: number, id: number): Promise<AxiosResponse<TestSuite>> {
    return API.get(`${getProjectUrl(projectId)}/${id}`)
  },
  save(
    projectId: number,
    testSuite: TestSuite | NewTestSuite,
  ): Promise<AxiosResponse<TestSuite>> {
    return testSuite.id === null
      ? this.create(projectId, testSuite)
      : this.update(projectId, testSuite)
  },
  // TODO: мб убрать
  create(
    projectId: number,
    testSuite: NewTestSuite,
  ): Promise<AxiosResponse<TestSuite>> {
    return API.post(getProjectUrl(projectId), testSuite)
  },
  // TODO: мб убрать
  update(
    projectId: number,
    testSuite: TestSuite,
  ): Promise<AxiosResponse<TestSuite>> {
    return API.put(getProjectUrl(projectId), testSuite)
  },
}
