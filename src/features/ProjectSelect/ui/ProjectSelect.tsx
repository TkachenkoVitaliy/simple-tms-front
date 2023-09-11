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
  const NEW_PROJECT_PATH = '/project/0'
  const params = useParams<RouteParams>()

  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const createColor = theme.palette.success.light
  const { contrastText } = theme.palette.primary

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: IProject | null,
  ) => {
    if (value === null) return
    if (value.id === 0) {
      appStore.setActiveProject(null)
      navigate(NEW_PROJECT_PATH)
      return
    }
    if (value.id !== 0) {
      const id = value.id.toString()
      const { pathname } = location
      const routes = flattenRoutes(appRoutes)
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

  return (
    <Autocomplete
      id="projectsList"
      disablePortal
      forcePopupIcon={false}
      clearIcon=""
      selectOnFocus
      blurOnSelect
      clearOnBlur
      handleHomeEndKeys
      value={appStore.activeProject}
      onChange={handleChange}
      inputValue={appStore.activeProject?.name || ''}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id
      }}
      getOptionLabel={(option: IProject | null) => option?.name || ''}
      options={appStore.projects}
      sx={{ minWidth: '18%', color: contrastText }}
      renderOption={(props, option) => {
        return (
          <li
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            style={option.id === 0 ? { color: createColor } : {}}
          >
            {option.name}
          </li>
        )
      }}
      renderInput={(params) => {
        return (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            fullWidth
            margin="none"
            placeholder={
              location.pathname === NEW_PROJECT_PATH
                ? 'Creating new project'
                : 'Select Project'
            }
            InputProps={{
              ...params.InputProps,
              className: 'contrast',
            }}
            sx={{ color: `${contrastText} !important` }}
            variant="outlined"
            style={{ color: `${contrastText} !important` }}
          />
        )
      }}
    />
  )
})
