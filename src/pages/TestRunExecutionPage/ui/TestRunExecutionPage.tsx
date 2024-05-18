import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { TestRunExecution } from 'widgets/TestRunExecution'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { RouteParams } from 'shared/types/router'

function TestRunExecutionPage() {
  const { testRunStore } = useProjectStores()
  const { testRun } = testRunStore
  const navigate = useNavigate()
  const { executedCaseId, testRunId } = useParams<RouteParams>()

  useEffect(() => {
    if (testRun === null) {
      navigate('./..', { relative: 'route' })
      return
    }
    if (
      testRunId !== testRun.id ||
      testRun.cases.find(
        (testCase) => testCase.id.toString() === executedCaseId,
      ) === undefined
    ) {
      navigate('./..', { relative: 'route' })
    }
  }, [testRun])

  return <TestRunExecution />
}

export default TestRunExecutionPage
