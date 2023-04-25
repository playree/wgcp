import { NextPage } from 'next'
import React from 'react'

export const MenuGroup: NextPage<{
  text: string
}> = ({ text }) => {
  return (
    <span
      className='flex text-xs text-gray-400 after:mb-2 after:ml-2 after:inline-block after:w-full after:border-b
         after:border-gray-300 dark:after:border-gray-600'
    >
      {text}
    </span>
  )
}
export default MenuGroup
