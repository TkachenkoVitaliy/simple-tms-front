import { Dispatch, SetStateAction, useContext, useState } from 'react'

import { CheckboxTreeContext } from 'shared/ui/CheckboxTree/CheckboxTreeContext'

export const useCheckboxTreeContext = (): [
  Map<string, boolean>,
  Dispatch<SetStateAction<Map<string, boolean>>>,
] => {
  const [state, setState] = useState(useContext(CheckboxTreeContext))

  return [state, setState]
}
