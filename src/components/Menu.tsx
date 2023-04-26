import { ArrowRightOnRectangleIcon, Cog6ToothIcon, Squares2x2Icon, UsersIcon } from '@/components/icon'
import { signOut as signOutAuth } from 'next-auth/react'
import React from 'react'

import { MenuButton, MenuContentType, MenuGroup } from './SideMenu'

export const Menu: MenuContentType = ({ select, closeMenu }) => {
  const signOut = () => {
    signOutAuth()
  }
  return (
    <>
      <ul className='mt-4 space-y-2 font-medium'>
        <li>
          <MenuButton
            text='Dashboard'
            to='/'
            icon={<Squares2x2Icon />}
            onClick={closeMenu}
            selected={'dashboard' === select}
          />
        </li>
      </ul>
      <ul className='mt-4 space-y-2 font-medium'>
        <li>
          <MenuGroup text='admin' />
        </li>
        <li>
          <MenuButton text='Users' to='/users' icon={<UsersIcon />} onClick={closeMenu} selected={'users' === select} />
        </li>
        <li>
          <MenuButton
            text='Settings'
            to='/settings'
            icon={<Cog6ToothIcon />}
            onClick={closeMenu}
            selected={'settings' === select}
          />
        </li>
      </ul>
      <ul className='mt-4 space-y-2 font-medium'>
        <li>
          <MenuGroup text='action' />
        </li>
        <li>
          <MenuButton text='Sign Out' to='' icon={<ArrowRightOnRectangleIcon />} onClick={signOut} />
        </li>
      </ul>
    </>
  )
}
