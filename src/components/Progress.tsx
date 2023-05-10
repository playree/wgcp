import { NextPage } from 'next'
import React, { ReactNode } from 'react'

export const Progress: NextPage<{
  children?: ReactNode
  progress: number
  className?: string
}> = ({ children, progress, className }) => {
  return (
    <div className='relative w-full rounded bg-neutral-200 dark:bg-neutral-600'>
      <div
        className={['rounded bg-blue-300 p-1 text-center leading-none text-white dark:bg-blue-700', className].join(
          ' ',
        )}
        style={{ width: `${progress}%` }}
      >
        &nbsp;
      </div>
      <div
        className={[
          'absolute top-0 w-full p-1 text-center font-bold leading-none text-gray-700 dark:text-white',
          className,
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}
export default Progress
