import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge as tm } from 'tailwind-merge'

export const Checkbox = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'> & {
    label: string
  }
>((props, ref) => {
  const { label, ...propsNoCustom } = props
  return (
    <div className='flex items-center'>
      <input {...propsNoCustom} ref={ref} type='checkbox' className={tm('h-4 w-4 cursor-pointer', props.className)} />
      <label htmlFor={props.id} className='ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
    </div>
  )
})
Checkbox.displayName = 'Checkbox'

export default Checkbox
