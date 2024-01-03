import { NodeModel } from '@minoru/react-dnd-treeview'
import { AxiosResponse } from 'axios'

import { API } from 'shared/api'

import { TestNodeData, UpdateTestNodeParent } from '../model/types/testNode'

const URL = '/tests'

export const TestNodeAPI = {
  getProjectTestNodes(
    projectId: number,
  ): Promise<AxiosResponse<NodeModel<TestNodeData>[]>> {
    return API.get(`${URL}/${projectId}`)
  },

  updateTestNodeParent(update: UpdateTestNodeParent): Promise<AxiosResponse> {
    return API.patch(`${URL}/${update.nodeId}`, update)
  },
}
