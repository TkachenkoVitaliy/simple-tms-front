import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Card, CardActions, List, TextField } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useForm } from 'react-hook-form'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { classNames } from 'shared/lib/utils'
import { FormTextField } from 'shared/ui/FormTextField'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import { TestPlan } from '../../model/types/testPlan'

import styles from './TestPlanForm.module.scss'

export interface TestPlanFormProps {
  className?: string
  testPlan: TestPlan
  selectedCasesNames: string[]
}

type FormInputs = Omit<TestPlan, 'id' | 'projectId' | 'testCases'>

export const TestPlanForm = observer((props: TestPlanFormProps) => {
  const { className, testPlan, selectedCasesNames } = props
  const { testPlanStore } = useProjectStores()

  const methods = useForm<FormInputs>({
    mode: 'onTouched',
    values: {
      name: testPlan.name,
      description: testPlan.description,
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
      formValues.name.trim() !== testPlan.name ||
      formValues.description !== testPlan.description
    return isValid && haveChanges
  }, [formValues, testPlan, isValid])

  const submitForm = async (values: FormInputs) => {
    console.log(values)
  }

  const selectedCasesNamesText = useMemo(() => {
    return selectedCasesNames.join('\n')
  }, [selectedCasesNames])

  return (
    <TMSSkeleton
      className={classNames(styles.skeleton, {}, [className])}
      isLoading={testPlanStore.isLoading}
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
          <TextField
            disabled
            multiline
            value={
              selectedCasesNamesText || '\nselected test cases showed there\n'
            }
            fullWidth
            label="Test Cases"
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
