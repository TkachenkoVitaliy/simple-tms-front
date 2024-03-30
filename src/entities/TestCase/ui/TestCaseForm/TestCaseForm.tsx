/* eslint-disable max-lines */
import { useMemo, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Card, CardActions, CardHeader, Divider } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  testCasePriorities,
  testCaseTypes,
} from 'entities/TestCase/model/consts'
import { NULL_PARENT, TestSuiteShort } from 'entities/TestSuite'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { classNames } from 'shared/lib/utils'
import { FormAutocomplete } from 'shared/ui/FormAutocomplete'
import { FormMarkdownEditor } from 'shared/ui/FormMarkdownEditor'
import { FormTextField } from 'shared/ui/FormTextField'
import { FormToggleButtonGroup } from 'shared/ui/FormToggleButtonGroup'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import {
  CasePriority,
  CaseType,
  TestCase,
  TestCaseStep,
} from '../../model/types/testCase'
import { StepsEditor } from '../StepsEditor/StepsEditor'

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

export const TestCaseForm = observer((props: TestCaseFormProps) => {
  const { className, testCase } = props

  const { testCaseStore, testNodeStore } = useProjectStores()

  const testCaseCopy: TestCase = JSON.parse(JSON.stringify(testCase))

  const [steps, setSteps] = useState<TestCaseStep[]>(testCaseCopy.testSteps)

  const navigate = useNavigate()

  const methods = useForm<FormInputs>({
    mode: 'onTouched',
    values: {
      parentSuite:
        testNodeStore.shortSuites.find(
          (shortSuite: TestSuiteShort) =>
            shortSuite.id === testCase.parentSuiteId,
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

  const repeatableStepsIsValid = useMemo(() => {
    const repeatableSteps = steps.filter((step) => step.testStep.repeatable)

    if (repeatableSteps.length < 1) {
      return true
    }

    return repeatableSteps
      .map((step) => step.testStep.name)
      .every((name) => !!name)
  }, [steps])

  const canSave = useMemo(() => {
    const haveChanges =
      formValues.name.trim() !== testCase.name ||
      formValues.type !== testCase.type ||
      formValues.priority !== testCase.priority ||
      formValues.preconditions !== testCase.preconditions ||
      (testCase.parentSuiteId === null
        ? formValues.parentSuite.id !== 0
        : testCase.parentSuiteId !== formValues.parentSuite?.id) ||
      JSON.stringify(testCase.testSteps) !== JSON.stringify(steps)

    return isValid && haveChanges && repeatableStepsIsValid
  }, [formValues, testCase, isValid, steps])

  const submitForm = async (formValues: FormInputs) => {
    const testCaseForSave: TestCase = {
      id: testCase.id,
      projectId: testCase.projectId || testCaseStore.projectId,
      parentSuiteId: formValues.parentSuite.id || null,
      name: formValues.name.trim(),
      type: formValues.type || CaseType.AUTO,
      priority: formValues.priority || CasePriority.NORMAL,
      preconditions: formValues.preconditions,
      testSteps: steps,
    }
    await testCaseStore.saveCase(testCaseForSave)
    navigate(`../${testCaseStore.testCase.id.toString()}`, {
      relative: 'path',
    })
  }

  const headerTitle = useMemo(() => {
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
          titleTypographyProps={{
            noWrap: true,
            variant: 'h5',
          }}
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
          <Divider style={{ marginTop: '0' }} />
          <FormMarkdownEditor
            title="Preconditions"
            name="preconditions"
            control={control}
          />
          <div style={{ marginTop: '18px' }}>
            <StepsEditor
              values={steps}
              setValues={setSteps}
            />
          </div>
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
