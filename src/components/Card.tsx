import { cnjoin } from '@/utils/helpers'
import React, { FC, ReactNode } from 'react'

export const Card: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={cnjoin('bg@light border@light rounded border p-4', className)}>{children}</div>
}

export const CardTitle: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={cnjoin('border-g border@light mb-4 border-b pb-1 text-lg', className)}>{children}</div>
}

export default Card
