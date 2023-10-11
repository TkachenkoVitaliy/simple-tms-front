import { NodeModel } from '@minoru/react-dnd-treeview'
import { AxiosResponse } from 'axios'
import API from 'shared/api/api'
import { TestNodeData, UpdateTestsNodeParent } from '../model/types'

const URL = '/tests'

export const TestsAPI = {
  getProjectTestsNodes: async (projectId: number) => {
    const { data }: AxiosResponse<NodeModel<TestNodeData>[]> = await API.get(
      `${URL}/${projectId}`,
    )
    return data
  },

  updateTestsNodeParent: async (update: UpdateTestsNodeParent) => {
    await API.patch(`${URL}/${update.nodeId}`, update)
  },
}
