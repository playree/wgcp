// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { wrapHandle } from '@/helpers/server'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const handler = wrapHandle({
  GET: async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).json({ name: 'test' })
  },
})
export default handler
