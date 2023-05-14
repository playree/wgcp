import { NextPageCustom } from '@/common'
import { Button } from '@/components/Button'
import { Modal, ModalTitle } from '@/components/Modal'
import { UserPlusIcon, UsersIcon } from '@/components/icon'
import { useLocale } from '@/utils/locale'
import { NextPage } from 'next'
import { useState } from 'react'

const EditModal: NextPage<{
  isOpen: boolean
}> = ({ isOpen }) => {
  if (!isOpen) {
    return <></>
  }
  return (
    <Modal isOpen={isOpen}>
      <ModalTitle>Title</ModalTitle>
      <div className='h-64'></div>
    </Modal>
  )
}

const Users: NextPageCustom = () => {
  const { t } = useLocale()
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  return (
    <main className='container@main grid@main'>
      <div className='col-span-12 flex items-center text-lg font-bold sm:col-span-6'>
        <UsersIcon className='ml-1 h-6' />
        <span className='ml-3 mr-6'>{t('menu_users')}</span>
        <Button onClick={() => setIsOpenEditModal(true)}>
          <UserPlusIcon className='mr-1 h-5' />
          <span>{t('item_add')}</span>
        </Button>
      </div>
      <div className='col-span-12 flex sm:col-span-6'></div>
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
      <EditModal isOpen={isOpenEditModal} />
    </main>
  )
}
Users.enableAuth = true
Users.enableSideMenu = 'users'

export default Users
