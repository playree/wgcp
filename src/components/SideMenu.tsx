import { NextPage } from 'next'
import React, { ReactNode, useState } from 'react'

export const SideMenu: NextPage<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        className='bg-white'
        onClick={() => {
          setIsOpen(true)
        }}
      >
        test
      </button>
      <nav
        id='default-sidebar'
        className={
          'fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform' +
          (isOpen ? ' transform-none' : ' md:translate-x-0')
        }
        aria-label='Sidebar'
      >
        <div className='h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            <li>
              <a
                href='#'
                className='flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              >
                <svg
                  aria-hidden='true'
                  className='h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                  <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
                </svg>
                <span className='ml-3'>Dashboard</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className={'fixed inset-0 z-30 bg-gray-900 bg-opacity-50 dark:bg-opacity-80' + (isOpen ? '' : ' hidden')}
        onClick={() => {
          setIsOpen(false)
        }}
      ></div>
      <div className='p-4 md:ml-64'>{children}</div>
    </>
  )
}
