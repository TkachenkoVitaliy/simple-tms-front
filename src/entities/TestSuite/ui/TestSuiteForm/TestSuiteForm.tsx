import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Card, CardActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { TestSuite } from 'entities/TestSuite/model/types/testSuite'

import { classNames } from 'shared/lib/utils'
import { FormTextField } from 'shared/ui/FormTextField'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import styles from './TestSuiteForm.module.scss'

export interface TestSuiteFormProps {
  className?: string
  testSuite: TestSuite
}

type FormInputs = Omit<TestSuite, 'id' | 'projectId' | 'parentSuiteId'>

export const TestSuiteForm = observer((props: TestSuiteFormProps) => {
  const { className, testSuite } = props

  const navigate = useNavigate()

  const methods = useForm<FormInputs>({
    mode: 'onTouched',
    values: {
      name: testSuite.name || '',
      description: testSuite.description || '',
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
      formValues.name.trim() !== testSuite.name ||
      formValues.description !== testSuite.description
    return isValid && haveChanges
  }, [formValues, testSuite, isValid])

  const submitForm = async (formValues: FormInputs) => {
    const testSuiteForSave: TestSuite = {
      id: testSuite.id,
      projectId: testSuite.projectId,
      parentSuiteId: 1111, // TODO нужно брать из селекта
      name: formValues.name.trim(),
      description: formValues.description,
    }
    // await projectStore.saveProject(projectForSave)
    // navigate(`../${projectStore.editableProject.id}`, { relative: 'path' })
    console.log(testSuiteForSave)
    navigate(`../${testSuite.id}`, { relative: 'path' })
  }

  return (
    <TMSSkeleton
      className={classNames(styles.skeleton, {}, [className])}
      isLoading={false}
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
            onClick={handleSubmit(submitForm)}
          >
            SAVE
          </Button>
        </CardActions>
      </Card>
    </TMSSkeleton>
  )
})
