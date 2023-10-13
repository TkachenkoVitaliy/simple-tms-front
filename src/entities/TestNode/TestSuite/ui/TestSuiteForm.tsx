import { memo } from 'react'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete/TMSAutocomplete'
import { TMSCardContent } from 'shared/ui/TMSCardContent/TMSCardContent'
import { Button, Card, CardActions, CardHeader } from '@mui/material'
import { TMSTextField } from 'shared/ui/TMSTextField/TMSTextField'
import { testNodeStore } from 'entities/TestNode/model/testNodeStore'
import { observer } from 'mobx-react-lite'
import { TestSuiteShort } from '../model/types'
import { testSuiteStore } from '../model/testSuiteStore'

export const TestSuiteForm = memo(
  observer(() => {
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
          <TMSAutocomplete<TestSuiteShort>
            id="testSuiteFormSelectParentSuite"
            label="Parent suite"
            options={testNodeStore.suites.filter(
              (suite) => suite.id !== testSuiteStore.id,
            )}
            onChange={testSuiteStore.setParentSuite}
            required
            value={testSuiteStore.parentSuite}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, val) => option.id === val.id}
          />
          <TMSTextField
            required
            fullWidth
            forceTrim
            label="Title"
            value={testSuiteStore.name}
            onChange={(val) => testSuiteStore.setName(val)}
            errorText="Min length Title is 2 symbols"
            validateFunc={(newValue) => !!newValue && newValue.length >= 2}
          />
          <TMSTextField
            multiline
            fullWidth
            label="Description"
            value={testSuiteStore.description}
            onChange={(val) => testSuiteStore.setDescription(val)}
          />
        </TMSCardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              testSuiteStore.saveCreatedSuite()
            }}
          >
            Create
          </Button>
        </CardActions>
      </Card>
    )
  }),
)
