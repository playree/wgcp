// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { wrapAuth } from '@/common'
import { execCmdSync } from '@/utils/shellcmd'
import type { NextApiRequest, NextApiResponse } from 'next'
import os from 'os'

const handler = wrapAuth(
  async (
    req: NextApiRequest,
    res: NextApiResponse<{
      timestamp: number
      memory: { total: number; free: number }
      uptime: number
    }>,
  ) => {
    const { code } = await execCmdSync('wg --version')
    console.log('code:', code)
    res.status(200).json({
      timestamp: new Date().getTime(),
      memory: { total: os.totalmem(), free: os.freemem() },
      uptime: os.uptime(),
    })
  },
)
export default handler
