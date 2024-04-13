import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'

import { TestStepRepeatable } from '../../model/types/testCase'

export interface RepeatableTestStepDetailsProps {
  item: TestStepRepeatable
}
export const RepeatableTestStepDetails = (
  props: RepeatableTestStepDetailsProps,
) => {
  const { item } = props
  const { action, expected } = item

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>action</TableCell>
          <TableCell>expected</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <MDEditor.Markdown
              source={action}
              style={{ backgroundColor: 'inherit' }}
            />
          </TableCell>
          <TableCell>{expected}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
