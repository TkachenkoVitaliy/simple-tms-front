import { useMemo } from 'react'

import {
  CheckBox,
  CheckBoxOutlineBlank,
  UnfoldLess,
  UnfoldMore,
} from '@mui/icons-material'
import { Button, ButtonGroup } from '@mui/material'

import { useCheckboxTreeContext } from 'shared/ui/CheckboxTree/useCheckboxTreeContext'

import styles from './CheckboxTreeActions.module.scss'

export const CheckboxTreeActions = () => {
  const [treeCheckState, setTreeCheckState] = useCheckboxTreeContext()

  const changeCheckStateAll = (checked: boolean) => {
    const newState = new Map(treeCheckState)
    newState.forEach((val) => {
      if (val.checkState !== undefined) {
        val.checkState = checked ? 'checked' : 'unchecked'
      }
    })
    setTreeCheckState(newState)
  }

  const canCheckAll = useMemo(() => {
    let uncheckedCount = 0
    treeCheckState.forEach((val) => {
      if (val.checkState === 'unchecked') {
        uncheckedCount += 1
      }
    })
    return uncheckedCount > 0
  }, [treeCheckState])

  const canUncheckAll = useMemo(() => {
    let checkedCount = 0
    treeCheckState.forEach((val) => {
      if (val.checkState === 'checked') {
        checkedCount += 1
      }
    })
    return checkedCount > 0
  }, [treeCheckState])

  const changeExpandStateAll = (expand: boolean) => {
    const newState = new Map(treeCheckState)
    newState.forEach((val) => {
      if (val.expanded !== undefined) {
        val.expanded = expand
      }
    })
    setTreeCheckState(newState)
  }

  const canExpandAll = useMemo(() => {
    let collapsedCount = 0
    treeCheckState.forEach((val) => {
      if (val.expanded === false) {
        collapsedCount += 1
      }
    })
    return collapsedCount > 0
  }, [treeCheckState])

  const canCollapseAll = useMemo(() => {
    let expandedCount = 0
    treeCheckState.forEach((val) => {
      if (val.expanded === true) {
        expandedCount += 1
      }
    })
    return expandedCount > 0
  }, [treeCheckState])

  return (
    <div className={styles.actionsWrapper}>
      <div className={styles.actionsGroup}>
        <Button
          variant="outlined"
          size="small"
          disabled={!canCheckAll}
          onClick={() => changeCheckStateAll(true)}
        >
          <CheckBox className={styles.imageRightMargin} />
          ALL
        </Button>
        <Button
          variant="outlined"
          size="small"
          disabled={!canUncheckAll}
          onClick={() => changeCheckStateAll(false)}
        >
          <CheckBoxOutlineBlank className={styles.imageRightMargin} />
          ALL
        </Button>
      </div>
      <div className={styles.actionsGroup}>
        <Button
          variant="outlined"
          size="small"
          disabled={!canExpandAll}
          onClick={() => changeExpandStateAll(true)}
        >
          <UnfoldMore className={styles.imageRightMargin} />
          ALL
        </Button>
        <Button
          variant="outlined"
          size="small"
          disabled={!canCollapseAll}
          onClick={() => changeExpandStateAll(false)}
        >
          <UnfoldLess className={styles.imageRightMargin} />
          ALL
        </Button>
      </div>
    </div>
  )
}
