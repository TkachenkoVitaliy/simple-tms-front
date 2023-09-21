import { memo } from 'react'

export interface TestInputProps {
  value: string
  onChange: (value: string, id?: number | string | undefined) => void
  id?: number | string
  index: number
}

export const TestInput = memo((props: TestInputProps) => {
  const { value, onChange, id, index } = props

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, id)
  }

  return (
    <div>
      {index}
      <input
        style={{ marginLeft: '20px' }}
        value={value}
        onChange={changeHandler}
      />
    </div>
  )
})
