import { CardContent, Stack } from '@mui/material'

export interface TMSCardContentProps {
  children: React.ReactNode
}

export function TMSCardContent({ children }: TMSCardContentProps) {
  return (
    <CardContent>
      <Stack
        direction="column"
        spacing="24px"
      >
        {children}
      </Stack>
    </CardContent>
  )
}
