import { TextField } from '@mui/material'
import { useCallback, useMemo, useRef, useState } from 'react'

export interface TMSTextFieldProps {
  required?: boolean
  fullWidth?: boolean
  forceTrim?: boolean
  multiline?: boolean
  label: string
  value: string
  onChange: (newValue: string) => void
  errorText?: string
  validateFunc?: (value: string) => boolean
}

export function TMSTextField(props: TMSTextFieldProps) {
  const {
    required,
    fullWidth,
    forceTrim,
    multiline,
    label,
    value,
    onChange,
    errorText,
    validateFunc,
  } = props

  const firstValue = useRef(value)
  const [error, setError] = useState<boolean>(false)
  const [haveChanges, setHaveChanges] = useState<boolean>(false)

  const updateErrorAndChanges = useCallback(
    (newValue: string) => {
      setHaveChanges(firstValue.current !== newValue)
      if (validateFunc) {
        setError(!validateFunc(newValue))
      } else if (required) {
        setError(!newValue || newValue.length < 1)
      }
    },
    [firstValue, setHaveChanges, setError],
  )

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const validateValue = forceTrim ? e.target.value.trim() : e.target.value
    updateErrorAndChanges(validateValue)
    onChange(e.target.value)
  }

  const onBlurHander = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const validateValue = forceTrim ? e.target.value.trim() : e.target.value
    updateErrorAndChanges(validateValue)
    onChange(validateValue)
  }

  const helperText = useMemo(() => {
    if (errorText !== undefined) {
      return error ? errorText : ' '
    }
    if (required) {
      return error ? 'Required' : ''
    }
    return undefined
  }, [error, errorText, validateFunc, required])

  return (
    <TextField
      type="text"
      autoComplete="off"
      error={error}
      multiline={multiline}
      required={required}
      fullWidth={fullWidth}
      label={label}
      variant="outlined"
      value={value}
      onChange={onChangeHandler}
      onBlur={onBlurHander}
      helperText={helperText}
    />
  )
}
