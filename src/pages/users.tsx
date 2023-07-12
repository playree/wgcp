import { CheckIcon, KeyIcon, UserPlusIcon, UsersIcon, XMarkIcon } from '@/components/Icons'
import { Button } from '@/components/nexkit/ui/Button'
import { Checkbox } from '@/components/nexkit/ui/Checkbox'
import { Input } from '@/components/nexkit/ui/Input'
import { Modal, ModalAction, ModalTitle } from '@/components/nexkit/ui/Modal'
import { Textarea } from '@/components/nexkit/ui/Textarea'
import { ToastContext } from '@/components/nexkit/ui/Toast'
import { bgStyles, borderStyles, containerStyles, gridStyles, textStyles } from '@/components/nexkit/ui/styles'
import { FormProgress, NextPageCustom } from '@/helpers/client'
import { DEFAULT_WAIT, fetchJson } from '@/helpers/http'
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
  updateUsers: () => void
}> = ({ isOpen, onClose, updateUsers }) => {
  const { t, fet } = useLocale()
  const { setToast } = useContext(ToastContext)
  const [formProgress, setFormProgress] = useState<FormProgress>('Ready')
  const [userInfo, setUserInfo] = useState('')

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
      wait: DEFAULT_WAIT,
      response: (data) => {
        setUserInfo(`${t('msg_user_add_notice')}
----
${t('item_username')} : ${data.username}
${t('item_password')} : ${data.password}
${t('item_email')} : ${data.email}
${t('item_isadmin')} : ${data.isAdmin ? t('item_true') : t('item_false')}`)
        setToast(`${data.username} を作成しました`)
        setFormProgress('Done')
        updateUsers()
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

  if (formProgress === 'Done') {
    return (
      <Modal isOpen={isOpen}>
        <ModalTitle onClose={onClose}>
          <UserPlusIcon className='mr-2 h-5' />
          <span>{t('item_user_add')}</span>
        </ModalTitle>

        <div className={tm(gridStyles.default, 'mb-4 p-2')}>
          <div className='col-span-12 p-2'>{t('msg_user_add_complete')}</div>
          <div className='col-span-12 p-2'>
            <Textarea id='user_add_comp' label={t('item_user_info')} readOnly value={userInfo} rows={6} />
          </div>
        </div>

        <ModalAction className='flex-row-reverse'>
          <Button type='button' onClick={onClose}>
            <CheckIcon className='mr-1 h-5' />
            {t('item_ok')}
          </Button>
        </ModalAction>
      </Modal>
    )
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
          <div className={tm(textStyles.light, 'col-span-12 ml-2 text-sm')}>{t('msg_password_confirm')}</div>
          <div className='col-span-12 p-2 sm:col-span-6'>
            <Checkbox id='isadmin' label={t('item_isadmin')} {...register('isAdmin')} />
          </div>
        </div>

        <ModalAction className='flex-row-reverse'>
          <Button type='submit'>
            <CheckIcon className='mr-1 h-5' />
            {t('item_add')}
          </Button>
          <Button type='button' theme='secondary' onClick={onClose}>
            <XMarkIcon className='mr-1 h-5' />
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
        <tbody>
          {users.map((user) => {
            return (
              <tr key={`user_${user.id}`} className={tm(bgStyles.light, borderStyles.light, 'border-b')}>
                <td className='p-2'>{user.name}</td>
                <td className='p-2'>{user.isAdmin ? 'ok' : 'ng'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <EditModal isOpen={isOpenEditModal} onClose={() => setOpenEditModal(false)} updateUsers={updateUsers} />
    </main>
  )
}
Users.enableAuth = true
Users.enableSideMenu = 'users'

export default Users
