import { suites } from 'mock/sample_data'
import { memo, useState } from 'react'
import { SuiteOption } from 'shared/types/autocompleteTypes'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete/TMSAutocomplete'
import { TMSCardContent } from 'shared/ui/TMSCardContent/TMSCardContent'
import { Card, CardHeader } from '@mui/material'

export const TestSuiteForm = memo(() => {
  const [value, setValue] = useState<SuiteOption | null>(suites[0])

  const onChange = (newValue: SuiteOption | null) => {
    setValue(newValue)
  }

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        width: '65%',
        margin: '16px auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        padding: '16px',
      }}
    >
      <CardHeader title="Test Suite" />
      <TMSCardContent>
        <TMSAutocomplete<SuiteOption>
          id="testSuiteFormSelectParentSuite"
          label="Parent suite"
          options={suites}
          onChange={onChange}
          required
          value={value}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, val) => option.id === val.id}
        />
      </TMSCardContent>
    </Card>
  )
})
