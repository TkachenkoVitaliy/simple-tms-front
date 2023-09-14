import { Button, Card, CardActions, CardContent } from '@mui/material'
import { suites } from 'mock/sample_data'
import { memo, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Location } from 'history'
import { SuiteOption } from 'shared/types/autocompleteTypes'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete/TMSAutocomplete'

interface LocationState {
  id?: string | number
}

export const TestCaseForm = memo(() => {
  // <>
  //   <div>TestSuite-Select</div>
  //   <div>Priority-Select</div>
  //   <div>Type-Select</div>
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

  const defaultSuite = useMemo(() => {
    return suiteId === undefined
      ? suites[0]
      : suites.find((suite) => suite.id.toString() === suiteId) || suites[0]
  }, [location])

  const [suite, setSuite] = useState<SuiteOption | null>(defaultSuite)
  const [suiteName, setSuiteName] = useState<SuiteOption['name']>(
    defaultSuite.name,
  )

  const onChange = (newValue: SuiteOption | null) => {
    if (newValue) {
      setSuite(newValue)
    }
  }

  useEffect(() => {
    setSuite(defaultSuite)
    setSuiteName(defaultSuite.name)
  }, [location])

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        width: '35%',
        margin: '16px auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        padding: '16px',
      }}
    >
      <CardContent>
        <TMSAutocomplete
          id="testCaseFormSelectParentSuite"
          label="Parent suite"
          options={suites}
          onChange={onChange}
          required
          value={suite}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, val) => option.id === val.id}
        />
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => console.log('!', suite, suiteName)}
        >
          Create
        </Button>
      </CardActions>
    </Card>
  )
})
