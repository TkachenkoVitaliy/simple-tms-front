import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

// TODO: Для примера
// const fetchData = async (): Promise<IPost[]> => {
//   const response = await axios.get(
//     'http://jsonplaceholder.typicode.com/posts',
//   )
//   return response.data
// }

export interface TMSAutocompleteProps<T> {
  id: string
  label?: string
  options: T[]
  fetchOptions?: () => Promise<T[]>
  value: T | null
  onChange: (value: T | null) => void
  getOptionLabel: (option: T) => string
  isOptionEqualToValue: (option: T, value: T) => boolean
  contrastText?: boolean
  placeholder?: string
  optionStyle?: (option: T) => React.CSSProperties
}

export function TMSAutocomplete<T>(props: TMSAutocompleteProps<T>) {
  const {
    id,
    label,
    options,
    fetchOptions,
    value,
    onChange,
    getOptionLabel,
    isOptionEqualToValue,
    contrastText,
    placeholder,
    optionStyle,
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
      sx={{ minWidth: '18%', color: '#fff' }}
      renderOption={(props, option) => {
        return (
          <li
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            style={optionStyle?.(option)}
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
          />
        )
      }}
    />
  )
}
