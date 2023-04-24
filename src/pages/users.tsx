import { NextPageCustom } from '@/common'

const Users: NextPageCustom = () => {
  return (
    <main className='container@main'>
      <br></br>
      <br></br>
      <div>test</div>
    </main>
  )
}
Users.enableAuth = true
Users.enableSideMenu = 'users'

export default Users
