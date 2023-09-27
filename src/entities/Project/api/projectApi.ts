import { AxiosResponse } from 'axios'
import API from 'shared/api/api'
import { IProject } from 'shared/types/projectTypes'

const URL = '/projects'

export async function getAllProjects() {
  const { data }: AxiosResponse<IProject[]> = await API.get(URL)
  return data
}

export async function getProject(id: number) {
  const { data }: AxiosResponse<IProject> = await API.get(`${URL}/${id}`)
  return data
}

export async function createProject(project: IProject) {
  const { data }: AxiosResponse<IProject> = await API.post(URL, project)
  return data
}

export async function updateProject(project: IProject) {
  const { data }: AxiosResponse<IProject> = await API.put(URL, project)
  return data
}
