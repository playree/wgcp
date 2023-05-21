import { cnjoin } from '@/utils/helpers'
import { NextPage } from 'next'
import React from 'react'

export const Checkbox: NextPage<{
  className?: string
  id: string
  value: boolean
  label: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}> = ({ className, id, value, label, onChange }) => {
  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        id={id}
        checked={value}
        onChange={onChange}
        className={cnjoin('h-4 w-4 cursor-pointer', className)}
      />
      <label htmlFor={id} className='ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
