import { NextPage } from 'next'
import Link from 'next/link'
import React, { ReactNode } from 'react'

export const MenuButton: NextPage<{
  text: string
  to: string
  icon?: ReactNode
  onClick?: () => void
  selected?: boolean
}> = ({ text, to, icon, onClick, selected }) => {
  return (
    <div className='relative'>
      <Link
        href={to}
        className='flex rounded-lg p-2 text-gray-900 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700'
        onClick={onClick}
      >
        <span className='h-6 w-6 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'>
          {icon}
        </span>
        <span className='ml-3'>{text}</span>
      </Link>
      {selected ? (
        <div className='absolute left-0 top-0 h-full w-full rounded-lg bg-gradient-to-l from-gray-300 py-2 dark:from-gray-900' />
      ) : (
        <></>
      )}
    </div>
  )
}
export default MenuButton
