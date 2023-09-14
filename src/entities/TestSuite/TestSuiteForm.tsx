import { sampleData, suites } from 'mock/sample_data'
import { memo, useState } from 'react'
import { SuiteOption } from 'shared/types/autocompleteTypes'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete/TMSAutocomplete'

export const TestSuiteForm = memo(() => {
  const [value, setValue] = useState<SuiteOption | null>(suites[0])

  const onChange = (newValue: SuiteOption | null) => {
    setValue(newValue)
  }

  return (
    <div>
      <TMSAutocomplete<SuiteOption>
        id="testSuiteFormSelectParentSuite"
        label="Parent suite"
        options={suites}
        onChange={onChange}
        value={value}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, val) => option.id === val.id}
      />
    </div>
  )
})
