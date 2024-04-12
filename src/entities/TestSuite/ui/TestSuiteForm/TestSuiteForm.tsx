import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Card, CardActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { classNames } from 'shared/lib/utils'
import { FormAutocomplete } from 'shared/ui/FormAutocomplete'
import { FormTextField } from 'shared/ui/FormTextField'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import { NULL_PARENT } from '../../model/consts'
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

  const { testSuiteStore, testNodeStore } = useProjectStores()
  const navigate = useNavigate()

  const methods = useForm<FormInputs>({
    mode: 'onTouched',
    values: {
      parentSuite:
        testNodeStore.shortSuites.find(
          (shortSuite: TestSuiteShort) =>
            shortSuite.id === testSuite.parentSuiteId,
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
    const testSuiteForSave: TestSuite = {
      id: testSuite.id,
      projectId: testSuite.projectId || testSuiteStore.projectId,
      parentSuiteId: formValues.parentSuite.id || null, // TODO нужно брать из селекта
      name: formValues.name.trim(),
      description: formValues.description,
    }
    await testSuiteStore.saveSuite(testSuiteForSave)
    navigate(`../${testSuiteStore.testSuite.id.toString()}`, {
      relative: 'path',
    })
  }

  return (
    <TMSSkeleton
      className={classNames(styles.skeleton, {}, [className])}
      isLoading={testSuiteStore.isLoading}
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
              (s: TestSuiteShort) => s.id !== testSuite.id,
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
            label="Title"
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
