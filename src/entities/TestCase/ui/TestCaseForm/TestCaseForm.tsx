import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@mui/material'
import { memo } from 'react'

export const TestCaseForm = memo(() => {
  // <>
  //   <div>TestSuite-Select</div>
  //   <div>Priority-Select</div>
  //   <div>Type-Select</div>
  //   <div>Title-TextField</div>
  //   <div>Preconditions-TextField</div>
  //   <div>
  //     Steps-List
  //     <div>Action-TextField-multiline</div>
  //     <div>ExpectedResult-TextField-multiline</div>
  //   </div>
  // </>

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        width: '35%',
        margin: '16px auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        padding: '16px',
      }}
    >
      <CardContent>placeholder</CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => console.log('!')}
        >
          Create
        </Button>
      </CardActions>
    </Card>
  )
})
