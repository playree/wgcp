// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HandlerWithAuth, wrapAuth } from '@/helpers/server'

const createUser: HandlerWithAuth = async (req, res) => {
  res.status(200).json({ test: 'ok' })
}

const handler = wrapAuth({ POST: createUser })
export default handler
