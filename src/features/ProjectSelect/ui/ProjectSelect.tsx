import { observer } from 'mobx-react-lite'

import { useTheme } from '@mui/material'
import {
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { projectStore } from 'entities/Project/model/store/projectStore'
import { Project } from 'entities/Project/model/types/project'

import { useFlatAppRouter } from 'shared/lib/hooks/useFlatAppRouter'
import { RequiredFields } from 'shared/types/helperTypes'
import { AppRoute, FlatAppRoute, RouteParams } from 'shared/types/router'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete'

// TODO: возможно вынести в отдельный файл constant (использовать так же в ProjectForm)
const NEW_PROJECT_PATH = '/projects/new'

export const ProjectSelect = observer(() => {
  const params = useParams<RouteParams>()
  const navigate = useNavigate()
  const location = useLocation()
  const flatAppRoutes = useFlatAppRouter()
  const theme = useTheme()

  const createStyle = (option: Project) => {
    return option.id === 0 ? { color: theme.palette.success.light } : {}
  }

  const handleChange = (value: Project | null) => {
    if (value === null) return
    if (value.id === 0) {
      projectStore.setEditableProject({ ...projectStore.newProject })
      navigate(NEW_PROJECT_PATH)
    } else {
      const { pathname } = location

      if (params.projectId === undefined && pathname !== NEW_PROJECT_PATH) {
        projectStore.setActiveProjectId(value.id)
        return
      }

      const routeObj = flatAppRoutes.find(
        (route) =>
          route.fullPath !== undefined && matchPath(route.fullPath, pathname),
      ) as RequiredFields<FlatAppRoute, 'path'> | undefined
      if (routeObj) {
        navigate(
          generatePath(routeObj.onProjectChangePattern || routeObj.path, {
            ...params,
            projectId: value.id.toString(),
          }),
        )
      }
    }
  }

  return (
    <TMSAutocomplete<Project>
      id="projectList"
      options={[...projectStore.projects, projectStore.newProject]}
      onChange={handleChange}
      contrastText
      value={projectStore.activeProject}
      getOptionLabel={(option: Project | null) =>
        option?.name || 'Create new project'
      }
      isOptionEqualToValue={(option, val) => option.id === val.id}
      placeholder={
        location.pathname === NEW_PROJECT_PATH
          ? 'Creating new project'
          : 'Select Project'
      }
      optionStyle={createStyle}
    />
  )
})
