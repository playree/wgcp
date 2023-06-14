import Link from 'next/link'
import React, { ComponentPropsWithoutRef, FC, ReactNode, forwardRef } from 'react'

import { cnjoin } from './utils'

const getClassName = (theme?: 'primary' | 'secondary' | 'noframe', _className?: string) => {
  let className = 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-500 disabled:text-gray-300'
  switch (theme) {
    case 'secondary':
      className = cnjoin(
        'border border@main text-gray-900 dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600',
        'disabled:text-gray-500 disabled:dark:text-gray-400 disabled:bg-inherit disabled:dark:bg-inherit',
      )
      break
    case 'noframe':
      className = cnjoin(
        'text-gray-900 dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600',
        'disabled:text-gray-500 disabled:dark:text-gray-400 disabled:bg-inherit disabled:dark:bg-inherit',
      )
      break
    default:
      break
  }
  return cnjoin('focus@ring flex items-center justify-center rounded px-3 py-1 font-medium', className, _className)
}

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'> & {
    children?: ReactNode
    theme?: 'primary' | 'secondary' | 'noframe'
  }
>((props, ref) => {
  return (
    <button {...props} className={getClassName(props.theme, props.className)} ref={ref}>
      {props.children}
    </button>
  )
})
Button.displayName = 'Button'

export const ButtonLink: FC<{
  href: string
  children?: ReactNode
  theme?: 'primary' | 'secondary' | 'noframe'
  className?: string
}> = (props) => {
  return (
    <Link href={props.href} className={getClassName(props.theme, props.className)}>
      {props.children}
    </Link>
  )
}

export default Button
