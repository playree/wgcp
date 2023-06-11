import { HandlerAuth, wrapHandleAuth, wrapZodAuth } from '@/helpers/server'
import { scUserCreate, zodReq } from '@/helpers/zobjects'

const createUser: HandlerAuth<{
  username: string
}> = async (req, res) => {
  res.status(200).json({ username: 'ok' })
}

const test = wrapZodAuth(zodReq({ query: scUserCreate }), async (req, res) => {
  res.status(200).json({ username: 'ok' })
})

const handler = wrapHandleAuth({ GET: test, POST: createUser })
export default handler