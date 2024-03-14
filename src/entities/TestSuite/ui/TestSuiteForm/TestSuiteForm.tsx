import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Card, CardActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { projectStore } from 'entities/Project'
import { testNodeStore } from 'entities/TestNode'

import { classNames } from 'shared/lib/utils'
import { FormAutocomplete } from 'shared/ui/FormAutocomplete'
import { FormTextField } from 'shared/ui/FormTextField'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import { NULL_PARENT } from '../../model/consts'
import { testSuiteStore } from '../../model/store/testSuiteStore'
import { TestSuite, TestSuiteShort } from '../../model/types/testSuite'

import styles from './TestSuiteForm.module.scss'

export interface TestSuiteFormProps {
  className?: string
  testSuite: TestSuite
}

type FormInputs = Omit<TestSuite, 'id' | 'projectId' | 'parentSuiteId'> & {
  parentSuite: TestSuiteShort
}

export const TestSuiteForm = observer((props: TestSuiteFormProps) => {
  const { className, testSuite } = props

  const navigate = useNavigate()

  const methods = useForm<FormInputs>({
    mode: 'onTouched',
    values: {
      parentSuite:
        testNodeStore.shortSuites.find(
          (shortSuite) => shortSuite.id === testSuite.parentSuiteId,
        ) || NULL_PARENT,
      name: testSuite.name,
      description: testSuite.description,
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
      formValues.description !== testSuite.description ||
      (testSuite.parentSuiteId === null
        ? formValues.parentSuite.id !== 0
        : testSuite.parentSuiteId !== formValues.parentSuite?.id)
    return isValid && haveChanges
  }, [formValues, testSuite, isValid])

  const submitForm = async (formValues: FormInputs) => {
    if (projectStore.activeProjectId === null) {
      throw new Error('Please select active project')
    }

    const testSuiteForSave: TestSuite = {
      id: testSuite.id,
      projectId: testSuite.projectId || projectStore.activeProjectId,
      parentSuiteId: formValues.parentSuite.id || null, // TODO нужно брать из селекта
      name: formValues.name.trim(),
      description: formValues.description,
    }
    // await projectStore.saveProject(projectForSave)
    // navigate(`../${projectStore.editableProject.id}`, { relative: 'path' })
    console.log(testSuiteForSave)
    await testSuiteStore.saveSuite(testSuiteForSave)
    navigate(`../${testSuiteStore.testSuite.id.toString()}`, {
      relative: 'path',
    })
    // navigate(`../${testSuite.id}`, { relative: 'path' })
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
          <FormAutocomplete<TestSuiteShort, FormInputs>
            id="testSuiteFormSelectParentSuite"
            label="Parent suite"
            options={testNodeStore.shortSuites.filter(
              (s) => s.id !== testSuite.id,
            )}
            defaultValue={{
              id: 0,
              name: 'Not selected',
            }}
            rules={{
              required: true,
            }}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, val) => option.id === val.id}
            emptyHelperText=" "
            name="parentSuite"
            control={control}
          />
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
