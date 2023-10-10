/* eslint-disable max-lines */
import { Button, Card, CardActions, CardHeader, Divider } from '@mui/material'
import { suites } from 'mock/sample_data'
import { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Location } from 'history'
import { SuiteOption, ToggleButtonOption } from 'shared/types/autocompleteTypes'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete/TMSAutocomplete'
import { priorities } from 'shared/consts/priorities'
import { TMSCardContent } from 'shared/ui/TMSCardContent/TMSCardContent'
import { TMSToggleButtonGroup } from 'shared/ui/TMSToggleButtonGroup/TMSToggleButtonGroup'
import { testTypes } from 'shared/consts/testTypes'
import { LocationState } from 'shared/types/routerTypes'
import { TMSTextField } from 'shared/ui/TMSTextField/TMSTextField'
import { PreconditionsEditor } from '../PreconditionsEditor/PreconditionsEditor'
import { StepData, StepsEditor } from '../StepsEditor/StepsEditor'

export const TestCaseForm = memo(() => {
  const location = useLocation() as Location<LocationState>

  const suiteId = location.state?.parentId?.toString()

  const headerTitle = location.state?.title || 'Create Test Case'

  const [suite, setSuite] = useState<SuiteOption | null>(
    suiteId === undefined
      ? suites[0]
      : suites.find((suite) => suite.id.toString() === suiteId) || suites[0],
  )

  const onChangeSuite = (newValue: SuiteOption | null) => {
    if (newValue) {
      setSuite(newValue)
    }
  }

  const [priority, setPriority] = useState<ToggleButtonOption['value']>(
    priorities[1].value,
  )

  const [testType, setTestType] = useState<ToggleButtonOption['value']>(
    testTypes[0].value,
  )

  const [caseTitle, setCaseTitle] = useState<string>('')

  const [preconditions, setPreconditions] = useState<string>('')

  const [steps, setSteps] = useState<StepData[]>([
    {
      id: '0',
      step: {
        action: '',
        expected: '',
      },
    },
  ])

  // RESET
  useEffect(() => {
    setSuite(
      suiteId === undefined
        ? suites[0]
        : suites.find((suiteItem) => suiteItem.id.toString() === suiteId) ||
            suites[0],
    )
    setPriority(priorities[1].value)
    setCaseTitle('')
    setPreconditions('')
    setSteps([
      {
        id: '0',
        step: {
          action: '',
          expected: '',
        },
      },
    ])
  }, [location])

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        minWidth: '420px',
        width: '100%',
        maxWidth: '1800px',
        margin: '16px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        padding: '16px',
      }}
    >
      <CardHeader
        key={location.pathname}
        style={{
          flexWrap: 'wrap',
          rowGap: '20px',
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr max-content',
        }}
        title={headerTitle}
        titleTypographyProps={{
          noWrap: true,
          variant: 'h5',
        }}
        avatar={
          <TMSToggleButtonGroup
            key={location.pathname}
            options={testTypes}
            value={testType}
            onChange={(v) => setTestType(v)}
            buttonAlign="center"
          />
        }
        action={
          <TMSToggleButtonGroup
            key={location.pathname}
            options={priorities}
            value={priority}
            onChange={(v) => setPriority(v)}
            marginBetween="10px"
            buttonAlign="center"
            buttonWidth="120px"
          />
        }
      />
      <TMSCardContent>
        <TMSAutocomplete<SuiteOption>
          id="testCaseFormSelectParentSuite"
          label="Parent suite"
          options={suites}
          onChange={onChangeSuite}
          required
          value={suite}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, val) => option.id === val.id}
        />
        <TMSTextField
          required
          fullWidth
          forceTrim
          label="Title"
          value={caseTitle}
          onChange={(val) => setCaseTitle(val)}
          errorText="Min length Title is 2 symbols"
          validateFunc={(newValue) => !!newValue && newValue.length >= 2}
        />
        <Divider style={{ marginTop: '0' }} />
        <PreconditionsEditor
          key={location.pathname}
          preconditions={preconditions}
          setPreconditions={setPreconditions}
        />
        <Divider />
        <div style={{ marginTop: '18px' }}>
          <StepsEditor
            data={steps}
            setData={setSteps}
          />
        </div>
      </TMSCardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => {}}
        >
          Create
        </Button>
      </CardActions>
    </Card>
  )
})
