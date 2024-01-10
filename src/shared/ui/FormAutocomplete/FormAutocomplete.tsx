/* eslint-disable max-lines */
import { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { Autocomplete, TextField } from '@mui/material'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'

import { classNames } from 'shared/lib/utils'

import styles from './FormAutocomplete.module.scss'

export interface FormAutocompleteProps<T, FieldProps extends FieldValues> {
  className?: string
  id: string
  label?: string
  options: T[]
  fetchOptions?: () => Promise<T[]>
  defaultValue?: T
  getOptionLabel: (option: T) => string
  getOptionIcon?: (option: T) => JSX.Element
  isOptionEqualToValue: (option: T, value: T) => boolean
  contrastText?: boolean
  placeholder?: string
  optionStyle?: (option: T) => React.CSSProperties
  name: Path<FieldProps>
  control: Control<FieldProps>
  rules?: Omit<
    RegisterOptions<FieldProps, Path<FieldProps>>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  emptyHelperText?: string
  validateOnFocus?: boolean
}

// TODO: нужен полный рефакторинг

function FormAutoComplete<T, FieldProps extends FieldValues>(
  props: FormAutocompleteProps<T, FieldProps>,
) {
  const {
    className,
    id,
    label,
    options,
    fetchOptions,
    defaultValue,
    getOptionLabel,
    getOptionIcon,
    isOptionEqualToValue,
    contrastText,
    placeholder,
    optionStyle,
    name,
    control,
    rules,
    emptyHelperText,
    validateOnFocus,
  } = props

  const [localOptions, setLocalOptions] = useState<T[]>(
    defaultValue !== undefined ? [defaultValue, ...options] : options,
  )
  const [fetched, setFetched] = useState<boolean>(!fetchOptions)

  async function fetch() {
    const result = await fetchOptions?.()
    if (result !== undefined) setLocalOptions([...localOptions, ...result])
    setFetched(true)
  }

  useEffect(() => {
    setLocalOptions(
      defaultValue !== undefined ? [defaultValue, ...options] : options,
    )
  }, [options])

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref, disabled },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        return (
          <Autocomplete
            id={id}
            value={value}
            className={classNames(styles.autocomplete, {}, [className])}
            disableClearable={
              !!control?._fields?.[name]?._f.required &&
              defaultValue === undefined
            }
            defaultValue={defaultValue}
            fullWidth
            disablePortal
            forcePopupIcon
            selectOnFocus
            clearOnEscape
            loading={!fetched}
            onOpen={fetchOptions && !fetched ? fetch : undefined}
            blurOnSelect
            handleHomeEndKeys
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            options={localOptions}
            renderOption={(props, option) => {
              return (
                <li
                  {...props}
                  style={optionStyle?.(option)}
                >
                  {getOptionIcon?.(option)}
                  {getOptionLabel(option)}
                </li>
              )
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label={label}
                  fullWidth
                  margin="none"
                  placeholder={placeholder}
                  InputProps={{
                    ...params.InputProps,
                    className: contrastText ? 'contrast' : '',
                  }}
                  sx={{ color: '#fff !important' }}
                  style={{ color: '#fff !important' }}
                  variant="outlined"
                  onBlur={onBlur}
                  onFocus={validateOnFocus ? onBlur : undefined}
                  helperText={error ? error.message : emptyHelperText}
                  error={!!error}
                  required={!!control?._fields?.[name]?._f.required}
                  disabled={disabled}
                />
              )
            }}
            onChange={(_, data) => {
              if (control?._fields?.[name]?._f.required && data === null) {
                if (defaultValue === undefined) {
                  return
                }
                onChange(defaultValue)
              } else {
                onChange(data)
              }
            }}
          />
        )
      }}
    />
  )
}

export const FormAutocomplete = observer(FormAutoComplete)
