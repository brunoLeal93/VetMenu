// App.tsx
import { Tab } from '@headlessui/react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'

type TabData = {
  id: string
  title: string
  content: string
}

export default function DietTabs() {
  const [tabs, setTabs] = useState<TabData[]>([
    { id: uuidv4(), title: 'Home', content: 'Conteúdo da aba Home' },
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const addTab = () => {
    const newIndex = tabs.length
    setTabs((prev) => [
      ...prev,
      {
        id: uuidv4(),
        title: `Aba ${newIndex + 1}`,
        content: `Conteúdo da aba ${newIndex + 1}`,
      },
    ])
    setSelectedIndex(newIndex)
  }

  const removeTab = (id: string, index: number) => {
    const filteredTabs = tabs.filter((tab) => tab.id !== id)
    setTabs(filteredTabs)

    if (index === selectedIndex) {
      setSelectedIndex(Math.max(0, index - 1))
    } else if (index < selectedIndex) {
      setSelectedIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <button
        onClick={addTab}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Adicionar Aba
      </button>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-2 border-b">
          {tabs.map((tab, index) => (
            <Tab key={tab.id} as="div" className="relative">
              {({ selected }) => (
                <button
                  className={classNames(
                    'px-4 py-2 text-sm rounded-t-md',
                    selected
                      ? 'bg-white border border-b-0 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  )}
                >
                  {tab.title}
                  <span
                    className="ml-2 text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeTab(tab.id, index)
                    }}
                  >
                    ×
                  </span>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="border p-4 bg-white rounded-b-md">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.id}>
              <p>{tab.content}</p>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}