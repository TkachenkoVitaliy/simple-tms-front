import { projectStore } from 'entities/Project/model/store/projectStore'
import { Project } from 'entities/Project/model/types/project'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete'

// TODO: выглядит как гавно идея, нужно продумать другой вариант
const NEW_PROJECT_PATH = '/projects/0'

export const ProjectSelect = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()
  // return <div>ProjectSelect</div>

  const createStyle = (option: Project) => {
    return option.id === 0 ? { color: 'todo sdelat' } : {}
  }

  const handleChange = useCallback((value: Project | null) => {
    console.log(value)
  }, [])

  return (
    <TMSAutocomplete<Project>
      id="projectList"
      options={projectStore.projects}
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
