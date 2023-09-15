import { Button, Card, CardActions, CardHeader } from '@mui/material'
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

interface LocationState {
  id?: string | number
}

export const TestCaseForm = memo(() => {
  // <>
  //   !!!<div>TestSuite-Select</div>
  //   !!!<div>Priority-Select</div>
  //   !!!<div>Type-Select</div>
  //   <div>Title-TextField</div>
  //   <div>Preconditions-TextField</div>
  //   <div>
  //     Steps-List
  //     <div>Action-TextField-multiline</div>
  //     <div>ExpectedResult-TextField-multiline</div>
  //   </div>s
  // </>s

  const location = useLocation() as Location<LocationState>

  const suiteId = location.state?.id?.toString()

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

  // RESET
  useEffect(() => {
    setSuite(
      suiteId === undefined
        ? suites[0]
        : suites.find((suite) => suite.id.toString() === suiteId) || suites[0],
    )
    setPriority(priorities[1].value)
  }, [location])

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        minWidth: '420px',
        width: '90%',
        maxWidth: '1000px',
        margin: '16px auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        padding: '16px',
      }}
    >
      <CardHeader
        style={{ flexWrap: 'wrap', rowGap: '20px' }}
        title="Create New Test Case"
        titleTypographyProps={{
          noWrap: true,
          variant: 'h5',
        }}
        avatar={
          <TMSToggleButtonGroup
            options={testTypes}
            value={testType}
            onChange={(v) => setTestType(v)}
            buttonAlign="center"
          />
        }
        action={
          <TMSToggleButtonGroup
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
      </TMSCardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => console.log('!', suite)}
        >
          Create
        </Button>
      </CardActions>
    </Card>
  )
})
