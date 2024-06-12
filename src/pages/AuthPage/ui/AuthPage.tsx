import { useState } from 'react'

import { Button, Card, TextField } from '@mui/material'

import { PageFrame } from 'shared/ui/PageFrame'

function AuthPage() {
  const [userName, setUserName] = useState<string>()
  const [password, setPassword] = useState<string>()

  return (
    <PageFrame
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          display: 'grid',
          gridTemplateRows: '1fr 1fr 1fr',
          gap: '2em',
          padding: '40px',
          width: '20%',
          height: 'auto',
          margin: 'auto',
        }}
      >
        <TextField
          label="Email"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          fullWidth
          inputProps={{ type: 'email' }}
        />
        <TextField
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
        />
        <Button>SIGN IN</Button>
      </Card>
    </PageFrame>
  )
}

export default AuthPage
