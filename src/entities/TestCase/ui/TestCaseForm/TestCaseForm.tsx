import {
  Autocomplete,
  AutocompleteInputChangeReason,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  useTheme,
} from '@mui/material'
import { sampleData } from 'mock/sample_data'
import React, { memo, useState } from 'react'

interface SuiteOption {
  id: string | number
  name: string
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

  const theme = useTheme()
  const { contrastText } = theme.palette.primary

  const suites: SuiteOption[] = [
    { id: 0, name: 'Not selected' },
    ...sampleData
      .filter((item) => item.droppable)
      .map((item) => {
        return {
          id: item.id,
          name: item.text,
        }
      }),
  ]

  const [suite, setSuite] = useState<SuiteOption>(suites[0])
  const [suiteName, setSuiteName] = useState<SuiteOption['name']>(
    suites[0].name,
  )

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: SuiteOption | null,
  ) => {
    if (value) {
      setSuite(value)
      setSuiteName(value.name)
    }
  }

  const handleChangeInput = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (reason === 'reset') return
    setSuiteName(value)
    console.log('CHANGE', reason)
  }

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
        <Autocomplete
          id="projectsList"
          disablePortal
          forcePopupIcon={false}
          clearIcon=""
          selectOnFocus
          clearOnEscape
          blurOnSelect
          handleHomeEndKeys
          value={suite}
          onChange={handleChange}
          inputValue={suiteName}
          onInputChange={handleChangeInput}
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
                  className: 'contrast',
                }}
                sx={{ color: `${contrastText} !important` }}
                variant="outlined"
                style={{ color: `${contrastText} !important` }}
              />
            )
          }}
        />
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => console.log('!')}
        >
          Create
        </Button>
      </CardActions>
    </Card>
  )
})
