import { observer } from 'mobx-react-lite'

import { Typography } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form'

export interface FormMarkdownEditorProps<FieldProps extends FieldValues> {
  title: string
  name: Path<FieldProps>
  control: Control<FieldProps>
  defaultValue?: PathValue<FieldProps, Path<FieldProps>>
  rules?: Omit<
    RegisterOptions<FieldProps, Path<FieldProps>>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
}

function FormMDEditor<FieldProps extends FieldValues>(
  props: FormMarkdownEditorProps<FieldProps>,
) {
  const { title, name, control, defaultValue, rules } = props

  return (
    <div>
      <Typography>{title}</Typography>
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
          <MDEditor
            style={{ minHeight: '200px' }}
            height="100%"
            visibleDragbar={false}
            preview="edit"
            value={value}
            onChange={onChange}
          />
        )}
      />
    </div>
  )
}

export const FormMarkdownEditor = observer(FormMDEditor)
