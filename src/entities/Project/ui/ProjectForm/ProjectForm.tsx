import { Button, Card, CardActions, TextField } from '@mui/material'
import { projectStore } from 'entities/Project/model/store/projectStore'
import { Project } from 'entities/Project/model/types/project'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { TMSCardContent } from 'shared/ui/TMSCardContent'

const NAME = 'Name'
const DESCRIPTION = 'Description'

const isNameValid = true
const isFormValid = true

export interface ProjectFormProps {
  project: Project
}

export const ProjectForm = observer((props: ProjectFormProps) => {
  const { project } = props

  const [editedProject, setEditedProject] = useState<Project>({
    ...projectStore.newProject,
  })

  useEffect(() => {
    console.log(project)
    setEditedProject(project)
  }, [project])

  const onNameChange = () => {
    console.log('a')
  }

  const onBlurName = () => {
    console.log('b')
  }

  const onDescriptionChange = () => {
    console.log('c')
  }

  const saveForm = () => {
    console.log('save', editedProject)
  }

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        width: '100%',
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
          value={editedProject.name}
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
          value={editedProject.description}
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
          SAVE
        </Button>
      </CardActions>
    </Card>
  )
})
