import { Button } from '@mui/material'

import { useCheckboxTreeContext } from 'shared/ui/CheckboxTree/useCheckboxTreeContext'
import { useMemo } from 'react'

export const CheckboxTreeActions = () => {
  const [treeCheckState, setTreeCheckState] = useCheckboxTreeContext()

  const changeExpandStateAll = (expand: boolean) => {
    const newState = new Map(treeCheckState)
    newState.forEach((val) => {
      if (val.expanded !== undefined) {
        // eslint-disable-next-line no-param-reassign
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
