import { CheckCircleIcon, UserPlusIcon, UsersIcon, XCircleIcon } from '@/components/Icons'
import { Button } from '@/components/nexkit/ui/Button'
import { Checkbox } from '@/components/nexkit/ui/Checkbox'
import { Input } from '@/components/nexkit/ui/Input'
import { Modal, ModalAction, ModalTitle } from '@/components/nexkit/ui/Modal'
import { bgStyles, borderStyles, containerStyles, gridStyles } from '@/components/nexkit/ui/styles'
import { jc } from '@/components/nexkit/ui/utils'
import { FormProgress, NextPageCustom } from '@/helpers/client'
import { fetchJson } from '@/helpers/http'
import { useLocale } from '@/helpers/locale/'
import { TypeUserCreate, scUserCreate } from '@/helpers/schema'
import type { ResSelectUsers, User } from '@/pages/api/users'
import { zodResolver } from '@hookform/resolvers/zod'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

/**
 * ユーザー編集モーダル
 */
const EditModal: FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const { t, fet } = useLocale()
  const [formProgress, setFormProgress] = useState<FormProgress>('Ready')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TypeUserCreate>({ resolver: zodResolver(scUserCreate), mode: 'onChange' })

  const onSubmit: SubmitHandler<TypeUserCreate> = async (data) => {
    console.debug('EditModal:submit:', data)

    setFormProgress('Done')
    reset()
  }

  useEffect(() => {
    setFormProgress('Ready')
    reset()
  }, [isOpen, reset])

  if (!isOpen) {
    return <></>
  }

  if (formProgress === 'Done') {
    // 登録完了
    return (
      <Modal isOpen={isOpen} showWaiting>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalTitle onClose={onClose}>
            <UserPlusIcon className='mr-2 h-5' />
            <span>{t('item_user_add')}</span>
          </ModalTitle>

          <div className={jc(gridStyles.default, 'mb-4 p-2')}>
            <div className='col-span-12 p-2 sm:col-span-6'>
              <Input id='username' label={t('item_username')} {...register('username')} />
            </div>
            <div className='col-span-12 p-2 sm:col-span-6'>
              <Input id='email' label={t('item_email')} {...register('email')} />
            </div>
            <div className='col-span-12 p-2 sm:col-span-6'>
              <Checkbox id='isadmin' label={t('item_isadmin')} {...register('isAdmin')} />
            </div>
          </div>

          <ModalAction className='flex-row-reverse'>
            <Button type='button' onClick={onClose}>
              <CheckCircleIcon className='mr-1 h-5' />
              {t('item_ok')}
            </Button>
          </ModalAction>
        </form>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalTitle onClose={onClose}>
          <UserPlusIcon className='mr-2 h-5' />
          <span>{t('item_user_add')}</span>
        </ModalTitle>

        <div className={jc(gridStyles.default, 'mb-4 p-2')}>
          <div className='col-span-12 p-2 sm:col-span-6'>
            <Input id='username' label={t('item_username')} error={fet(errors.username)} {...register('username')} />
          </div>
          <div className='col-span-12 p-2 sm:col-span-6'>
            <Input id='email' label={t('item_email')} error={fet(errors.email)} {...register('email')} />
          </div>
          <div className='col-span-12 p-2 sm:col-span-6'>
            <Checkbox id='isadmin' label={t('item_isadmin')} {...register('isAdmin')} />
          </div>
        </div>

        <ModalAction className='flex-row-reverse'>
          <Button type='submit'>
            <CheckCircleIcon className='mr-1 h-5' />
            {t('item_add')}
          </Button>
          <Button type='button' theme='secondary' onClick={onClose}>
            <XCircleIcon className='mr-1 h-5' />
            {t('item_cancel')}
          </Button>
        </ModalAction>
      </form>
    </Modal>
  )
}

const Users: NextPageCustom = () => {
  const { t } = useLocale()
  const [isOpenEditModal, setOpenEditModal] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  const updateUsers = () => {
    fetchJson<ResSelectUsers>('/api/users', {
      response: ({ users }) => {
        setUsers([...users])
      },
    })
  }

  useEffect(() => {
    updateUsers()
  }, [])

  const viewUsers = () => {
    const userRows = []
    for (const user of users) {
      userRows.push(
        <tr key={`user_${user.id}`} className={jc(bgStyles.light, borderStyles.light, 'border-b')}>
          <td className='p-2'>{user.name}</td>
          <td className='p-2'>{user.isAdmin ? 'ok' : 'ng'}</td>
        </tr>,
      )
    }
    return userRows
  }

  return (
    <main className={jc(containerStyles.default, gridStyles.default)}>
      <Head>
        <title>WGCP - {t('menu_users')}</title>
      </Head>
      <div className='col-span-12 ml-8 flex items-center text-lg font-bold md:ml-0'>
        <UsersIcon className='ml-1 h-6' />
        <span className='ml-3 mr-6'>{t('menu_users')}</span>
        <Button className='text-sm' onClick={() => setOpenEditModal(true)}>
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
        <tbody>{viewUsers()}</tbody>
      </table>
      <EditModal isOpen={isOpenEditModal} onClose={() => setOpenEditModal(false)} />
    </main>
  )
}
Users.enableAuth = true
Users.enableSideMenu = 'users'

export default Users
