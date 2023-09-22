import { useState } from 'react'
import { DraggableWrapper } from 'shared/ui/DraggableWrapper/DraggableWrapper'
import { TestInput } from 'shared/ui/TestInput'

interface IData {
  id: string
  text: string
}

interface ReordItem {
  id: string
}

export function StepsEditor() {
  const [data, setData] = useState<IData[]>([
    {
      id: '1',
      text: '11111',
    },
    // {
    //   id: '2',
    //   text: '22222',
    // },
    // {
    //   id: '3',
    //   text: '33333',
    // },
    // {
    //   id: '4',
    //   text: '4444',
    // },
  ])

  const onReord = (newItems: ReordItem[]) => {
    const newData: IData[] = []
    newItems.forEach((item) => {
      const foundedDataItem = data.find((dataItem) => dataItem.id === item.id)
      if (foundedDataItem) {
        newData.push(foundedDataItem)
      }
    })
    setData(newData)
  }

  const onChangeInputVal = (value: string, id?: string | number) => {
    if (id !== undefined) {
      const stringId = id.toString()
      const newData: IData[] = data.map((item) => ({
        id: item.id,
        text: item.id === stringId ? value : item.text,
      }))
      setData(newData)
    }
  }

  return (
    <div>
      <DraggableWrapper
        Wrapper={<div />}
        onReordering={onReord}
        renderDragLayer={(index) => (
          <div
            style={{
              border: '2px solid white',
              padding: '20px',
            }}
          >
            <TestInput
              index={index + 1}
              id={data[index].id}
              value={data[index].text}
              onChange={onChangeInputVal}
            />
          </div>
        )}
      >
        {data.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{
                border: '2px solid white',
                padding: '20px',
                margin: '20px',
              }}
              id={item.id}
            >
              <TestInput
                index={index + 1}
                id={item.id}
                value={item.text}
                onChange={onChangeInputVal}
              />
            </div>
          )
        })}
      </DraggableWrapper>
      <button
        type="button"
        onClick={() =>
          setData([
            ...data,
            {
              id: (data.length + 1).toString(),
              text: (data.length + 1).toString() + (data.length + 1).toString(),
            },
          ])
        }
      >
        ADD
      </button>
    </div>
  )
}
