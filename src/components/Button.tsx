import { cnjoin } from '@/utils/helpers'
import { NextPage } from 'next'
import React, { ReactNode } from 'react'

export const Button: NextPage<{
  children?: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  theme?: 'primary' | 'secondary' | 'noframe'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}> = ({ children, className: _className, type, theme, onClick }) => {
  let className = 'bg-blue-600 text-white hover:bg-blue-700'
  switch (theme) {
    case 'secondary':
      className = 'border border@main text-gray-900 dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600'
      break
    case 'noframe':
      className = 'text-gray-900 dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600'
      break
    default:
      break
  }

  return (
    <button
      type={type}
      className={cnjoin(
        'focus@ring flex items-center justify-center rounded px-3 py-1 font-medium',
        className,
        _className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
