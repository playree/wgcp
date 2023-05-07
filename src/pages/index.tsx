import { NextPageCustom } from '@/common'
import Card from '@/components/Card'

const Home: NextPageCustom = () => {
  return (
    <main className='container@main grid@main'>
      <div className='col-span-12 sm:col-span-6'>
        <br></br>
        <br></br>
      </div>
      <Card className='col-span-12 sm:col-span-6'>index</Card>
      <div className='col-span-12 h-96 sm:col-span-6'></div>
      <div className='col-span-12 h-96 sm:col-span-6'></div>
    </main>
  )
}
Home.enableAuth = true
Home.enableSideMenu = 'dashboard'

export default Home
