import { NodeModel } from '@minoru/react-dnd-treeview'
import { AxiosResponse } from 'axios'
import API from 'shared/api/api'
import { TreeData } from 'shared/types/treeData'

const URL = '/tests'

export interface UpdateTestsNodeParent {
  nodeId: number | null
  parentId: number | null
  type: 'CASE' | 'SUITE'
}

export const TestsAPI = {
  getProjectTestsNodes: async (id: number) => {
    const { data }: AxiosResponse<NodeModel<TreeData>[]> = await API.get(
      `${URL}/${id}`,
    )
    return data
  },

  updateTestsNodeParent: async (update: UpdateTestsNodeParent) => {
    const response = await API.patch(`${URL}/${update.nodeId}`, update)
  },
}
