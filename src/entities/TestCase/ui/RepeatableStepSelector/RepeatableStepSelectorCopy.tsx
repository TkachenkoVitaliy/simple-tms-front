import { Dialog } from '@mui/material'
import {
  GridPaginationModel,
  GridRowProps,
  RowPropsOverrides,
} from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { TestStepApi } from 'entities/TestCase/api/testStepApi'
import { TestStepRepeatable } from 'entities/TestCase/model/types/testCase'
import { RepeatableTestStepRow } from 'entities/TestCase/ui/RepeatableTestStepRow/RepeatableTestStepRow'

import { TMSDataGrid } from 'shared/ui/TMSDataGrid/TMSDataGrid'

export interface RepeatableStepSelectorProps {
  open: boolean
  onClose: () => void
}

export const RepeatableStepSelector = (props: RepeatableStepSelectorProps) => {
  const { open, onClose } = props
  const handleCloseEvent = (event: object, reason: string) => {
    onClose()
    // console.log(event)
    // console.log(reason)
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Select Test Step',
      flex: 1,
      align: 'center',
    },
  ]

  const renderRow = ({ row }: GridRowProps & RowPropsOverrides) => (
    <RepeatableTestStepRow
      key={row.id}
      row={row as TestStepRepeatable}
    />
  )

  const fetchSteps = (pageModel: GridPaginationModel) => {
    return TestStepApi.getRepeatableSteps(pageModel.page, pageModel.pageSize)
  }

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={handleCloseEvent}
    >
      <TMSDataGrid<TestStepRepeatable>
        renderRow={renderRow}
        columns={columns}
        fetch={fetchSteps}
        pageSize={5}
        getRowId={(item) => item.id}
      />
    </Dialog>
  )
}
