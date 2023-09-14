import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  useTheme,
} from '@mui/material'
import { suites } from 'mock/sample_data'
import React, { memo, useEffect, useMemo, useState } from 'react'
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
        {/* <Autocomplete
          id="projectsList"
          disablePortal
          forcePopupIcon={false}
          selectOnFocus
          clearOnEscape
          loading
          blurOnSelect
          handleHomeEndKeys
          value={suite}
          onChange={handleChange}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id
          }}
          getOptionLabel={(option: SuiteOption) => option.name}
          options={suites}
          sx={{ minWidth: '18%', color: contrastText }}
          renderOption={(props, option) => {
            return (
              <li
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
              >
                {option.name}
              </li>
            )
          }}
          renderInput={(params) => {
            return (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Test Suite"
                fullWidth
                margin="none"
                InputProps={{
                  ...params.InputProps,
                }}
                variant="outlined"
              />
            )
          }}
        /> */}
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
