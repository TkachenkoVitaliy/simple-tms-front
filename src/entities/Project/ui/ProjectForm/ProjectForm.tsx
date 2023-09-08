/* eslint-disable max-lines */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@mui/material'
import { appStore } from 'app/store/AppStore'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProject } from 'shared/types/projectTypes'

interface ProjectFormProps {
  project?: IProject
}

enum FormType {
  EDIT = 'save',
  CREATE = 'create',
}

export const ProjectForm = observer((props: ProjectFormProps) => {
  const FORM_TYPE: FormType = props?.project?.id
    ? FormType.EDIT
    : FormType.CREATE
  const NAME = 'Name'
  const DESCRIPTION = 'Description'

  const [project, setProject] = useState<IProject>(
    props.project || { id: -1, name: '', description: '' },
  )

  useEffect(() => {
    if (project.id !== -1 && props.project === undefined) {
      setProject({ id: -1, name: '', description: '' })
    }
  }, [props])

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
      props?.project?.name !== e.target.value ||
        props?.project?.description !== project.description,
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
      props?.project?.name !== project.name ||
        props?.project?.description !== e.target.value,
    )
  }

  const saveForm = () => {
    if (FORM_TYPE === FormType.CREATE) {
      const maxId = appStore.projects
        .map((proj) => proj.id)
        .reduce((a, b) => Math.max(a, b), -Infinity)
      const projectWithId = {
        id: maxId + 1,
        name: project.name.trim(),
        description: project.description,
      }
      appStore.setProjects([projectWithId, ...appStore.projects])
      appStore.setActiveProject(projectWithId)
    }
    if (FORM_TYPE === FormType.EDIT) {
      const newProjects: IProject[] = []
      appStore.projects.forEach((item) => {
        if (item.id === project.id) {
          newProjects.push({
            id: project.id,
            name: project.name.trim(),
            description: project.description,
          })
        } else {
          newProjects.push(item)
        }
      })
      appStore.setProjects(newProjects)
      appStore.setActiveProject(project)
    }
    navigate('/projects')
  }

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        width: '35%',
        margin: '16px auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        padding: '16px',
      }}
    >
      <CardContent>
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
          sx={{ mb: 3 }}
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
      </CardContent>
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
