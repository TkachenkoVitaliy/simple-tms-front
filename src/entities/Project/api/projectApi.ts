import { AxiosResponse } from 'axios'

import { API } from 'shared/api'

import { NewProject, Project } from '../model/types/project'

const URL = '/projects'

export const ProjectAPI = {
  getAll(): Promise<AxiosResponse<Project[]>> {
    return API.get(URL)
  },
  getById(id: number): Promise<AxiosResponse<Project>> {
    return API.get(`${URL}/${id}`)
  },
  save(project: Project | NewProject): Promise<AxiosResponse<Project>> {
    return project.id === null ? this.create(project) : this.update(project)
  },
  // TODO: мб убрать
  create(project: NewProject): Promise<AxiosResponse<Project>> {
    return API.post(URL, project)
  },
  // TODO: мб убрать
  update(project: Project): Promise<AxiosResponse<Project>> {
    return API.put(URL, project)
  },
  delete(id: number): Promise<AxiosResponse> {
    return API.delete(`${URL}/${id}`)
  },
}
