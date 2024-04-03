import { useCallback } from 'react'

import { Dialog } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'

import { TestStepApi } from 'entities/TestCase/api/testStepApi'
import { TestStepRepeatable } from 'entities/TestCase/model/types/testCase'

import { TMSTable } from 'shared/ui/TMSTable'
import { ColumnDefinition } from 'shared/ui/TMSTable/TMSTable'

export interface RepeatableStepSelectorProps {
  open: boolean
  onClose: () => void
  onSelect: (selectedStep: TestStepRepeatable) => void
}

export const RepeatableStepSelector = (props: RepeatableStepSelectorProps) => {
  const { open, onClose, onSelect } = props
  const handleCloseEvent = (event: object, reason: string) => {
    onClose()
  }

  const onSelectRow = useCallback(
    (testStep: TestStepRepeatable) => {
      onSelect(testStep)
      onClose()
    },
    [onClose, onSelect],
  )

  const fetchSteps = async (page: number, pageSize: number) => {
    const response = await TestStepApi.getRepeatableSteps(page, pageSize)
    return response.data
  }

  const columns: ColumnDefinition<TestStepRepeatable>[] = [
    {
      field: 'name',
      headerName: 'Select Repeatable Test Step',
      displayType: 'main',
    },
    {
      field: 'action',
      headerName: 'action',
      displayType: 'collapse',
      customCell: (row: TestStepRepeatable) => (
        <MDEditor.Markdown
          source={row.action}
          style={{ backgroundColor: 'inherit' }}
        />
      ),
    },
    {
      field: 'expected',
      headerName: 'expected',
      displayType: 'collapse',
      customCell: (row: TestStepRepeatable) => (
        <MDEditor.Markdown
          source={row.expected}
          style={{ backgroundColor: 'inherit' }}
        />
      ),
    },
  ]

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={handleCloseEvent}
    >
      <TMSTable
        pageSize={5}
        columns={columns}
        loadData={fetchSteps}
        getRowId={(row) => row.id}
        selectColumnName="Select Repeatable Test Step"
        onSelectRow={onSelectRow}
      />
    </Dialog>
  )
}
