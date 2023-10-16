import { memo, useEffect, useMemo, useState } from 'react'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete/TMSAutocomplete'
import { TMSCardContent } from 'shared/ui/TMSCardContent/TMSCardContent'
import { Button, Card, CardActions, CardHeader } from '@mui/material'
import { TMSTextField } from 'shared/ui/TMSTextField/TMSTextField'
import { testNodeStore } from 'entities/TestNode/model/testNodeStore'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import { RouteParams } from 'shared/types/routerTypes'
import { TestSuiteShort } from '../model/types'
import { NEW_SUITE, testSuiteStore } from '../model/testSuiteStore'

export const TestSuiteForm = memo(
  observer(() => {
    const navigate = useNavigate()
    const params = useParams<RouteParams>()
    const { projectId, testSuiteId } = params
    // let initialState: TestSuite = NEW_SUITE
    const [initialState, setInitialState] = useState<TestSuite>(NEW_SUITE)

    useEffect(() => {
      const suiteId = Number(testSuiteId)
      console.log('!', suiteId, !Number.isNaN(suiteId))
      if (!Number.isNaN(suiteId) && suiteId !== 0) {
        testSuiteStore.setEditSuite(Number(testSuiteId)).then(() => {
          const { id, parentSuiteId, name, description } = testSuiteStore
          setInitialState({ id, parentSuiteId, name, description })
        })
      }
    }, [params])

    const haveChanges = useMemo(() => {
      const haveDiff =
        initialState.id !== testSuiteStore.id ||
        initialState.parentSuiteId !== testSuiteStore.id ||
        initialState.name !== testSuiteStore.name.trim() ||
        initialState.description !== testSuiteStore.description
      console.log(
        initialState,
        testSuiteStore.id,
        testSuiteStore.parentSuiteId,
        testSuiteStore.name,
        testSuiteStore.description,
        haveDiff,
      )
      return haveDiff
    }, [
      testSuiteStore.id,
      testSuiteStore.parentSuiteId,
      testSuiteStore.name,
      testSuiteStore.description,
      initialState,
    ])

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
            disabled={!haveChanges || testSuiteStore.name.trim().length < 2}
            onClick={async () => {
              const result = await testSuiteStore.saveSuite()
              if (result?.id && result.id.toString() !== testSuiteId) {
                navigate(`${result.id}`)
              }
            }}
          >
            {testSuiteStore.isNewSuite ? 'Create' : 'Save'}
          </Button>
        </CardActions>
      </Card>
    )
  }),
)
