import React, { ComponentPropsWithoutRef, forwardRef } from 'react'

import { borderStyles } from './styles'
import { jc } from './utils'

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'> & {
    label: string
    error?: string | { message?: string }
  }
>((props, ref) => {
  const errMsg = typeof props.error == 'object' ? props.error.message : props.error
  return (
    <div className='relative mt-2'>
      <input
        {...props}
        ref={ref}
        placeholder=' '
        className={jc(
          borderStyles.default,
          'peer block w-full appearance-none px-1 py-2.5 text-sm',
          'border-0 border-b-2 bg-transparent text-gray-900 dark:text-white',
          'focus:border-blue-400 focus:outline-none focus:ring-0',
          errMsg ? 'border-red-500 focus:border-red-500' : '',
          props.className,
        )}
      />
      <label
        htmlFor={props.id}
        className={jc(
          'absolute top-3 origin-[0] -translate-y-6 scale-75 transform pl-0 text-sm duration-300',
          'text-gray-500 dark:text-gray-200',
          'peer-placeholder-shown:left-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
          'peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-500',
          props.required ? 'after:ml-1 after:font-bold after:text-red-500 after:content-["*"]' : '',
          errMsg ? 'text-red-500 peer-focus:text-red-500 dark:text-red-500' : '',
        )}
      >
        {props.label}
      </label>
      <div className='mt-0.5 h-3 text-xs text-red-500'>{errMsg || ''}</div>
    </div>
  )
})
Input.displayName = 'Input'

export default Input
