import { hashPassword } from '@/helpers/password'
import { TypeUserUpdate, scUserId, scUserUpdate } from '@/helpers/schema'
import { handleAuthZod, wrapHandleAuth } from '@/helpers/server'
import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiResponse } from 'next'
import { z } from 'zod'

const prisma = new PrismaClient()

export type ReqUpdateUser = TypeUserUpdate
export type ResUpdateUser = TypeUserUpdate & { id: string }

/**
 * ユーザー編集
 */
const updateUser = handleAuthZod(
  z.object({
    query: scUserId,
    body: scUserUpdate,
  }),
  async (req, res: NextApiResponse<ResUpdateUser>) => {
    const data: Prisma.UserUpdateInput = {
      name: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    }
    if (req.body.password) {
      // パスワードの項目がある場合はパスワードの更新
      data.passwordHash = hashPassword(req.body.password)
    }
    const user = await prisma.user.update({
      where: {
        id: req.query.userid,
      },
      data,
    })
    res.status(200).json({ id: user.id, ...req.body })
  },
)

// 要管理者権限
const handler = wrapHandleAuth({ PUT: updateUser }, true)
export default handler
