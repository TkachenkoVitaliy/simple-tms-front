import { memo } from 'react'

export const TestCaseForm = memo(() => {
  return (
    <>
      <div>TestSuite-Select</div>
      <div>Priority-Select</div>
      <div>Type-Select</div>
      <div>Title-TextField</div>
      <div>Preconditions-TextField</div>
      <div>
        Steps-List
        <div>Action-TextField-multiline</div>
        <div>ExpectedResult-TextField-multiline</div>
      </div>
    </>
  )
})
