import axios from 'axios'
import { memo, useState } from 'react'
import { TMSAutocomplete } from 'shared/ui/TMSAutocomplete/TMSAutocomplete'

export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

export const TestSuiteForm = memo(() => {
  const fetchData = async (): Promise<IPost[]> => {
    const response = await axios.get(
      'http://jsonplaceholder.typicode.com/posts',
    )
    return response.data
  }

  const [value, setValue] = useState<IPost | null>(null)

  const onChange = (newValue: IPost | null) => {
    setValue(newValue)
  }

  return (
    <div>
      <TMSAutocomplete<IPost>
        id="testTMSAutocomplete"
        options={[]}
        fetchOptions={fetchData}
        onChange={onChange}
        value={value}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, val) => option.id === val.id}
      />
    </div>
  )
})
