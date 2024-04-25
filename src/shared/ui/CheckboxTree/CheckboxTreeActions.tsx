import { Button } from '@mui/material'

import { useCheckboxTreeContext } from 'shared/ui/CheckboxTree/useCheckboxTreeContext'

export const CheckboxTreeActions = () => {
  const [treeCheckState, setTreeCheckState] = useCheckboxTreeContext()

  const changeExpandStateAll = (expand: boolean) => {
    const newState = new Map(treeCheckState)
    newState.forEach((val, _) => {
      if (val.expanded !== undefined) {
        // eslint-disable-next-line no-param-reassign
        val.expanded = expand
      }
    })
    setTreeCheckState(newState)
  }

  return (
    <div>
      <Button onClick={() => changeExpandStateAll(true)}>EXPAND ALL</Button>
      <Button onClick={() => changeExpandStateAll(false)}>COLLAPSE ALL</Button>
    </div>
  )
}
