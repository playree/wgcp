import React, { FC, ReactNode } from 'react'
import { twMerge as tm } from 'tailwind-merge'

import { bgStyles, borderStyles } from './styles'

export const Card: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={tm(bgStyles.light, borderStyles.light, 'rounded border p-4', className)}>{children}</div>
}

export const CardTitle: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div className={tm(borderStyles.light, 'border-g mb-4 flex items-center border-b pb-1 text-xl', className)}>
      {children}
    </div>
  )
}

export const CardAction: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={tm('relative mt-4 flex items-center gap-4 px-4', className)}>{children}</div>
}

export default Card
