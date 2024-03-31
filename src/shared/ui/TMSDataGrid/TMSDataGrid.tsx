import { useCallback, useEffect, useState } from 'react'

import {
  DataGrid,
  GridPaginationModel,
  GridRowIdGetter,
  GridRowProps,
  RowPropsOverrides,
} from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'
import { GridValidRowModel } from '@mui/x-data-grid/models/gridRows'
import { AxiosResponse } from 'axios'

import { Page } from 'shared/types/api'

export interface TMSDataGridProps<T extends GridValidRowModel> {
  renderRow: (props: GridRowProps & RowPropsOverrides) => JSX.Element
  columns: GridColDef[]
  fetch: (pageModel: GridPaginationModel) => Promise<AxiosResponse<Page<T>>>
  pageSize: number
  getRowId: GridRowIdGetter<T>
}

export function TMSDataGrid<T extends GridValidRowModel>(
  props: TMSDataGridProps<T>,
) {
  const { renderRow, columns, fetch, pageSize, getRowId } = props
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState<number>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize,
  })

  const loadData = useCallback(
    async (newPaginationModel: GridPaginationModel) => {
      setLoading(true)
      const { data } = await fetch(newPaginationModel)
      setData(data.data)
      setTotal(data.totalCount)
      setPaginationModel(newPaginationModel)
      setLoading(false)
    },
    [props],
  )

  useEffect(() => {
    loadData({ page: 0, pageSize })
  }, [])

  return (
    <DataGrid<T>
      sx={{
        '& .MuiDataGrid-virtualScrollerRenderZone': {
          width: '100%',
          height: '100%',
        },
        '& .MuiDataGrid-virtualScrollerContent': {
          height: '100%',
        },
      }}
      // rowHeight={70}
      rowSelection={false}
      disableColumnMenu
      disableColumnSorting
      getRowHeight={() => 188}
      rows={data}
      slots={{
        row: renderRow,
      }}
      getRowId={getRowId}
      rowCount={total}
      loading={isLoading}
      pagination
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={loadData}
      columns={columns}
    />
  )
}
