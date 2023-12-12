import { Button, Card, CardActions } from '@mui/material'
import { Project } from 'entities/Project/model/types/project'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { FormTextField } from 'shared/ui/FormTextField'
import { TMSCardContent } from 'shared/ui/TMSCardContent'

const NAME = 'Name'
const DESCRIPTION = 'Description'

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
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        padding: '16px',
      }}
    >
      <FormProvider
        {...methods}
        key={editedProject?.id}
      >
        <TMSCardContent>
          <FormTextField
            name="name"
            control={control}
            label={NAME}
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
            label={DESCRIPTION}
            emptyHelperText=""
            multiline
            minRows={4}
          />
        </TMSCardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            disabled={!canSave}
            size="large"
            variant="contained"
            onClick={handleSubmit((val) => {
              console.log('value', values, val)
            })}
          >
            SAVE
          </Button>
        </CardActions>
      </FormProvider>
    </Card>
  )
})
