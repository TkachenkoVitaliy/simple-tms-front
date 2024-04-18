import { AxiosResponse } from 'axios'

import { TestPlanNode } from 'entities/TestPlan/model/types/testPlanNode'

import { API } from 'shared/api'

const getBaseUrl = (projectId: number) => `projects/${projectId}/tests/nodes`

export const TestPlanNodeAPI = {
  getProjectNodes(projectId: number): Promise<AxiosResponse<TestPlanNode[]>> {
    return API.get(getBaseUrl(projectId))
  },
}
