import { projectStore } from 'entities/Project/model/store/projectStore'
import { Project } from 'entities/Project/model/types/project'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import {
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useFlatAppRouter } from 'shared/lib/hooks/useFlatAppRouter'
import { RequiredFields } from 'shared/types/helperTypes'
import { AppRoute, RouteParams } from 'shared/types/router'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete'

// TODO: выглядит как гавно идея, нужно продумать другой вариант
const NEW_PROJECT_PATH = '/projects/new'

export const ProjectSelect = observer(() => {
  const params = useParams<RouteParams>()
  const navigate = useNavigate()
  const location = useLocation()
  const flatAppRoutes = useFlatAppRouter()
  // return <div>ProjectSelect</div>

  const createStyle = (option: Project) => {
    return option.id === 0 ? { color: 'todo sdelat' } : {}
  }

  const handleChange = useCallback(
    (value: Project | null) => {
      if (value === null) return
      if (value.id === 0) {
        navigate(NEW_PROJECT_PATH)
      } else {
        const { pathname } = location

        if (params.projectId === undefined) {
          projectStore.setActiveProjectId(value.id)
          return
        }

        const routeObj = flatAppRoutes.find(
          (route) =>
            route.path !== undefined && matchPath(route.path, pathname),
        ) as RequiredFields<AppRoute, 'path'> | undefined
        if (routeObj) {
          navigate(
            generatePath(routeObj.onProjectChangePattern || routeObj.path, {
              ...params,
              projectId: value.id.toString(),
            }),
          )
        }
      }
    },
    [projectStore.setActiveProjectId, params, location],
  )

  return (
    <TMSAutocomplete<Project>
      id="projectList"
      options={[...projectStore.projects, projectStore.newProject]}
      onChange={handleChange}
      contrastText
      value={projectStore.activeProject}
      getOptionLabel={(option: Project | null) => option?.name || ''}
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
