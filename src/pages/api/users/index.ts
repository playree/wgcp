import { hashPassword } from '@/helpers/password'
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

/**
 * ユーザー一覧
 */
const selectUsers = handleAuthZod(z.object({}), async (req, res: NextApiResponse<ResSelectUsers>) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, isAdmin: true, email: true, updatedAt: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })
  res.status(200).json({ users })
})

export type ReqCreateUser = TypeUserCreate
export type ResCreateUser = TypeUserCreate & { id: string }

/**
 * ユーザー作成
 */
const createUser = handleAuthZod(
  z.object({
    body: scUserCreate,
  }),
  async (req, res: NextApiResponse<ResCreateUser>) => {
    const user = await prisma.user.create({
      data: {
        name: req.body.username,
        passwordHash: hashPassword(req.body.password),
        email: req.body.email,
        isAdmin: req.body.isAdmin,
      },
    })
    res.status(200).json({ id: user.id, ...req.body })
  },
)

const handler = wrapHandleAuth({ GET: selectUsers, POST: createUser }, true)
export default handler
