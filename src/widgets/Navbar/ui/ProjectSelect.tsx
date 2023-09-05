import { Autocomplete, TextField, useTheme } from '@mui/material'
import { appStore } from 'app/store/AppStore'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import { IProject } from 'shared/types/projectTypes'

export const ProjectSelect = observer(() => {
  const NEW_PROJECT_PATH = '/project/0'

  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const createColor = theme.palette.success.light
  const { contrastText } = theme.palette.primary

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
      defaultValue={appStore.activeProject}
      value={appStore.activeProject}
      onChange={(_, value) => {
        if (value === null) return
        if (value.id === 0) {
          navigate(NEW_PROJECT_PATH, {
            replace: false,
            relative: 'path',
          })
          appStore.setActiveProject(null)
          return
        }
        appStore.setActiveProject(value)
      }}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id
      }}
      getOptionLabel={(option: IProject | null) => option?.name || ''}
      options={appStore.projects}
      sx={{ minWidth: '18%', color: contrastText }}
      renderOption={(props, option) => {
        return (
          <li
            {...props}
            style={option.id === 0 ? { color: createColor } : {}}
          >
            {option.name}
          </li>
        )
      }}
      renderInput={(params) => {
        // eslint-disable-next-line no-param-reassign

        return (
          <TextField
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
