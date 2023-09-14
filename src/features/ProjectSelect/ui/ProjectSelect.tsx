import { Autocomplete, TextField, useTheme } from '@mui/material'
import { appRoutes } from 'app/providers/AppRouter/model/appRoutes'
import { appStore } from 'app/store/AppStore'
import { observer } from 'mobx-react-lite'
import {
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { IProject } from 'shared/types/projectTypes'
import { IAppRoute, RouteParams } from 'shared/types/routerTypes'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete/TMSAutocomplete'

function flattenRoutes(routes: IAppRoute[], parentPath?: string) {
  let flattenedRoutes: { path: string; onProjectChangePattern?: string }[] = []

  routes.forEach((route) => {
    const routePath = parentPath
      ? [parentPath, route.path()].join('/')
      : route.path()

    flattenedRoutes.push({
      path: routePath,
      onProjectChangePattern: route.onProjectChangePattern,
    })

    if (route.children) {
      const childRoutes = flattenRoutes(route.children, routePath)
      flattenedRoutes = flattenedRoutes.concat(childRoutes)
    }
  })

  return flattenedRoutes
}

export const ProjectSelect = observer(() => {
  const NEW_PROJECT_PATH = '/projects/0'
  const params = useParams<RouteParams>()

  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (value: IProject | null) => {
    if (value === null) return
    if (value.id === 0) {
      appStore.setActiveProject(null)
      navigate(NEW_PROJECT_PATH)
      return
    }
    if (value.id !== 0) {
      const id = value.id.toString()
      const { pathname } = location
      const routeObj = flattenRoutes(appRoutes).find((item) =>
        matchPath(item.path, pathname),
      )
      if (routeObj) {
        navigate(
          generatePath(routeObj.onProjectChangePattern || routeObj.path, {
            ...params,
            projectId: id,
          }),
        )
      }
    }
    appStore.setActiveProject(value)
  }

  const theme = useTheme()
  const createColor = theme.palette.success.light

  const createStyle = (option: IProject) => {
    return option.id === 0 ? { color: createColor } : {}
  }

  return (
    <TMSAutocomplete<IProject>
      id="projectList"
      options={appStore.projects}
      onChange={handleChange}
      contrastText
      value={appStore.activeProject}
      getOptionLabel={(option: IProject | null) => option?.name || ''}
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
