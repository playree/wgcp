import { CheckCircleIcon, KeyIcon, UserPlusIcon, UsersIcon, XCircleIcon } from '@/components/Icons'
import { Button } from '@/components/nexkit/ui/Button'
import { Checkbox } from '@/components/nexkit/ui/Checkbox'
import { Input } from '@/components/nexkit/ui/Input'
import { Modal, ModalAction, ModalTitle } from '@/components/nexkit/ui/Modal'
import { ToastContext } from '@/components/nexkit/ui/Toast'
import { bgStyles, borderStyles, containerStyles, gridStyles } from '@/components/nexkit/ui/styles'
import { FormProgress, NextPageCustom } from '@/helpers/client'
import { fetchJson } from '@/helpers/http'
import { useLocale } from '@/helpers/locale/'
import { scUserCreate } from '@/helpers/schema'
import type { ReqCreateUser, ResCreateUser, ResSelectUsers, User } from '@/pages/api/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { customAlphabet } from 'nanoid'
import Head from 'next/head'
import { FC, useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { twMerge as tm } from 'tailwind-merge'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-=@#$%&', 10)

/**
 * ユーザー編集モーダル
 */
const EditModal: FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const { t, fet } = useLocale()
  const { setToast } = useContext(ToastContext)
  const [formProgress, setFormProgress] = useState<FormProgress>('Ready')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ReqCreateUser>({ resolver: zodResolver(scUserCreate), mode: 'onChange' })

  const onSubmit: SubmitHandler<ReqCreateUser> = async (data) => {
    console.debug('EditModal:submit:', data)
    setFormProgress('Submited')
    fetchJson<ResCreateUser>('/api/users', {
      method: 'POST',
      body: data,
      response: (data) => {
        setToast(`${data.username} を作成しました`)
        setFormProgress('Done')
        onClose()
      },
    })
  }

  useEffect(() => {
    setFormProgress('Ready')
    reset()
  }, [isOpen, reset])

  if (!isOpen) {
    return <></>
  }

  return (
    <Modal isOpen={isOpen} showWaiting={formProgress !== 'Ready'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalTitle onClose={onClose}>
          <UserPlusIcon className='mr-2 h-5' />
          <span>{t('item_user_add')}</span>
        </ModalTitle>

        <div className={tm(gridStyles.default, 'mb-4 p-2')}>
          <div className='col-span-12 p-2 sm:col-span-6'>
            <Input
              id='username'
              label={t('item_username')}
              error={fet(errors.username)}
              {...register('username')}
              required
            />
          </div>
          <div className='col-span-12 p-2 sm:col-span-6'>
            <Input id='email' label={t('item_email')} error={fet(errors.email)} {...register('email')} />
          </div>
          <div className='col-span-8 p-2 sm:col-span-6'>
            <Input
              id='password'
              type='password'
              label={t('item_password')}
              error={fet(errors.password)}
              {...register('password')}
              required
            />
          </div>
          <div className='col-span-4 p-2 sm:col-span-6'>
            <Button
              type='button'
              theme='noframe'
              className='mt-4'
              onClick={() => {
                const pass = nanoid()
                console.debug('gen pass:', pass)
                setValue('password', pass)
              }}
            >
              <KeyIcon className='mr-1 h-5' />
              {t('item_generate')}
            </Button>
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
        <tr key={`user_${user.id}`} className={tm(bgStyles.light, borderStyles.light, 'border-b')}>
          <td className='p-2'>{user.name}</td>
          <td className='p-2'>{user.isAdmin ? 'ok' : 'ng'}</td>
        </tr>,
      )
    }
    return userRows
  }

  return (
    <main className={tm(containerStyles.default, gridStyles.default)}>
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
