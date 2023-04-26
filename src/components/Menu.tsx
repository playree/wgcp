import { ArrowRightOnRectangleIcon, Cog6ToothIcon, LanguageIcon, Squares2x2Icon, UsersIcon } from '@/components/icon'
import { useLocale } from '@/utils/locale'
import { signOut as signOutAuth } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'

import { MenuButton, MenuContentType, MenuGroup } from './SideMenu'

/**
 * サイドメニュー
 */
export const Menu: MenuContentType = ({ select, closeMenu }) => {
  const router = useRouter()
  const { locale, t } = useLocale()
  const [selectLocale, setSelectLocale] = useState(locale)
  const signOut = () => {
    signOutAuth()
  }
  const changeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectLocale(e.target.value)
    router.push(router.asPath, undefined, { locale: e.target.value })
  }
  return (
    <>
      <ul className='mt-4 space-y-2 font-medium'>
        <li>
          <MenuButton
            text={t('menu_dashboard')}
            to='/'
            icon={<Squares2x2Icon />}
            onClick={closeMenu}
            selected={'dashboard' === select}
          />
        </li>
      </ul>
      <ul className='mt-4 space-y-2 font-medium'>
        <li>
          <MenuGroup text={t('group_admin')} />
        </li>
        <li>
          <MenuButton
            text={t('menu_users')}
            to='/users'
            icon={<UsersIcon />}
            onClick={closeMenu}
            selected={'users' === select}
          />
        </li>
        <li>
          <MenuButton
            text={t('menu_settings')}
            to='/settings'
            icon={<Cog6ToothIcon />}
            onClick={closeMenu}
            selected={'settings' === select}
          />
        </li>
      </ul>
      <ul className='mt-4 space-y-2 font-medium'>
        <li>
          <MenuGroup text={t('group_action')} />
        </li>
        <li>
          <div className='flex'>
            <div className='flex flex-1 items-center p-2 font-medium text-gray-900 dark:text-white'>
              <span className='h-6 w-6 text-gray-500 dark:text-gray-400'>
                <LanguageIcon />
              </span>
              <span className='ml-3'>{t('menu_locale')}</span>
            </div>
            <select
              id='locale'
              className='block w-full flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900
                focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
                dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              value={selectLocale}
              onChange={changeLocale}
            >
              <option value='en'>en</option>
              <option value='ja'>ja</option>
            </select>
          </div>
        </li>
        <li>
          <MenuButton text={t('menu_signout')} to='' icon={<ArrowRightOnRectangleIcon />} onClick={signOut} />
        </li>
      </ul>
    </>
  )
}
