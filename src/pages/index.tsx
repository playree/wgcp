import { NextPageCustom } from '@/common'
import { Card, CardTitle } from '@/components/Card'
import { Progress } from '@/components/Progress'
import { formatByte, formatPercent, formatTime } from '@/utils/format'
import { useLocale } from '@/utils/locale'
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
  const { t } = useLocale()
  return (
    <main className='container@main grid@main'>
      <Card className='col-span-12 sm:col-span-6'>
        <CardTitle>{t('item_systeminfo')}</CardTitle>
        <div className='grid@main'>
          <div className='col-span-5'>{t('item_freemem')} :</div>
          <div className='col-span-7'>
            <Progress progress={formatPercent(props.sysinfo.memory.free, props.sysinfo.memory.total)}>
              {formatByte(props.sysinfo.memory.free)} / {formatByte(props.sysinfo.memory.total)}
            </Progress>
          </div>

          <div className='col-span-5'>{t('item_uptime')} :</div>
          <div className='col-span-7'>{formatTime(props.sysinfo.uptime)}</div>
        </div>
      </Card>

      <Card className='grid@main col-span-12 sm:col-span-6'></Card>
    </main>
  )
}
Home.enableAuth = true
Home.enableSideMenu = 'dashboard'

export default Home
