import { NextPage } from 'next'
import React, { ReactNode } from 'react'

import { Button } from './Button'
import { XMarkIcon } from './icon'

export const Modal: NextPage<{
  isOpen: boolean
  children?: ReactNode
  onClose?: () => void
}> = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    return <></>
  }
  return (
    <div
      className='fixed left-0 top-0 h-full w-full bg-gray-900 bg-opacity-50 dark:bg-opacity-80 lg:pl-64'
      onClick={onClose}
    >
      <div className='m-8'>
        <div
          className='mx-auto max-w-2xl rounded-xl bg-gray-200 dark:bg-gray-700'
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export const ModalTitle: NextPage<{
  children?: ReactNode
  onClose?: () => void
}> = ({ children, onClose }) => {
  return (
    <div className='border@light relative flex items-center border-b px-4 py-2 text-lg font-bold'>
      <Button theme='noframe' className='absolute right-0 mr-2' onClick={onClose}>
        <XMarkIcon className='h-4' />
      </Button>
      {children}
    </div>
  )
}

export const ModalAction: NextPage<{
  children?: ReactNode
}> = ({ children }) => {
  return <div className='border@light relative flex items-center border-t px-4 py-2'>{children}</div>
}

export default Modal
