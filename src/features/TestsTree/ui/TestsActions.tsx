/* eslint-disable max-lines */
/* eslint-disable react/no-unstable-nested-components */
import { memo } from 'react'
import { Button, ButtonGroup } from '@mui/material'
import { Add, UnfoldLess, UnfoldMore } from '@mui/icons-material'
import { TMSMenu } from 'shared/ui/TMSMenu/TMSMenu'
import { useNavigate, useParams } from 'react-router-dom'

import { testSuiteStore } from 'entities/TestNode/TestSuite/model/testSuiteStore'
import { RouteParams } from 'shared/types/routerTypes'
import { useAppRouter } from 'shared/lib/hooks/useAppRouter'
import styles from './TestsLayout.module.scss'

export interface TestsActionsProps {
  canExpand: boolean
  canCollapse: boolean
  onExpand: () => void
  onCollapse: () => void
}

export const TestsActions = memo((props: TestsActionsProps) => {
  const { canExpand, canCollapse, onExpand, onCollapse } = props
  const navigate = useNavigate()
  const routes = useAppRouter()

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
              testSuiteStore.setCreateSuite()
              navigate('suite/0')
            },
          },
          {
            label: 'Case',
            onSelect: () => {
              navigate('create')
            },
          },
        ]}
      />
      <Button
        onClick={() => console.log(routes)}
        component="button"
      >
        CLICK
      </Button>
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
})
