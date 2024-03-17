import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Card, CardActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { projectStore } from 'entities/Project/model/store/projectStore'
import { Project } from 'entities/Project/model/types/project'

import { classNames } from 'shared/lib/utils'
import { FormTextField } from 'shared/ui/FormTextField'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import styles from './ProjectForm.module.scss'

export interface ProjectFormProps {
  className?: string
  project: Project
}

type FormInputs = Omit<Project, 'id'>

export const ProjectForm = observer((props: ProjectFormProps) => {
  const { className, project } = props

  const navigate = useNavigate()

  const methods = useForm<FormInputs>({
    mode: 'onTouched',
    values: {
      name: project.name || '',
      description: project.description || '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = methods

  const formValues = methods.watch()

  const canSave = useMemo(() => {
    const haveChanges =
      formValues.name.trim() !== project.name ||
      formValues.description !== project.description
    return isValid && haveChanges
  }, [formValues, project, isValid])

  const submitForm = async (formValues: FormInputs) => {
    const projectForSave: Project = {
      id: project.id,
      name: formValues.name.trim(),
      description: formValues.description,
    }
    await projectStore.saveProject(projectForSave)
    navigate(`../${projectStore.editableProject.id}`, { relative: 'path' })
  }

  return (
    <TMSSkeleton
      className={classNames(styles.skeleton, {}, [className])}
      isLoading={projectStore.isLoading}
      width="50%"
    >
      <Card
        variant="elevation"
        raised
        className={classNames(styles.card, {}, [className])}
      >
        <TMSCardContent>
          <FormTextField
            name="name"
            control={control}
            label="Name"
            rules={{
              minLength: {
                value: 3,
                message: 'Name require length > 2',
              },
              required: 'This field is required',
            }}
            emptyHelperText=" "
            validateOnFocus
          />
          <FormTextField
            name="description"
            control={control}
            label="Description"
            emptyHelperText=" "
            multiline
            minRows={4}
          />
        </TMSCardContent>
        <CardActions className={styles.actions}>
          <Button
            disabled={!canSave}
            size="large"
            variant="contained"
            onClick={handleSubmit(submitForm)}
          >
            SAVE
          </Button>
        </CardActions>
      </Card>
    </TMSSkeleton>
  )
})
