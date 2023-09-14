import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

export interface TMSAutocompleteProps<T> {
  id: string
  options: T[]
  fetchOptions?: () => Promise<T[]>
  value: T | null
  onChange: (value: T | null) => void
  getOptionLabel: (option: T) => string
  isOptionEqualToValue: (option: T, value: T) => boolean
  contrastText?: boolean
}

export function TMSAutocomplete<T>(props: TMSAutocompleteProps<T>) {
  const {
    id,
    options,
    fetchOptions,
    value,
    onChange,
    getOptionLabel,
    isOptionEqualToValue,
    contrastText,
  } = props

  const [localOptions, setLocalOptions] = useState<T[]>(options || [])
  const [fetched, setFetched] = useState<boolean>(!fetchOptions)

  async function fetch() {
    const result = await fetchOptions?.()
    if (result !== undefined) setLocalOptions([...localOptions, ...result])
    setFetched(true)
  }

  return (
    <Autocomplete
      id={id}
      disablePortal
      forcePopupIcon={false}
      selectOnFocus
      clearOnEscape
      loading={!fetched}
      onOpen={fetchOptions && !fetched ? fetch : undefined}
      blurOnSelect
      handleHomeEndKeys
      value={value}
      onChange={(_, value) => onChange(value)}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      options={localOptions}
      sx={{ minWidth: '18%' }}
      renderOption={(props, option) => {
        return (
          <li
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          >
            {getOptionLabel(option)}
          </li>
        )
      }}
      renderInput={(params) => {
        return (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Test Suite"
            fullWidth
            margin="none"
            InputProps={{
              ...params.InputProps,
              className: contrastText ? 'contrast' : '',
            }}
            variant="outlined"
          />
        )
      }}
    />
  )
}
