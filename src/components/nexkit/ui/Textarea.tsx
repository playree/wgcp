import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge as tm } from 'tailwind-merge'

import { borderStyles } from './styles'

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<'textarea'> & {
    label: string
    error?: string | { message?: string }
  }
>((props, ref) => {
  const { label, error, ...propsNoCustom } = props
  const errMsg = typeof error == 'object' ? error.message : error
  return (
    <div className='relative mt-5'>
      <textarea
        className={tm(
          borderStyles.light,
          'peer block w-full appearance-none p-1 text-sm',
          'rounded border text-gray-900 read-only:border-dashed dark:text-white',
          'focus:border-blue-400 focus:outline-none focus:ring-0 dark:focus:border-blue-400',
          errMsg ? 'border-red-500 focus:border-red-500' : '',
          props.className,
        )}
        {...propsNoCustom}
        ref={ref}
      />
      <label
        htmlFor={props.id}
        className={tm(
          'absolute left-0.5 top-0 origin-[0] -translate-y-5 transform pl-0 text-xs duration-300',
          'text-gray-500 dark:text-gray-200',
          'peer-focus:text-blue-500',
          props.required ? 'after:ml-1 after:font-bold after:text-red-500 after:content-["*"]' : '',
          errMsg ? 'text-red-500 peer-focus:text-red-500 dark:text-red-500' : '',
        )}
      >
        {label}
      </label>
      <div className='mt-0.5 h-3 text-xs text-red-500'>{errMsg || ''}</div>
    </div>
  )
})
Textarea.displayName = 'Textarea'

export default Textarea
