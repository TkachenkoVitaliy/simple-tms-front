import DraftsIcon from '@mui/icons-material/Drafts'
import InboxIcon from '@mui/icons-material/Inbox'
import { Dialog, DialogContent, List } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

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

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleCloseEvent}
    >
      <div
        style={{
          backgroundColor: 'red',
          height: '80vh',
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => console.log('Inbox')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => console.log('Drafts')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Dialog>
  )
}
