import React, { FC, ReactNode } from 'react'

import { jc } from './utils'

export const Progress: FC<{
  children?: ReactNode
  progress: number
  className?: string
}> = ({ children, progress, className }) => {
  return (
    <div className='relative w-full rounded bg-neutral-200 dark:bg-neutral-600'>
      <div
        className={jc('rounded bg-blue-300 p-1 text-center leading-none text-white dark:bg-blue-700', className)}
        style={{ width: `${progress}%` }}
      >
        &nbsp;
      </div>
      <div
        className={jc(
          'absolute top-0 w-full p-1 text-center font-bold leading-none text-gray-700 dark:text-white',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
export default Progress
