import { Bars3BottomLeftIcon, Squares2x2Icon, UsersIcon } from '@/components/icon'
import { NextPage } from 'next'
import React, { ReactNode, useState } from 'react'

import { MenuButton } from './MenuButton'

export const SideMenu: NextPage<{ children: ReactNode; select?: string | boolean }> = ({ children, select }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => {
    setIsOpen(false)
  }
  return (
    <>
      <button
        className='fixed ml-3 mt-2 items-center rounded-lg bg-gray-100 bg-opacity-50 p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
        onClick={() => {
          setIsOpen(true)
        }}
      >
        <Bars3BottomLeftIcon className='h-6 w-6' />
      </button>
      <nav
        id='side-menu'
        className={
          'fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform' +
          (isOpen ? ' transform-none' : ' md:translate-x-0')
        }
        aria-label='Sidebar'
      >
        <div className='h-full overflow-y-auto bg-gray-100 px-3 py-4 dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            <li>
              <MenuButton
                text='Dashboard'
                to='/'
                icon={<Squares2x2Icon />}
                onClick={closeMenu}
                selected={'dashboard' === select}
              />
            </li>
            <li>
              <MenuButton
                text='Users'
                to='/users'
                icon={<UsersIcon />}
                onClick={closeMenu}
                selected={'users' === select}
              />
            </li>
          </ul>
        </div>
      </nav>
      <div
        className={'fixed inset-0 z-30 bg-gray-900 bg-opacity-50 dark:bg-opacity-80' + (isOpen ? '' : ' hidden')}
        onClick={closeMenu}
      ></div>
      <div id='side-main' className='p-4 md:ml-64'>
        {children}
      </div>
    </>
  )
}
export default SideMenu
