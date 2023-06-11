import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'

export const prisma = new PrismaClient()

export const getApiSession = async (req: NextApiRequest, res: NextApiResponse) => {
  return getServerSession(req, res, authOptions)
}

/** HTTPメソッド定義 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/** ハンドラーメソッド */
export type Handler = (req: NextApiRequest, res: NextApiResponse) => void

/**
 * ハンドラー作成
 * @param handlerMap ハンドラーマップ
 * @returns
 */
export const wrapHandle = (handlerMap: Partial<Record<HttpMethod, Handler>>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    for (const [method, handler] of Object.entries(handlerMap)) {
      if (req.method === method) {
        return handler(req, res)
      }
    }
    return res.status(400).json({ error: 'Bad Request' })
  }
}

/** ハンドラー(認証あり)メソッド */
export type HandlerWithAuth = (req: NextApiRequest, res: NextApiResponse, session: Session) => void

/**
 * 認証付きのハンドラー作成
 * @param handlerMap ハンドラーマップ
 * @param requreAdmin 管理者権限が必要
 * @returns
 */
export const wrapAuth = (handlerMap: Partial<Record<HttpMethod, HandlerWithAuth>>, requreAdmin = false) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getApiSession(req, res)
    if (!session) {
      return res.status(403).json({ error: 'Invalid session' })
    }
    if (requreAdmin && !session.user.isAdmin) {
      return res.status(403).json({ error: 'Permission denied' })
    }
    for (const [method, handler] of Object.entries(handlerMap)) {
      if (req.method === method) {
        return handler(req, res, session)
      }
    }
    return res.status(400).json({ error: 'Bad Request' })
  }
}
