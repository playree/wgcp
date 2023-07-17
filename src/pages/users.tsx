import { CheckIcon, KeyIcon, PencilSquareIcon, UserPlusIcon, UsersIcon, XMarkIcon } from '@/components/Icons'
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
import { scUserCreate, scUserUpdate } from '@/helpers/schema'
import { n2ud } from '@/helpers/tools'
import type { ReqCreateUser, ResCreateUser, ResSelectUsers, User } from '@/pages/api/users'
import type { ReqUpdateUser } from '@/pages/api/users/[userid]'
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
  targetUser?: User
}> = ({ isOpen, onClose, updateUsers, targetUser }) => {
  const { t, fet } = useLocale()
  const { setToast } = useContext(ToastContext)
  const [formProgress, setFormProgress] = useState<FormProgress>('Ready')
  const [userInfo, setUserInfo] = useState('')

  const ufCreate = useForm<ReqCreateUser>({ resolver: zodResolver(scUserCreate), mode: 'onChange' })
  const ufEdit = useForm<ReqUpdateUser>({ resolver: zodResolver(scUserUpdate), mode: 'onChange' })
  const {
    formState: { errors },
    reset,
  } = targetUser ? ufEdit : ufCreate
  if (targetUser) {
    ufEdit.setValue('username', targetUser.name)
    ufEdit.setValue('email', n2ud(targetUser.email))
    ufEdit.setValue('isAdmin', targetUser.isAdmin)
  }

  const onSubmitCreate: SubmitHandler<ReqCreateUser> = async (data) => {
    console.debug('onSubmitCreate:', data)
    setFormProgress('Submited')
    fetchJson<ResCreateUser>('/api/users', {
      method: 'POST',
      body: data,
      wait: DEFAULT_WAIT,
      response: (data) => {
        setUserInfo(`${t('msg_user_add_notice')}

${t('item_username')} : ${data.username}
${t('item_password')} : ${data.password}
${t('item_email')} : ${data.email}
${t('item_isadmin')} : ${data.isAdmin ? t('item_true') : t('item_false')}`)
        setFormProgress('Done')
        updateUsers()
      },
      error: () => {
        console.error(`onSubmitCreate:error`)
        setToast(t('msg_common_error'))
        setFormProgress('Error')
      },
    })
  }

  const onSubmitUpdate: SubmitHandler<ReqUpdateUser> = async (data) => {
    console.debug('onSubmitUpdate:', targetUser?.id, data)
    if (!targetUser) {
      return
    }
    setFormProgress('Submited')
    fetchJson<ResCreateUser>(`/api/users/${targetUser.id}`, {
      method: 'PUT',
      body: data,
      wait: DEFAULT_WAIT,
      response: (data) => {
        setUserInfo(`${t('msg_user_update_notice')}

${t('item_username')} : ${data.username}
${t('item_password')} : ${data.password}
${t('item_email')} : ${data.email}
${t('item_isadmin')} : ${data.isAdmin ? t('item_true') : t('item_false')}`)
        setFormProgress('Done')
        updateUsers()
      },
      error: () => {
        console.error(`onSubmitUpdate:error`)
        setToast(t('msg_common_error'))
        setFormProgress('Error')
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
          <span>{targetUser ? t('item_user_edit') : t('item_user_add')}</span>
        </ModalTitle>

        <div className={tm(gridStyles.default, 'mb-4 p-2')}>
          <div className='col-span-12 p-2'>
            {targetUser ? t('msg_user_update_complete') : t('msg_user_add_complete')}
          </div>
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
    <Modal isOpen={isOpen} showWaiting={formProgress == 'Submited'}>
      <form onSubmit={targetUser ? ufEdit.handleSubmit(onSubmitUpdate) : ufCreate.handleSubmit(onSubmitCreate)}>
        <ModalTitle onClose={onClose}>
          <UserPlusIcon className='mr-2 h-5' />
          <span>{targetUser ? t('item_user_edit') : t('item_user_add')}</span>
        </ModalTitle>

        <div className={tm(gridStyles.default, 'mb-4 p-2')}>
          <div className='col-span-12 p-2 sm:col-span-6'>
            <Input
              id='username'
              label={t('item_username')}
              error={fet(errors.username)}
              {...(targetUser ? ufEdit.register('username') : ufCreate.register('username'))}
              required
            />
          </div>
          <div className='col-span-12 p-2 sm:col-span-6'>
            <Input
              id='email'
              label={t('item_email')}
              error={fet(errors.email)}
              {...(targetUser ? ufEdit.register('email') : ufCreate.register('email'))}
            />
          </div>
          <div className='col-span-8 p-2 sm:col-span-6'>
            <Input
              id='password'
              type='password'
              autoComplete='new-password'
              enablePasswordShowButton
              label={t('item_password')}
              error={fet(errors.password)}
              {...(targetUser ? ufEdit.register('password') : ufCreate.register('password'))}
              required={!targetUser}
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
                targetUser ? ufEdit.setValue('password', pass) : ufCreate.setValue('password', pass)
              }}
            >
              <KeyIcon className='mr-1 h-5' />
              {t('item_generate')}
            </Button>
          </div>
          <div className={tm(textStyles.light, 'col-span-12 ml-2 text-sm')}>{t('msg_password_confirm')}</div>
          <div className='col-span-12 p-2 sm:col-span-6'>
            <Checkbox
              id='isadmin'
              label={t('item_isadmin')}
              {...(targetUser ? ufEdit.register('isAdmin') : ufCreate.register('isAdmin'))}
            />
          </div>
        </div>

        <ModalAction className='flex-row-reverse'>
          <Button type='submit'>
            <CheckIcon className='mr-1 h-5' />
            {targetUser ? t('item_update') : t('item_add')}
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
  const [targetUser, setTargetUser] = useState<User>()

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

  const openCreateModal = () => {
    setTargetUser(undefined)
    setOpenEditModal(true)
  }

  const openEditModal = (user: User) => {
    setTargetUser(user)
    setOpenEditModal(true)
  }

  return (
    <main className={tm(containerStyles.default, gridStyles.default)}>
      <Head>
        <title>WGCP - {t('menu_users')}</title>
      </Head>
      <div className='col-span-12 ml-8 flex items-center text-lg font-bold md:ml-0'>
        <UsersIcon className='ml-1 h-6' />
        <span className='ml-3 mr-6'>{t('menu_users')}</span>
        <Button className='text-sm' onClick={openCreateModal}>
          <UserPlusIcon className='mr-1 h-5' />
          <span>{t('item_add')}</span>
        </Button>
      </div>
      <table className='relative col-span-12 mt-2 w-full text-left'>
        <thead>
          <tr>
            <th className={tm(textStyles.light, 'sticky top-0 bg-gray-200 p-2 dark:bg-gray-700')}>
              <PencilSquareIcon className='mx-2 h-5' />
            </th>
            <th className={tm(textStyles.light, 'sticky top-0 bg-gray-200 p-2 dark:bg-gray-700')}>username</th>
            <th className={tm(textStyles.light, 'sticky top-0 bg-gray-200 p-2 dark:bg-gray-700')}>is admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={`user_${user.id}`} className={tm(bgStyles.light, borderStyles.light, 'border-b')}>
                <td className='w-0 p-2'>
                  <Button
                    theme='noframe'
                    onClick={() => {
                      openEditModal(user)
                    }}
                  >
                    <PencilSquareIcon className='h-5' />
                  </Button>
                </td>
                <td className='p-2'>{user.name}</td>
                <td className='p-2'>{user.isAdmin ? 'ok' : 'ng'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <EditModal
        isOpen={isOpenEditModal}
        onClose={() => setOpenEditModal(false)}
        updateUsers={updateUsers}
        targetUser={targetUser}
      />
    </main>
  )
}
Users.enableAuth = true
Users.requireAdmin = true
Users.enableSideMenu = 'users'

export default Users
