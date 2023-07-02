import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { twMerge as tm } from 'tailwind-merge'

import { Button } from './Button'
import { textStyles } from './styles'

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

const XMarkIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      strokeWidth={3}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
    </svg>
  )
}

type MessageObj = {
  id: string
  message: string
}

export const ToastContext = createContext(
  {} as {
    messageList: MessageObj[]
    setToast: (message: string) => void
  },
)

let tid: NodeJS.Timer

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
    setMessageList([...messageList, { id: crypto.randomUUID(), message }])
  }

  const removeToast = (id: string) => {
    setMessageList(messageList.filter((value) => value.id !== id))
  }

  const showMessage = (msgList: MessageObj[]) => {
    const list = []
    for (const msg of msgList) {
      console.log('msg.id:', msg.id)
      list.push(
        <div
          key={`toast_${msg.id}`}
          className={tm(
            'relative z-20 mt-2 flex items-center text-sm',
            'rounded-lg bg-blue-100 p-4 text-gray-500 opacity-80 shadow dark:bg-gray-800 dark:text-gray-400',
          )}
        >
          <InformationCircleIcon className='mr-1 h-5' />
          <div>{msg.message}</div>
          <Button
            theme='noframe'
            className={tm(textStyles.light, 'ml-2')}
            onClick={() => {
              removeToast(msg.id)
            }}
          >
            <XMarkIcon className='h-4' />
          </Button>
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
