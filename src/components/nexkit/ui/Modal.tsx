import React, { FC, ReactNode } from 'react'
import { twMerge as tm } from 'tailwind-merge'

import { Button } from './Button'
import { borderStyles } from './styles'

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

export const Modal: FC<{
  isOpen: boolean
  children?: ReactNode
  onClose?: () => void
  showWaiting?: boolean
}> = ({ isOpen, children, onClose, showWaiting: showLoading }) => {
  if (!isOpen) {
    return <></>
  }
  return (
    <div
      className='fixed left-0 top-0 h-full w-full bg-gray-900 bg-opacity-50 dark:bg-opacity-80 lg:pl-64'
      onClick={onClose}
    >
      <div className='m-4 mt-16'>
        <div
          className='relative mx-auto max-w-2xl rounded-xl bg-gray-100 dark:bg-gray-700'
          onClick={(event) => event.stopPropagation()}
        >
          {children}
          <div
            className={tm(
              'absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-xl',
              'bg-gray-900 bg-opacity-20 dark:bg-opacity-40',
              showLoading ? '' : 'hidden',
            )}
          >
            <div className='h-8 w-8 animate-spin rounded-xl bg-blue-600'></div>
            <div className='ml-4 font-bold'>Please wait...</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ModalTitle: FC<{
  children?: ReactNode
  onClose?: () => void
}> = ({ children, onClose }) => {
  return (
    <div className={tm(borderStyles.light, 'relative flex items-center border-b px-4 py-2 text-lg font-bold')}>
      <Button theme='noframe' className='absolute right-0 mr-2' onClick={onClose}>
        <XMarkIcon className='h-4' />
      </Button>
      {children}
    </div>
  )
}

export const ModalAction: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div className={tm(borderStyles.light, 'relative flex items-center gap-4 border-t px-4 py-3', className)}>
      {children}
    </div>
  )
}

export default Modal
