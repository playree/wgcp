import { cnjoin } from '@/helpers/client'
import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'> & {
    children?: ReactNode
    theme?: 'primary' | 'secondary' | 'noframe'
  }
>((props, ref) => {
  let className = 'bg-blue-600 text-white hover:bg-blue-700'
  switch (props.theme) {
    case 'secondary':
      className = 'border border@main text-gray-900 dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600'
      break
    case 'noframe':
      className = 'text-gray-900 dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600'
      break
    default:
      break
  }

  return (
    <button
      {...props}
      className={cnjoin(
        'focus@ring flex items-center justify-center rounded px-3 py-1 font-medium',
        className,
        props.className,
      )}
      ref={ref}
    >
      {props.children}
    </button>
  )
})
Button.displayName = 'Button'

export default Button
