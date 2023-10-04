/* eslint-disable max-lines */
import { Button, Card, CardActions, TextField } from '@mui/material'
import { projectsStore } from 'entities/Project/model/projectsStore'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProject } from 'shared/types/projectTypes'
import { TMSCardContent } from 'shared/ui/TMSCardContent/TMSCardContent'

enum FormType {
  EDIT = 'save',
  CREATE = 'create',
}
const NAME = 'Name'
const DESCRIPTION = 'Description'
const NEW_PROJECT = {
  id: -1,
  name: '',
  description: '',
}

export const ProjectForm = observer(() => {
  const FORM_TYPE: FormType = projectsStore.activeProject?.id
    ? FormType.EDIT
    : FormType.CREATE

  const [project, setProject] = useState<IProject>({ ...NEW_PROJECT })

  useEffect(() => {
    setProject(projectsStore.activeProject || { ...NEW_PROJECT })
  }, [projectsStore.activeProject])

  const [isNameValid, setNameValidity] = useState<boolean>(true)
  const [haveChanges, setHaveChanges] = useState<boolean>(false)
  const navigate = useNavigate()

  const validateName = (name: string) => {
    setNameValidity(!!name && name.length > 1)
  }

  const isFormValid = useMemo(() => {
    return (
      isNameValid &&
      !!project.name &&
      (FORM_TYPE === FormType.CREATE || haveChanges)
    )
  }, [isNameValid, haveChanges])

  const onNameChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    validateName(e.target.value.trim())
    setProject({ ...project, name: e.target.value })
    setHaveChanges(
      projectsStore.activeProject?.name !== e.target.value ||
        projectsStore.activeProject?.description !== project.description,
    )
  }

  const onBlurName = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    validateName(e.target.value.trim())
  }

  const onDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProject({ ...project, description: e.target.value })
    setHaveChanges(
      projectsStore.activeProject?.name !== project.name ||
        projectsStore.activeProject?.description !== e.target.value,
    )
  }

  const saveForm = async () => {
    const projectForSave = {
      id: FORM_TYPE === FormType.EDIT ? project.id : 0,
      name: project.name.trim(),
      description: project.description,
    }
    if (FORM_TYPE === FormType.EDIT)
      await projectsStore.updateProject(projectForSave)
    if (FORM_TYPE === FormType.CREATE)
      await projectsStore.createProject(projectForSave)
    navigate('/projects')
  }

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        width: '50%',
        margin: '16px auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        padding: '16px',
      }}
    >
      <TMSCardContent>
        <TextField
          type="text"
          autoComplete="off"
          error={!isNameValid}
          required
          fullWidth
          label={NAME}
          variant="outlined"
          value={project.name}
          onChange={onNameChange}
          onBlur={onBlurName}
          helperText={isNameValid ? ' ' : 'Name is required'}
        />
        <TextField
          type="text"
          autoComplete="off"
          fullWidth
          multiline
          minRows={4}
          label={DESCRIPTION}
          variant="outlined"
          value={project.description}
          onChange={onDescriptionChange}
          helperText=" "
        />
      </TMSCardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          disabled={!isFormValid}
          size="large"
          variant="contained"
          onClick={saveForm}
        >
          {FORM_TYPE}
        </Button>
      </CardActions>
    </Card>
  )
})
