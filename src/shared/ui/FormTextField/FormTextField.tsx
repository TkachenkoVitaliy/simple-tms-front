/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Временно чтобы не забыть все доступные свойтсва
import { observer } from 'mobx-react-lite'

import { TextField, TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form/dist/types'

export interface FormTextFieldProps<FieldProps extends FieldValues> {
  name: Path<FieldProps>
  control: Control<FieldProps>
  label: string
  defaultValue?: PathValue<FieldProps, Path<FieldProps>>
  rules?: Omit<
    RegisterOptions<FieldProps, Path<FieldProps>>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  multiline?: TextFieldProps['multiline']
  minRows?: TextFieldProps['minRows']
  emptyHelperText?: string
  validateOnFocus?: boolean
}

function FormInputTextField<FieldProps extends FieldValues>(
  props: FormTextFieldProps<FieldProps>,
) {
  const {
    name,
    control,
    label,
    defaultValue,
    rules,
    multiline,
    minRows,
    emptyHelperText,
    validateOnFocus,
  } = props

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref, disabled },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField
          type="text"
          autoComplete="off"
          fullWidth
          multiline={multiline}
          minRows={minRows}
          label={label}
          variant="outlined"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={validateOnFocus ? onBlur : undefined}
          helperText={error ? error.message : emptyHelperText}
          error={!!error}
          required={!!control?._fields?.[name]?._f.required}
          disabled={disabled}
        />
      )}
    />
  )
}

export const FormTextField = observer(FormInputTextField)
