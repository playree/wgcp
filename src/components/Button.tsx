import { cnjoin } from '@/utils/helpers'
import { NextPage } from 'next'
import React, { ReactNode } from 'react'

export const Button: NextPage<{
  children?: ReactNode
  className?: string
  theme?: 'primary' | 'secondary' | 'noframe'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}> = ({ children, className, theme, onClick }) => {
  switch (theme) {
    case 'noframe':
      return (
        <button
          className={cnjoin(
            'flex items-center rounded px-2 py-1 text-sm font-medium text-black dark:text-white',
            'hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:dark:bg-gray-600',
            className,
          )}
          onClick={onClick}
        >
          {children}
        </button>
      )
  }

  return (
    <button
      className={[
        'flex items-center rounded px-2 py-1 text-sm font-medium text-white',
        'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300',
        className,
      ].join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
