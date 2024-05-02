import { useMemo } from 'react'

import { Button } from '@mui/material'

import { useCheckboxTreeContext } from 'shared/ui/CheckboxTree/useCheckboxTreeContext'

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
    <div>
      <Button
        disabled={!canCheckAll}
        onClick={() => changeCheckStateAll(true)}
      >
        CHECK ALL
      </Button>
      <Button
        disabled={!canUncheckAll}
        onClick={() => changeCheckStateAll(false)}
      >
        UNCHECK ALL
      </Button>
      <Button
        disabled={!canExpandAll}
        onClick={() => changeExpandStateAll(true)}
      >
        EXPAND ALL
      </Button>
      <Button
        disabled={!canCollapseAll}
        onClick={() => changeExpandStateAll(false)}
      >
        COLLAPSE ALL
      </Button>
    </div>
  )
}
