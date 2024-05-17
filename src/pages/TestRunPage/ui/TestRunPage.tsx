import { useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { TestRunCard } from 'entities/TestRun'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'

import styles from './TestRunPage.module.scss'

function TestRunPage() {
  const { testRunStore } = useProjectStores()
  const { testRunId } = useParams<RouteParams>()

  useEffect(() => {
    testRunStore
      .loadTestRun(testRunId)
      .then(() => console.log(JSON.stringify(testRunStore.testRun)))
  }, [])

  return testRunStore.isLoading || testRunStore.testRun === null ? (
    <PageLoader />
  ) : (
    <PageFrame>
      <TestRunCard
        className={styles.container}
        testRun={testRunStore.testRun}
      />
    </PageFrame>
  )
}

export default observer(TestRunPage)
