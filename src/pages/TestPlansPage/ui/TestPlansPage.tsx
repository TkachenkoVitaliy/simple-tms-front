import { observer } from 'mobx-react-lite'

import { PageLoader } from 'widgets/PageLoader'

import { PageFrame } from 'shared/ui/PageFrame'

const TestPlansPage = observer(() => {
  if (true) {
    return <PageLoader />
  }

  return (
    <PageFrame>
      <div>TestPlansPage</div>
    </PageFrame>
  )
})

export default TestPlansPage
