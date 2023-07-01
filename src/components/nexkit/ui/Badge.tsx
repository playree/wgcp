import React, { FC, ReactNode } from 'react'
import { twMerge as tm } from 'tailwind-merge'

type Theme = 'blue' | 'red' | 'green' | 'yellow'

const themeStyles = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
}

export const Badge: FC<{
  children?: ReactNode
  className?: string
  theme?: Theme
}> = ({ children, className: _className, theme }) => {
  const className = 'text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full'
  return <span className={tm(className, themeStyles[theme || 'blue'], _className)}>{children}</span>
}
