import { cnjoin } from '@/utils/helpers'
import { NextPage } from 'next'
import React from 'react'

export const Input: NextPage<{
  className?: string
  id: string
  value: string | number
  label: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}> = ({ className, id, value, label, onChange }) => {
  return (
    <div className='relative mt-2'>
      <input
        type='text'
        id={id}
        value={value}
        placeholder=' '
        onChange={onChange}
        className={cnjoin(
          'border@main peer block w-full appearance-none px-1 py-2.5 text-sm',
          'border-0 border-b-2 bg-transparent text-gray-900 dark:text-white',
          'focus:border-blue-400 focus:outline-none focus:ring-0',
          className,
        )}
      />
      <label
        htmlFor={id}
        className={cnjoin(
          'absolute top-3 origin-[0] -translate-y-6 scale-75 transform pl-0 text-sm duration-300',
          'text-gray-500 dark:text-gray-200',
          'peer-placeholder-shown:left-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
          'peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-500',
        )}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
