import { NextPage } from 'next'
import React, { ReactNode } from 'react'

export const Button: NextPage<{
  children?: ReactNode
  className?: string
  theme?: 'primary' | 'secondary'
}> = ({ children, className }) => {
  return (
    <button
      className={[
        'flex items-center rounded px-2 py-1 text-sm font-medium text-white',
        'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default Button
