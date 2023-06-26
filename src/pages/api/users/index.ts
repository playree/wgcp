import { TypeUserCreate, scUserCreate } from '@/helpers/schema'
import { handleAuthZod, wrapHandleAuth } from '@/helpers/server'
import { PrismaClient, User as UserDB } from '@prisma/client'
import { NextApiResponse } from 'next'
import { z } from 'zod'

const prisma = new PrismaClient()

export type User = Omit<UserDB, 'passwordHash' | 'isNotInit'>

export type ResSelectUsers = {
  users: User[]
}

const selectUsers = handleAuthZod(z.object({}), async (req, res: NextApiResponse<ResSelectUsers>) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, isAdmin: true, email: true, updatedAt: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })
  res.status(200).json({ users })
})

const createUser = handleAuthZod(
  z.object({
    body: scUserCreate,
  }),
  async (req, res: NextApiResponse<TypeUserCreate>) => {
    res.status(200).json(req.body)
  },
)

const handler = wrapHandleAuth({ GET: selectUsers, POST: createUser }, true)
export default handler
