/* eslint-disable react/function-component-definition */
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'dnd-multi-backend'

export interface DraggableWrapperProps {
  Wrapper: React.FC<{ children?: React.ReactNode }>
  children: React.ReactNode
  move: () => void
  index: number
}

export const DraggableWrapper = (props: DraggableWrapperProps) => {
  const { children, Wrapper } = props
  const type = 'Draggable'

  return (
    <DndProvider backend={MultiBackend}>
      <Wrapper>{children}</Wrapper>
    </DndProvider>
  )
}
