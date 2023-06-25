import { TypeUserCreate, scUserCreate } from '@/helpers/schema'
import { handleAuthZod, wrapHandleAuth } from '@/helpers/server'
import { NextApiResponse } from 'next'
import { z } from 'zod'

const createUser = handleAuthZod(
  z.object({
    body: scUserCreate,
  }),
  async (req, res: NextApiResponse<TypeUserCreate>) => {
    res.status(200).json(req.body)
  },
)

const handler = wrapHandleAuth({ POST: createUser })
export default handler
