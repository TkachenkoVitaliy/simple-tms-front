import { PageFrame } from 'shared/ui/PageFrame'
import { ColumnDefinition, TMSTable } from 'shared/ui/TMSTable/TMSTable'
import axios, { AxiosResponse } from 'axios'
import MDEditor from '@uiw/react-md-editor'

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
    // {
    //   field: 'postId',
    //   headerName: 'POST ID',
    //   displayType: 'main',
    // },
    {
      field: 'email',
      headerName: 'EMAIL',
      displayType: 'collapse',
      customCell: (row: Post) => (
        <MDEditor.Markdown
          source={row.email}
          style={{ backgroundColor: 'inherit' }}
        />
      ),
    },
    {
      field: 'body',
      headerName: 'BODY',
      displayType: 'collapse',
      customCell: (row: Post) => (
        <MDEditor.Markdown
          source={row.body}
          style={{ backgroundColor: 'inherit' }}
        />
      ),
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
      <div style={{ width: '80%', height: '80%' }}>
        <TMSTable
          pageSize={10}
          columns={columns}
          loadData={loadData}
          getRowId={(item) => item.id}
          selectColumnName="NAME"
        />
      </div>
    </PageFrame>
  )
}

export default DashboardPage
