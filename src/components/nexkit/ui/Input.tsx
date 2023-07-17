import React, { ComponentPropsWithoutRef, FC, forwardRef, useState } from 'react'
import { twMerge as tm } from 'tailwind-merge'

import { borderStyles } from './styles'

const PasswordEyeIcon: FC<{ className?: string; isShow: boolean; onClick?: () => void }> = ({
  className,
  isShow,
  onClick,
}) => {
  if (isShow) {
    return (
      <svg
        className={className}
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        onClick={onClick}
      >
        <path d='M2 2L22 22' strokeLinecap='round' strokeLinejoin='round' />
        <path
          d='M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  }
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      onClick={onClick}
    >
      <path d='M1 12C1 12 5 4 12 4C19 4 23 12 23 12' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M1 12C1 12 5 20 12 20C19 20 23 12 23 12' strokeLinecap='round' strokeLinejoin='round' />
      <circle cx='12' cy='12' r='3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'> & {
    label: string
    enablePasswordShowButton?: boolean
    error?: string | { message?: string }
  }
>((props, ref) => {
  const { label, enablePasswordShowButton, error, ...propsNoCustom } = props
  const errMsg = typeof error == 'object' ? error.message : error
  const enablePassSB = props.type === 'password' && enablePasswordShowButton
  const [isPassShow, setPassShow] = useState(false)

  return (
    <div className='relative mt-2'>
      <input
        {...propsNoCustom}
        ref={ref}
        placeholder=' '
        type={isPassShow ? 'text' : props.type}
        className={tm(
          borderStyles.default,
          'peer block w-full appearance-none py-2.5 text-sm',
          enablePassSB ? 'pl-1 pr-7' : 'px-1',
          'border-0 border-b-2 bg-transparent text-gray-900 dark:text-white',
          'focus:border-blue-400 focus:outline-none focus:ring-0',
          errMsg ? 'border-red-500 focus:border-red-500' : '',
          props.className,
        )}
      />
      {enablePassSB ? (
        <PasswordEyeIcon
          className='absolute right-1 top-4 h-4 hover:cursor-pointer'
          isShow={isPassShow}
          onClick={() => {
            setPassShow(!isPassShow)
          }}
        />
      ) : undefined}
      <label
        htmlFor={props.id}
        className={tm(
          'absolute top-3 origin-[0] -translate-y-6 scale-75 transform pl-0 text-sm duration-300',
          'text-gray-500 dark:text-gray-200',
          'peer-placeholder-shown:left-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
          'peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-500',
          props.required ? 'after:ml-1 after:font-bold after:text-red-500 after:content-["*"]' : '',
          errMsg ? 'text-red-500 peer-focus:text-red-500 dark:text-red-500' : '',
        )}
      >
        {label}
      </label>
      <div className='mt-0.5 h-3 text-xs text-red-500'>{errMsg || ''}</div>
    </div>
  )
})
Input.displayName = 'Input'

export default Input
