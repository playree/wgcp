import { NextPage } from 'next'
import React, { ReactNode } from 'react'

export const Card: NextPage<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div
      className={[
        'rounded border border-gray-300 bg-blue-50 bg-opacity-20 p-4 dark:border-gray-700 dark:bg-gray-900',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export const CardTitle: NextPage<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div className={['border-g mb-4 border-b border-gray-300 pb-1 text-lg dark:border-gray-600', className].join(' ')}>
      {children}
    </div>
  )
}

export default Card
