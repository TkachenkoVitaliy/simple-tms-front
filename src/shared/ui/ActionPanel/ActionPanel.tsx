import { Button, ButtonProps } from '@mui/material'

import { classNames } from 'shared/lib/utils'

export interface ActionBtn {
  onClick: ButtonProps['onClick']
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  text: string
}

export interface ActionPanelProps {
  actionBtns: ActionBtn[]
  className?: string
}

export const ActionPanel = (props: ActionPanelProps) => {
  const { actionBtns, className } = props

  return (
    <div className={classNames('', {}, [className])}>
      {actionBtns.map(({ onClick, color, variant, text }) => (
        <Button
          key={text}
          onClick={onClick}
          color={color}
          variant={variant || 'outlined'}
        >
          {text}
        </Button>
      ))}
    </div>
  )
}
