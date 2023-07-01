import Link from 'next/link'
import React, { ComponentPropsWithoutRef, FC, ReactNode, forwardRef } from 'react'
import { twMerge as tm } from 'tailwind-merge'

import { borderStyles, focusStyles } from './styles'

type Theme = 'primary' | 'secondary' | 'noframe'

const themeStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-500 disabled:text-gray-300',
  secondary: tm(
    borderStyles.default,
    'border text-gray-900 dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600',
    'disabled:text-gray-500 disabled:dark:text-gray-400 disabled:bg-inherit disabled:dark:bg-inherit',
  ),
  noframe: tm(
    'text-gray-900 dark:text-white hover:bg-gray-300 hover:dark:bg-gray-600',
    'disabled:text-gray-500 disabled:dark:text-gray-400 disabled:bg-inherit disabled:dark:bg-inherit',
  ),
}

const getClassName = (theme: Theme = 'primary', _className?: string) => {
  const className = 'flex items-center justify-center rounded px-2 py-1 font-medium'
  return tm(focusStyles.ring, className, themeStyles[theme], _className)
}

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'> & {
    children?: ReactNode
    theme?: Theme
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
  theme?: Theme
  className?: string
  target?: React.HTMLAttributeAnchorTarget
}> = (props) => {
  return (
    <Link href={props.href} className={getClassName(props.theme, props.className)} target={props.target}>
      {props.children}
    </Link>
  )
}

export default Button
