import React, { FC, ReactNode } from 'react'

import { bgStyles, borderStyles } from './styles'
import { jc } from './utils'

export const Card: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={jc(bgStyles.light, borderStyles.light, 'rounded border p-4', className)}>{children}</div>
}

export const CardTitle: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={jc(borderStyles.light, 'border-g mb-4 border-b pb-1 text-xl', className)}>{children}</div>
}

export const CardAction: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={jc('relative mt-4 flex items-center gap-4 px-4', className)}>{children}</div>
}

export default Card
