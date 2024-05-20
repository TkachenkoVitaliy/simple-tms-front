import { Card, TextField } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'

import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import { RunTestCase } from '../../model/types/testRun'
import { StepPreview } from 'entities/TestRun/ui/StepPreview'

export interface TestCaseExecutionProps {
  testCase: RunTestCase
}

export const TestCaseExecution = (props: TestCaseExecutionProps) => {
  const { testCase } = props

  return (
    <TMSSkeleton
      isLoading={false}
      width="50%"
    >
      <Card
        variant="elevation"
        raised
      >
        <TMSCardContent>
          <TextField
            disabled
            multiline
            value={testCase.preconditions || '\t'}
            label="Preconditions"
          />
          {testCase.steps.map((step) => (
            <StepPreview step={step} />
          ))}
        </TMSCardContent>
      </Card>
    </TMSSkeleton>
  )
}
