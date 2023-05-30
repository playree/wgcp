import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'

export const prisma = new PrismaClient()

export const getApiSession = async (req: NextApiRequest, res: NextApiResponse) => {
  return getServerSession(req, res, authOptions)
}

export const wrapAuth = (
  handler: (req: NextApiRequest, res: NextApiResponse, session: Session) => void,
  requreAdmin = false,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getApiSession(req, res)
    if (!session) {
      return res.status(403).json({ error: 'Invalid session' })
    }
    if (requreAdmin && !session.user.isAdmin) {
      return res.status(403).json({ error: 'Permission denied' })
    }
    return handler(req, res, session)
  }
}
