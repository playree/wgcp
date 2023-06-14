import { cnjoin } from '@/helpers/client'
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
  return <div className={cnjoin('border-g border@light mb-4 border-b pb-1 text-xl', className)}>{children}</div>
}

export const CardAction: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={cnjoin('relative mt-4 flex items-center gap-4 px-4', className)}>{children}</div>
}

export default Card
