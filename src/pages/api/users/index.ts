import { scUserCreate, zodReq } from '@/helpers/schema'
import { HandlerAuth, handleAuthZod, wrapHandleAuth } from '@/helpers/server'

const createUser: HandlerAuth<{
  username: string
}> = async (req, res) => {
  res.status(200).json({ username: 'ok' })
}

const test = handleAuthZod(zodReq({ query: scUserCreate }), async (req, res) => {
  res.status(200).json({ username: 'ok' })
})

const handler = wrapHandleAuth({ GET: test, POST: createUser })
export default handler
