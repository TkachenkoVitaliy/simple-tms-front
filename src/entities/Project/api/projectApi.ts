import { API } from 'shared/api'
import { AxiosResponse } from 'axios'
import { NewProject, Project } from '../model/types/project'

const URL = '/projects'

export const ProjectAPI = {
  getAll(): Promise<AxiosResponse<Project[]>> {
    return API.get(URL)
  },
  getById(id: number): Promise<AxiosResponse<Project>> {
    return API.get(`${URL}/${id}`)
  },
  create(project: NewProject): Promise<AxiosResponse<Project>> {
    return API.post(URL, project)
  },
  update(project: Project): Promise<AxiosResponse<Project>> {
    return API.put(URL, project)
  },
  delete(id: number): Promise<AxiosResponse> {
    return API.delete(`${URL}/${id}`)
  },
}
