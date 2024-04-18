import { NodeModel } from '@minoru/react-dnd-treeview'
import { AxiosResponse } from 'axios'

import { API } from 'shared/api'

import { TestNodeData, UpdateTestNodeParent } from '../model/types/testNode'

const TESTS = 'tests'

export const TestNodeAPI = {
  getProjectTestNodes(
    projectId: number,
  ): Promise<AxiosResponse<NodeModel<TestNodeData>[]>> {
    return API.get(`projects/${projectId}/${TESTS}`)
  },

  updateTestNodeParent(
    update: UpdateTestNodeParent,
    projectId: number,
  ): Promise<AxiosResponse> {
    return API.patch(`projects/${projectId}/${TESTS}/${update.nodeId}`, update)
  },
}
