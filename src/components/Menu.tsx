import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  IdentificationIcon,
  Squares2x2Icon,
  UserCircleIcon,
  UsersIcon,
} from '@/components/Icons'
import { useLocale } from '@/helpers/locale'
import { signOut as signOutAuth, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'

import { MenuButton, MenuContentType, MenuGroup } from './nexkit/ui/SideMenu'

/**
 * サイドメニュー
 */
export const Menu: MenuContentType = ({ select, closeMenu }) => {
  const router = useRouter()
  const { locale, t } = useLocale()
  const { data: session } = useSession()
  const [selectLocale, setSelectLocale] = useState(locale)
  const { theme, setTheme } = useTheme()
  const signOut = () => {
    signOutAuth()
  }
  const changeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectLocale(e.target.value)
    router.push(router.asPath, undefined, { locale: e.target.value })
  }
  const changeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
  }

  return (
    <>
      <ul className='mt-4 space-y-2 font-medium'>
        <li // ユーザー情報
        >
          <div
            className='rounded-lg bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] 
            from-blue-50 to-white p-2 pb-4 dark:from-slate-700 dark:to-slate-900'
          >
            <div className='flex'>
              <UserCircleIcon className='h-6 text-gray-500 dark:text-gray-400' />
              <span className='ml-2'>{session?.user.name}</span>
            </div>
            <div className='mt-2 flex pl-2'>
              <IdentificationIcon className='h-4 text-gray-500 dark:text-gray-400' />
              <span className='ml-2 text-xs font-normal'>
                {session?.user.isAdmin ? t('item_admin') : t('item_user')}
              </span>
            </div>
          </div>
        </li>

        <li // 言語・テーマ選択
          className='flex text-xs'
        >
          <div className='flex items-center px-2 py-1 font-medium text-gray-900 dark:text-white'>
            <GlobeAltIcon className='h-4 text-gray-500 dark:text-gray-400' />
            <span className='ml-2'>{t('menu_locale')}</span>
          </div>
          <select
            id='locale'
            className='block w-fit rounded-lg border border-gray-300 bg-gray-50 px-1 py-0.5 text-gray-900
                focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
                dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            value={selectLocale}
            onChange={changeLocale}
          >
            <option value='en'>en</option>
            <option value='ja'>ja</option>
          </select>
          <div className='flex items-center px-1 py-1 font-medium text-gray-900 dark:text-white'>
            <span className='ml-2'>{t('menu_theme')}</span>
          </div>
          <select
            id='theme'
            className='block w-fit rounded-lg border border-gray-300 bg-gray-50 px-1 py-0.5 text-gray-900
                focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
                dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            value={theme}
            onChange={changeTheme}
          >
            <option value='system'>OS</option>
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
          </select>
        </li>

        <li // サインアウト
          className='text-xs'
        >
          <MenuButton
            text={t('menu_signout')}
            to=''
            icon={<ArrowRightOnRectangleIcon className='h-4' />}
            onClick={signOut}
          />
        </li>
      </ul>

      <ul // ユーザーメニュー
        className='mt-4 space-y-2 font-medium'
      >
        <li>
          <MenuGroup text={t('group_user')} />
        </li>
        <li>
          <MenuButton
            text={t('menu_dashboard')}
            to='/'
            icon={<Squares2x2Icon className='h-6' />}
            onClick={closeMenu}
            selected={'dashboard' === select}
          />
        </li>
      </ul>

      <ul // 管理者メニュー
        className='mt-4 space-y-2 font-medium'
      >
        <li>
          <MenuGroup text={t('group_admin')} />
        </li>
        <li>
          <MenuButton
            text={t('menu_users')}
            to='/users'
            icon={<UsersIcon className='h-6' />}
            onClick={closeMenu}
            selected={'users' === select}
          />
        </li>
        <li>
          <MenuButton
            text={t('menu_settings')}
            to='/settings'
            icon={<Cog6ToothIcon className='h-6' />}
            onClick={closeMenu}
            selected={'settings' === select}
          />
        </li>
      </ul>
    </>
  )
}
