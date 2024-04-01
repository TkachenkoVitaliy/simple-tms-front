import { PageFrame } from 'shared/ui/PageFrame'
import { ColumnDefinition, TMSTable } from 'shared/ui/TMSTable/TMSTable'
import axios, { AxiosResponse } from 'axios'

interface Post {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

function DashboardPage() {
  const columns: ColumnDefinition<Post>[] = [
    {
      field: 'name',
      headerName: 'NAME',
      displayType: 'main',
    },
    {
      field: 'postId',
      headerName: 'POST ID',
      displayType: 'main',
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      displayType: 'collapse',
    },
    {
      field: 'body',
      headerName: 'BODY',
      displayType: 'collapse',
    },
  ]

  const loadData = async (page: number, pageSize: number) => {
    const response: AxiosResponse<Post[]> = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_page=${page + 1}`,
    )
    return {
      data: response.data,
      totalCount: 1000,
    }
  }

  return (
    <PageFrame>
      <div>Dashboard</div>
      <TMSTable
        pageSize={10}
        columns={columns}
        loadData={loadData}
        getRowId={(item) => item.id}
      />
    </PageFrame>
  )
}

export default DashboardPage
