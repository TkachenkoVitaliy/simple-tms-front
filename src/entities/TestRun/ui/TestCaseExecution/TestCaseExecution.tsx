import { Card, TextField } from '@mui/material'

import { StepPreview } from 'entities/TestRun/ui/StepPreview'

import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import { RunTestCase } from '../../model/types/testRun'

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
            style={{ margin: '20px 20px 0' }}
          />
          {testCase.steps.map((step) => (
            <StepPreview
              step={step}
              key={step.id}
            />
          ))}
        </TMSCardContent>
      </Card>
    </TMSSkeleton>
  )
}
