import { AxiosResponse } from 'axios'
import API from 'shared/api/api'
import { IProject } from 'shared/types/projectTypes'

const URL = '/projects'

export const ProjectAPI = {
  getAllProjects: async () => {
    const { data }: AxiosResponse<IProject[]> = await API.get(URL)
    return data
  },

  getProject: async (id: number) => {
    const { data }: AxiosResponse<IProject> = await API.get(`${URL}/${id}`)
    return data
  },

  createProject: async (project: IProject) => {
    const { data }: AxiosResponse<IProject> = await API.post(URL, project)
    return data
  },

  updateProject: async (project: IProject) => {
    const { data }: AxiosResponse<IProject> = await API.put(URL, project)
    return data
  },

  deleteProject: async (id: number) => {
    const response: AxiosResponse = await API.delete(`${URL}/${id}`)
    return response.status === 204
  },
}
