/* eslint-disable max-lines */
import { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { Autocomplete, TextField } from '@mui/material'

import styles from './TMSAutocomplete.module.scss'

export interface TMSAutocompleteProps<T> {
  id: string
  label?: string
  options: T[]
  fetchOptions?: () => Promise<T[]>
  value: T | null
  onChange: (value: T | null) => void
  getOptionLabel: (option: T) => string
  getOptionIcon?: (option: T) => JSX.Element
  isOptionEqualToValue: (option: T, value: T) => boolean
  contrastText?: boolean
  placeholder?: string
  optionStyle?: (option: T) => React.CSSProperties
  required?: boolean
}

// TODO: нужен полный рефакторинг

function TMSAutoComplete<T>(props: TMSAutocompleteProps<T>) {
  const {
    id,
    label,
    options,
    fetchOptions,
    value,
    onChange,
    getOptionLabel,
    getOptionIcon,
    isOptionEqualToValue,
    contrastText,
    placeholder,
    optionStyle,
    required,
  } = props

  const [localOptions, setLocalOptions] = useState<T[]>(options || [])
  const [fetched, setFetched] = useState<boolean>(!fetchOptions)

  async function fetch() {
    const result = await fetchOptions?.()
    if (result !== undefined) setLocalOptions([...localOptions, ...result])
    setFetched(true)
  }

  useEffect(() => {
    setLocalOptions(options)
  }, [options])

  return (
    <Autocomplete
      id={id}
      className={styles.autocomplete}
      disableClearable={!required}
      disablePortal
      forcePopupIcon
      selectOnFocus
      clearOnEscape
      loading={!fetched}
      onOpen={fetchOptions && !fetched ? fetch : undefined}
      blurOnSelect
      handleHomeEndKeys
      value={value}
      onChange={(_, newValue) => {
        if (!required || newValue !== null) {
          onChange(newValue)
        }
      }}
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
            required={required}
            margin="none"
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              className: contrastText ? 'contrast' : '',
            }}
            sx={{ color: '#fff !important' }}
            style={{ color: '#fff !important' }}
            variant="outlined"
          />
        )
      }}
    />
  )
}

export const TMSAutocomplete = observer(TMSAutoComplete)
