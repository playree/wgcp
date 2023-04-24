import { NextPageCustom } from '@/common'

const Users: NextPageCustom = () => {
  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <div>test</div>
    </main>
  )
}
Users.enableAuth = true
Users.enableSideMenu = 'users'

export default Users
