import { useState } from 'react'

import { DataGrid, GridPaginationModel, GridRowProps } from '@mui/x-data-grid'

import { TestStepRepeatable } from 'entities/TestCase/model/types/testCase'
import { RepeatableTestStepRow } from 'entities/TestCase/ui/RepeatableTestStepRow/RepeatableTestStepRow'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

export interface TMSDataGridProps {}

const mkdStr = `
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
`

const dataset: TestStepRepeatable[] = [
  {
    id: 66,
    name: 'Repeatable Step',
    repeatable: true,
    action: mkdStr,
    expected: mkdStr,
    projectId: 33,
  },
  {
    id: 67,
    name: 'Repeatable Step 2',
    repeatable: true,
    action: mkdStr,
    expected: mkdStr,
    projectId: 33,
  },
]

export const TMSDataGrid = () => {
  const [data, setData] = useState<TestStepRepeatable[]>(dataset)
  const [total, setTotal] = useState<number>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  })

  const getPageData = ({ page, pageSize }: GridPaginationModel) => {
    const newData = dataset.slice(page * pageSize, (page + 1) * pageSize)
    setData(newData)
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Select Test Step',
      flex: 1,
      align: 'center',
    },
  ]

  return (
    <DataGrid
      sx={{
        '& .MuiDataGrid-virtualScrollerRenderZone': {
          width: '100%',
          height: '100%',
        },
      }}
      rowHeight={2000}
      rowSelection={false}
      disableColumnMenu
      disableColumnSorting
      rows={data}
      slots={{
        row: (props: GridRowProps) => (
          <RepeatableTestStepRow
            key={props.row.id}
            row={props.row as TestStepRepeatable}
          />
        ),
      }}
      getRowId={(item) => item.name}
      rowCount={dataset.length}
      loading={isLoading}
      pagination
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={(newPaginationModel) => {
        getPageData(newPaginationModel)
        setPaginationModel(newPaginationModel)
      }}
      columns={columns}
    />
  )
}
