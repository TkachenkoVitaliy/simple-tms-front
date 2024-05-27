import { AxiosResponse } from 'axios'

import { API } from 'shared/api'

import { TestPlanNode } from '../model/types/testPlanNode'

const getBaseUrl = (projectId: number) => `projects/${projectId}/tests/nodes`

export const TestPlanNodeAPI = {
  getProjectNodes(projectId: number): Promise<AxiosResponse<TestPlanNode[]>> {
    return API.get(getBaseUrl(projectId))
  },
}
