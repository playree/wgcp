import { Card, CardTitle } from '@/components/nexkit/ui/Card'
import { Progress } from '@/components/nexkit/ui/Progress'
import { containerStyles, gridStyles } from '@/components/nexkit/ui/styles'
import { NextPageCustom } from '@/helpers/client'
import { formatByte, formatPercent, formatTime } from '@/helpers/format'
import { useLocale } from '@/helpers/locale'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import os from 'os'
import { twMerge as tm } from 'tailwind-merge'

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
    <main className={tm(containerStyles.default, gridStyles.default)}>
      <Head>
        <title>WGCP - {t('menu_dashboard')}</title>
      </Head>
      <Card className='col-span-12 sm:col-span-6'>
        <CardTitle>{t('item_systeminfo')}</CardTitle>
        <div className={gridStyles.default}>
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

      <Card className={tm(gridStyles.default, 'col-span-12 sm:col-span-6')}></Card>
    </main>
  )
}
Home.enableAuth = true
Home.enableSideMenu = 'dashboard'

export default Home
