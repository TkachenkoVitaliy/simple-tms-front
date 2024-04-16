import { useContext } from 'react'

import { CheckboxTreeContext } from 'shared/ui/CheckboxTree/CheckboxTreeContext'

export const useCheckboxTreeContext = () => {
  const context = useContext(CheckboxTreeContext)

  if (context === null) {
    throw new Error(
      'You have forgotten to wrap your component with CheckboxTreeContextProvider',
    )
  }

  return context
}
