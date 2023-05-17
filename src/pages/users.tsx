import { NextPageCustom } from '@/common'
import { Button } from '@/components/Button'
import { Modal, ModalAction, ModalTitle } from '@/components/Modal'
import { CheckCircleIcon, UserPlusIcon, UsersIcon, XCircleIcon } from '@/components/icon'
import { useLocale } from '@/utils/locale'
import { NextPage } from 'next'
import { useState } from 'react'

/**
 * ユーザー編集モーダル
 */
const EditModal: NextPage<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const { t } = useLocale()
  if (!isOpen) {
    return <></>
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle onClose={onClose}>
        <UserPlusIcon className='mr-2 h-5' />
        <span>{t('item_user_add')}</span>
      </ModalTitle>
      <div className='grid@main h-64'>
        <div className='col-span-12 p-2 sm:col-span-6'>
          <div className='relative mt-2'>
            <input
              type='text'
              id='username'
              placeholder=' '
              className='border@main peer block w-full appearance-none border-0 border-b bg-transparent 
            px-1 py-2.5 text-sm text-gray-900 focus:border-b-2 focus:border-blue-400 focus:outline-none 
            focus:ring-0 dark:text-white'
            />
            <label
              htmlFor='username'
              className='absolute top-3 origin-[0] -translate-y-6 scale-75 transform pl-0 text-sm text-gray-500 duration-300
            peer-placeholder-shown:left-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 
            peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-500 dark:text-gray-200'
            >
              Username
            </label>
          </div>
        </div>
      </div>
      <ModalAction>
        <Button>
          <CheckCircleIcon className='mr-1 h-5' />
          {t('item_add')}
        </Button>
        <Button className='ml-4' theme='secondary'>
          <XCircleIcon className='mr-1 h-5' />
          {t('item_cancel')}
        </Button>
      </ModalAction>
    </Modal>
  )
}

const Users: NextPageCustom = () => {
  const { t } = useLocale()
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  return (
    <main className='container@main grid@main'>
      <div className='col-span-12 flex items-center text-lg font-bold'>
        <UsersIcon className='ml-1 h-6' />
        <span className='ml-3 mr-6'>{t('menu_users')}</span>
        <Button className='text-sm' onClick={() => setIsOpenEditModal(true)}>
          <UserPlusIcon className='mr-1 h-5' />
          <span>{t('item_add')}</span>
        </Button>
      </div>
      <table className='relative col-span-12 mt-2 w-full text-left'>
        <thead>
          <tr>
            <th className='sticky top-0 bg-gray-200 p-2 dark:bg-gray-700'>username</th>
            <th className='sticky top-0 bg-gray-200 p-2 dark:bg-gray-700'>is admin</th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg@light border@light border-b'>
            <td className='p-2'>test</td>
            <td className='p-2'>ok</td>
          </tr>
          <tr className='bg@light border@light border-b'>
            <td className='p-2'>test2</td>
            <td className='p-2'>ng</td>
          </tr>
          <tr className='bg@light border@light border-b'>
            <td className='p-2'>test2</td>
            <td className='p-2'>ng</td>
          </tr>
          <tr className='bg@light border@light border-b'>
            <td className='p-2'>test2</td>
            <td className='p-2'>ng</td>
          </tr>
          <tr className='bg@light border@light border-b'>
            <td className='p-2'>test2</td>
            <td className='p-2'>ng</td>
          </tr>
        </tbody>
      </table>
      <EditModal isOpen={isOpenEditModal} onClose={() => setIsOpenEditModal(false)} />
    </main>
  )
}
Users.enableAuth = true
Users.enableSideMenu = 'users'

export default Users
