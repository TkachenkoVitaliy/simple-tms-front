import { TextField, TextFieldProps } from '@mui/material'
import { useState } from 'react'

export interface TMSTextFieldProps {
  multiline?: boolean
  minRows?: TextFieldProps['minRows']
  label?: TextFieldProps['label']
  variant?: TextFieldProps['variant']
  helperText?: TextFieldProps['helperText']
  required?: TextFieldProps['required']
  onChange?: TextFieldProps['onChange']
  onBlur?: TextFieldProps['onBlur']
}

export const TMSTextField = (props: TMSTextFieldProps) => {
  const {
    multiline,
    minRows,
    label,
    variant,
    helperText,
    required,
    onChange,
    onBlur,
  } = props

  const [pristine, setPristine] = useState<boolean>(true)

  const onBlurField = () => {
    setPristine(false)
  }

  return (
    <TextField
      type="text"
      autoComplete="off"
      required
      fullWidth
      multiline={multiline}
      minRows={minRows}
      label={label}
      variant={variant || 'outlined'}
      helperText={helperText}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
