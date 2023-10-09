import { NodeModel } from '@minoru/react-dnd-treeview'
import { AxiosResponse } from 'axios'
import API from 'shared/api/api'
import { TreeData } from 'shared/types/treeData'

const URL = '/tests'

export const TestsAPI = {
  getProjectTestsNodes: async (id: number) => {
    const { data }: AxiosResponse<NodeModel<TreeData>[]> = await API.get(
      `${URL}/${id}`,
    )
    return data
  },
}
