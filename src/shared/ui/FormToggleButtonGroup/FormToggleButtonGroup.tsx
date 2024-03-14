/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Временно чтобы не забыть все доступные свойтсва
import { observer } from 'mobx-react-lite'

import { Controller } from 'react-hook-form'
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form/dist/types'

import {
  TMSToggleButtonGroup,
  ToggleButtonOption,
} from '../TMSToggleButtonGroup'

export interface FormToggleButtonGroup<FieldProps extends FieldValues, T> {
  name: Path<FieldProps>
  control: Control<FieldProps>
  defaultValue?: PathValue<FieldProps, Path<FieldProps>>
  rules?: Omit<
    RegisterOptions<FieldProps, Path<FieldProps>>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  options: ToggleButtonOption<T>[]
  marginBetween?: string
  buttonWidth?: string
  buttonAlign?: 'start' | 'center' | 'end'
}

function ToggleButtonGroup<FieldProps extends FieldValues, T>(
  props: FormToggleButtonGroup<FieldProps, T>,
) {
  const {
    name,
    control,
    defaultValue,
    rules,
    options,
    marginBetween,
    buttonWidth,
    buttonAlign,
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
        <TMSToggleButtonGroup<T>
          options={options}
          value={value}
          onChange={onChange} // TODO переделать (v) => (formValues.type = v)
          marginBetween={marginBetween}
          buttonWidth={buttonWidth}
          buttonAlign={buttonAlign || 'center'}
        />
      )}
    />
  )
}

export const FormToggleButtonGroup = observer(ToggleButtonGroup)
