/* eslint-disable max-lines */
import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Card, CardActions, CardHeader } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { projectStore } from 'entities/Project'
import {
  testCasePriorities,
  testCaseTypes,
} from 'entities/TestCase/model/consts'
import { testNodeStore } from 'entities/TestNode'
import { NULL_PARENT, TestSuiteShort } from 'entities/TestSuite'

import { classNames } from 'shared/lib/utils'
import { FormAutocomplete } from 'shared/ui/FormAutocomplete'
import { FormTextField } from 'shared/ui/FormTextField'
import { FormToggleButtonGroup } from 'shared/ui/FormToggleButtonGroup'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import { testCaseStore } from '../../model/store/testCaseStore'
import { CasePriority, CaseType, TestCase } from '../../model/types/testCase'

import styles from './TestCaseForm.module.scss'

export interface TestCaseFormProps {
  className?: string
  testCase: TestCase
}

type FormInputs = Omit<
  TestCase,
  'id' | 'projectId' | 'parentSuiteId' | 'testSteps'
> & {
  parentSuite: TestSuiteShort
}

const EDIT_HEADER = 'Edit Test Case'
const CREATE_HEADER = 'Create Test Case'
const titleTypographyProps = {
  noWrap: true,
  variant: 'h5',
}

export const TestCaseForm = observer((props: TestCaseFormProps) => {
  const { className, testCase } = props

  const navigate = useNavigate()

  const methods = useForm<FormInputs>({
    mode: 'onTouched',
    values: {
      parentSuite:
        testNodeStore.shortSuites.find(
          (shortSuite) => shortSuite.id === testCase.parentSuiteId,
        ) || NULL_PARENT,
      name: testCase.name,
      type: testCase.type,
      priority: testCase.priority,
      preconditions: testCase.preconditions,
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
      formValues.name.trim() !== testCase.name ||
      formValues.type !== testCase.type ||
      formValues.priority !== testCase.priority ||
      formValues.preconditions !== testCase.preconditions ||
      (testCase.parentSuiteId === null
        ? formValues.parentSuite.id !== 0
        : testCase.parentSuiteId !== formValues.parentSuite?.id)

    console.log(
      'canSave',
      isValid,
      haveChanges,
      JSON.stringify(formValues),
      JSON.stringify(testCase),
    )
    return isValid && haveChanges
  }, [formValues, testCase, isValid])

  const submitForm = async (formValues: FormInputs) => {
    if (projectStore.activeProjectId === null) {
      throw new Error('Please select active project')
    }

    console.log('formValues', formValues)
    console.log('testCase', testCase)

    const testCaseForSave: TestCase = {
      id: testCase.id,
      projectId: testCase.projectId || projectStore.activeProjectId,
      parentSuiteId: formValues.parentSuite.id || null,
      name: formValues.name.trim(),
      type: formValues.type || CaseType.AUTO,
      priority: formValues.priority || CasePriority.NORMAL,
      preconditions: formValues.preconditions,
      testSteps: [],
    }

    console.log(testCaseForSave)
    await testCaseStore.saveCase(testCaseForSave)
    navigate(`../${testCaseStore.testCase.id.toString()}`, {
      relative: 'path',
    })
  }

  const headerTitle = useMemo(() => {
    console.log(JSON.stringify(testCase))
    return testCase.id === 0 || testCase.id === null
      ? CREATE_HEADER
      : EDIT_HEADER
  }, [testCase])

  return (
    <TMSSkeleton
      className={classNames(styles.skeleton, {}, [className])}
      isLoading={false}
      width="50%"
    >
      <Card
        variant="elevation"
        data-testid="card"
        raised
        className={classNames(styles.card, {}, [className])}
      >
        <CardHeader
          className={styles.header}
          title={headerTitle}
          titleTypographyProps={{ titleTypographyProps }}
          avatar={
            <FormToggleButtonGroup
              name="type"
              control={control}
              options={testCaseTypes}
            />
          }
          action={
            <FormToggleButtonGroup
              name="priority"
              control={control}
              options={testCasePriorities}
              marginBetween="10px"
              buttonWidth="120px"
            />
          }
        />
        <TMSCardContent>
          <FormAutocomplete<TestSuiteShort, FormInputs>
            id="testCaseFormSelectParentSuite"
            label="Parent suite"
            options={testNodeStore.shortSuites}
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
            name="preconditions"
            control={control}
            label="Preconditions"
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
