import { NextPage } from 'next'
import React, { ReactNode } from 'react'

import { Button } from './Button'
import { XMarkIcon } from './icon'

export const Modal: NextPage<{
  isOpen: boolean
  children?: ReactNode
}> = ({ isOpen, children }) => {
  if (!isOpen) {
    return <></>
  }
  return (
    <div className='fixed left-0 top-0 h-full w-full bg-gray-900 bg-opacity-50 dark:bg-opacity-80 lg:pl-64'>
      <div className='m-8'>
        <div className='mx-auto max-w-2xl rounded-lg bg-gray-200 dark:bg-gray-700'>{children}</div>
      </div>
    </div>
  )
}

export const ModalTitle: NextPage<{
  children?: ReactNode
  onClose?: () => void
}> = ({ children, onClose }) => {
  return (
    <div className='relative border-b border-gray-400 px-4 py-2 text-lg font-bold dark:border-gray-500'>
      <Button theme='noframe' className='absolute right-0 mr-2' onClick={onClose}>
        <XMarkIcon className='h-4' />
      </Button>
      {children}
    </div>
  )
}

export default Modal
