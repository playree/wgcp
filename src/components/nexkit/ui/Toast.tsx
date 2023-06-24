import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import { jc } from './utils'

const InformationCircleIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
      />
    </svg>
  )
}

type MessageObj = {
  id: number
  message: string
}

export const ToastContext = createContext(
  {} as {
    messageList: MessageObj[]
    setToast: (message: string) => void
  },
)

let tid: NodeJS.Timer
let cnt = 0

export const ToastProvider: FC<{
  children?: ReactNode
}> = ({ children }) => {
  const [messageList, setMessageList] = useState<MessageObj[]>([])

  useEffect(() => {
    if (tid) {
      clearTimeout(tid)
    }
    tid = setTimeout(() => {
      if (messageList.length > 0) {
        messageList.shift()
        setMessageList([...messageList])
      }
    }, 3000)
  }, [messageList])

  const setToast = (message: string) => {
    setMessageList([...messageList, { id: cnt++, message }])
  }

  const showMessage = (msgList: MessageObj[]) => {
    const list = []
    for (const msg of msgList) {
      console.log('msg.id:', msg.id)
      list.push(
        <div
          key={`toast_${msg.id}`}
          className={jc(
            'z-50 mt-2 flex items-center',
            'rounded-lg bg-blue-50 p-4 text-gray-500 shadow dark:bg-gray-900 dark:text-gray-400',
          )}
        >
          <InformationCircleIcon className='mr-1 h-5' />
          <span>{msg.message}</span>
        </div>,
      )
    }
    return list
  }

  return (
    <ToastContext.Provider value={{ messageList, setToast }}>
      <div className='absolute bottom-2'>{showMessage(messageList)}</div>
      {children}
    </ToastContext.Provider>
  )
}
