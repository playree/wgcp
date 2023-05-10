import { NextPage } from 'next'
import React, { ReactNode } from 'react'

export const Card: NextPage<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={['bg@light border@light rounded border p-4', className].join(' ')}>{children}</div>
}

export const CardTitle: NextPage<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={['border-g border@light mb-4 border-b pb-1 text-lg', className].join(' ')}>{children}</div>
}

export default Card
