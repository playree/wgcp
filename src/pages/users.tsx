import { NextPageCustom } from '@/common'
import { Button } from '@/components/Button'
import { UserPlusIcon, UsersIcon } from '@/components/icon'
import { useLocale } from '@/utils/locale'

const Users: NextPageCustom = () => {
  const { t } = useLocale()
  return (
    <main className='container@main grid@main'>
      <div className='col-span-12 flex text-lg font-bold sm:col-span-6'>
        <UsersIcon className='h-6' />
        <span className='ml-2 mr-6'>{t('menu_users')}</span>
        <Button>
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
    </main>
  )
}
Users.enableAuth = true
Users.enableSideMenu = 'users'

export default Users
