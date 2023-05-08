import { NextPageCustom } from '@/common'
import Card from '@/components/Card'
import { convByte } from '@/utils/conv'
import { GetServerSideProps } from 'next'
import os from 'os'

type Props = {
  sysinfo: {
    timestamp: number
    memory: { total: number; free: number }
    uptime: number
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      sysinfo: {
        timestamp: new Date().getTime(),
        memory: { total: os.totalmem(), free: os.freemem() },
        uptime: os.uptime(),
      },
    },
  }
}

const Home: NextPageCustom<Props> = (props) => {
  return (
    <main className='container@main grid@main'>
      <div className='col-span-12 sm:col-span-6'>
        <br></br>
        <br></br>
      </div>
      <Card className='col-span-12 sm:col-span-6'>
        {convByte(props.sysinfo.memory.free)} / {convByte(props.sysinfo.memory.total)}
      </Card>
      <div className='col-span-12 h-96 sm:col-span-6'></div>
      <div className='col-span-12 h-96 sm:col-span-6'></div>
    </main>
  )
}
Home.enableAuth = true
Home.enableSideMenu = 'dashboard'

export default Home
