import { NextPage } from 'next'
import React, { ReactNode } from 'react'

export const MenuButton: NextPage<{
  text: string
  to: string
  icon?: ReactNode
  onClick?: () => void
}> = ({ text, to, icon, onClick }) => {
  return (
    <a
      href={to}
      className='flex items-center rounded-lg p-2 text-gray-900 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700'
      onClick={onClick}
    >
      <span className='h-6 w-6 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'>
        {icon}
      </span>
      <span className='ml-3'>{text}</span>
    </a>
  )
}
export default MenuButton
