import { NextPage } from 'next'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'

const Bars3BottomLeftIcon: NextPage<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      fill='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <path
        clipRule='evenodd'
        fillRule='evenodd'
        d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75
          0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
      />
    </svg>
  )
}

export const MenuButton: NextPage<{
  text: string
  to: string
  icon?: ReactNode
  onClick?: () => void
  selected?: boolean
}> = ({ text, to, icon, onClick, selected }) => {
  return (
    <div className='relative'>
      <Link
        href={to}
        className='flex rounded-lg p-2 py-2 text-gray-900 hover:bg-gradient-to-l hover:from-blue-100
          dark:text-white dark:hover:from-gray-900'
        onClick={onClick}
      >
        <span className='h-6 w-6 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'>
          {icon}
        </span>
        <span className='ml-3'>{text}</span>
      </Link>
      {selected ? (
        <div className='absolute left-0 top-0 h-full w-full rounded-lg bg-gray-300 py-2 opacity-40 dark:bg-gray-600' />
      ) : (
        <></>
      )}
    </div>
  )
}

export const MenuGroup: NextPage<{
  text: string
}> = ({ text }) => {
  return (
    <span
      className='flex text-xs text-gray-400 after:mb-2 after:ml-2 after:inline-block after:w-full after:border-b
        after:border-gray-300 dark:after:border-gray-600'
    >
      {text}
    </span>
  )
}

export type MenuContentType = (props: { select?: string | boolean; closeMenu: () => void }) => ReactNode

export const SideMenu: NextPage<{
  children: ReactNode
  menu: MenuContentType
  select?: string | boolean
}> = ({ children, menu, select }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => {
    setIsOpen(false)
  }
  return (
    <>
      <button
        className='fixed ml-3 mt-2 rounded-lg bg-gray-100 bg-opacity-50 p-2 text-sm text-gray-500
          hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-900
          dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
        onClick={() => {
          setIsOpen(true)
        }}
      >
        <Bars3BottomLeftIcon className='h-6 w-6' />
      </button>

      <nav // サイドメニュー
        id='side-menu'
        className={
          'fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform' +
          (isOpen ? ' transform-none' : ' md:translate-x-0')
        }
      >
        <div className='h-full overflow-y-auto bg-gray-100 px-3 py-4 dark:bg-gray-800'>
          {menu({ select, closeMenu })}
        </div>
      </nav>
      <div
        className={'fixed inset-0 z-30 bg-gray-900 bg-opacity-50 dark:bg-opacity-80' + (isOpen ? '' : ' hidden')}
        onClick={closeMenu}
      ></div>

      <div // メインコンテンツ
        id='side-main'
        className='p-4 md:ml-64'
      >
        {children}
      </div>
    </>
  )
}
export default SideMenu
