import { NextPage } from 'next'
import React, { ReactNode } from 'react'

export const SideMenu: NextPage<{
  children: ReactNode
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
export default SideMenu
