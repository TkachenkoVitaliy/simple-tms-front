import { suites } from 'mock/sample_data'
import { memo, useState } from 'react'
import { SuiteOption } from 'shared/types/autocompleteTypes'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete/TMSAutocomplete'
import { TMSCardContent } from 'shared/ui/TMSCardContent/TMSCardContent'
import { Button, Card, CardActions, CardHeader } from '@mui/material'
import { TMSTextField } from 'shared/ui/TMSTextField/TMSTextField'

export const TestSuiteForm = memo(() => {
  const [parentSuite, setParentSuite] = useState<SuiteOption | null>(suites[0])
  const [suiteTitle, setSuiteTitle] = useState<string>('')

  const onChangeParentSuite = (newValue: SuiteOption | null) => {
    setParentSuite(newValue)
  }

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        width: '65%',
        margin: '16px',
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
          onChange={onChangeParentSuite}
          required
          value={parentSuite}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, val) => option.id === val.id}
        />
        <TMSTextField
          required
          fullWidth
          forceTrim
          label="Title"
          value={suiteTitle}
          onChange={(val) => setSuiteTitle(val)}
          errorText="Min length Title is 2 symbols"
          validateFunc={(newValue) => !!newValue && newValue.length >= 2}
        />
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
