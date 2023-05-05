// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getApiSession, wrapAuth } from '@/common'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const handler = wrapAuth(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getApiSession(req, res)
  res.status(200).json({ name: session?.user.name || '' })
})
export default handler
