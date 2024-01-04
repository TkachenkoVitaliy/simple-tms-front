import { Add, UnfoldLess, UnfoldMore } from '@mui/icons-material'
import { Button, ButtonGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { TMSMenu } from 'shared/ui/TMSMenu'

import styles from './TestTreeActionsPanel.module.scss'

export interface TestsTreeActionsPanelProps {
  canExpand: boolean
  canCollapse: boolean
  onExpand: () => void
  onCollapse: () => void
}

// TODO: refactor

export const TestsTreeActionsPanel = (props: TestsTreeActionsPanelProps) => {
  const { canExpand, canCollapse, onExpand, onCollapse } = props
  const navigate = useNavigate()

  return (
    <div className={styles.actions}>
      <TMSMenu
        id="create-root"
        icon={<Add />}
        label="Create"
        options={[
          {
            label: 'Suite',
            onSelect: () => {
              // testSuiteStore.setCreateSuite()
              navigate('suite/new')
            },
          },
          {
            label: 'Case',
            onSelect: () => {
              navigate('case/new')
            },
          },
        ]}
      />
      <div />
      <ButtonGroup
        size="small"
        variant="outlined"
        color="inherit"
        disableElevation
      >
        <Button
          onClick={onCollapse}
          component="button"
          disabled={!canCollapse}
          style={{ borderRightColor: 'inherit' }}
        >
          <UnfoldLess />
        </Button>
        <Button
          onClick={onExpand}
          component="button"
          disabled={!canExpand}
        >
          <UnfoldMore />
        </Button>
      </ButtonGroup>
    </div>
  )
}
