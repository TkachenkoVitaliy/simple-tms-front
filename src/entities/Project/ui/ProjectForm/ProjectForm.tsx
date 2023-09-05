/* eslint-disable max-lines */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  useTheme,
} from '@mui/material'
import { appStore } from 'app/store/AppStore'
import { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProject } from 'shared/types/projectTypes'

interface ProjectFormProps {
  project?: IProject
}

export const ProjectForm = memo((props: ProjectFormProps) => {
  const [project, setProject] = useState<IProject>(
    props.project || { id: -1, name: '', description: '' },
  )
  const [isNameValid, setNameValidity] = useState<boolean>(true)

  const navigate = useNavigate()
  const theme = useTheme()

  const NAME = 'Name'
  const DESCRIPTION = 'Description'

  const validateName = (name: string) => {
    setNameValidity(!!name && name.length > 1)
    console.log(!!name && name.length > 1)
  }

  const isFormValid = useMemo(
    () => isNameValid && !!project.name,
    [isNameValid],
  )

  const onNameChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    validateName(e.target.value.trim())
    setProject({ ...project, name: e.target.value.trim() })
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
      {/* <CardHeader
        title={project.name || 'Create new project'}
        sx={{
          color: theme.palette.text.primary,
          textAlign: 'center',
        }}
      >
        Create new project
      </CardHeader> */}
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
          onClick={() => {
            const maxId = appStore.projects
              .map((proj) => proj.id)
              .reduce((a, b) => Math.max(a, b), -Infinity)
            const projectWithId = { ...project, id: maxId + 1 }
            appStore.setProjects([...appStore.projects, projectWithId])
            navigate('/projects', { replace: true })
          }}
        >
          Create
        </Button>
      </CardActions>
    </Card>
  )
})
