import { Button, Card, CardActions } from '@mui/material'
import { NewProject, Project } from 'entities/Project/model/types/project'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { FormTextField } from 'shared/ui/FormTextField'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import styles from './ProjectForm.module.scss'
import { projectStore } from 'entities/Project/model/store/projectStore'

export interface ProjectFormProps {
  project: Project
}

interface FormInputs extends FieldValues {
  name: string
  description: string
}

export const ProjectForm = observer((props: ProjectFormProps) => {
  const { project } = props

  const [editedProject, setEditedProject] = useState<Project | null>(null)

  useEffect(() => {
    setEditedProject(project)
  }, [project])

  const methods = useForm<FormInputs>({
    mode: 'onTouched',
    values: {
      name: editedProject?.name || '',
      description: editedProject?.description || '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = methods

  const values = methods.watch()

  const canSave = useMemo(() => {
    const haveChanges =
      values.name.trim() !== editedProject?.name ||
      values.description !== editedProject?.description
    return isValid && haveChanges
  }, [values, editedProject, isValid])

  return (
    <Card
      variant="elevation"
      raised
      className={styles.card}
    >
      {/* <FormProvider
        {...methods}
        key={editedProject?.id}
      > */}
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
          emptyHelperText=""
          validateOnFocus
        />
        <FormTextField
          name="description"
          control={control}
          label="Description"
          emptyHelperText=""
          multiline
          minRows={4}
        />
      </TMSCardContent>
      <CardActions className={styles.actions}>
        <Button
          disabled={!canSave}
          size="large"
          variant="contained"
          onClick={handleSubmit((val) => {
            if (editedProject != null) {
              const project: Project | NewProject = {
                id: editedProject.id || null,
                ...val,
              }
              projectStore.saveProject(project)
            }
          })}
        >
          SAVE
        </Button>
      </CardActions>
      {/* </FormProvider> */}
    </Card>
  )
})
