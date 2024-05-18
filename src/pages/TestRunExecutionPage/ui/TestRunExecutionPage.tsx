import { useProjectStores } from 'shared/lib/hooks/useProjectStores'

function TestRunExecutionPage() {
  const { testRunStore } = useProjectStores()
  return <div>TestRunExecutionPage - {testRunStore.testRun?.name}</div>
}

export default TestRunExecutionPage
