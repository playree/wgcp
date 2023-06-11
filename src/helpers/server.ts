import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { ZodSchema, z } from 'zod'

export const prisma = new PrismaClient()

export const getApiSession = async (req: NextApiRequest, res: NextApiResponse) => {
  return getServerSession(req, res, authOptions)
}

/** HTTPメソッド定義 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const resError = (res: NextApiResponse, code: number, message: string, detail?: object) => {
  return res.status(code).json({ error: { code, message, detail } })
}

/** ハンドラーメソッド */
export type Handler<R = unknown> = (req: NextApiRequest, res: NextApiResponse<R>) => void

/**
 * Zodバリデーションのハンドラーラップ
 * @param schema スキーマ定義
 * @param next ハンドラー
 * @returns
 */
export const wrapZod = <T extends ZodSchema>(
  schema: T,
  next: (req: Omit<NextApiRequest, 'query' | 'body'> & z.infer<T>, res: NextApiResponse) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const parsed = schema.safeParse(req)
    if (!parsed.success) {
      return resError(res, 400, 'Bad Request', JSON.parse(parsed.error.message))
    }
    return next(req, res)
  }
}

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
    return resError(res, 400, 'Bad Request')
  }
}

/** ハンドラー(認証あり)メソッド */
export type HandlerAuth<R = unknown> = (req: NextApiRequest, res: NextApiResponse<R>, session: Session) => void

/**
 * Zodバリデーションのハンドラー(認証あり)ラップ
 * @param schema スキーマ定義
 * @param next ハンドラー(認証あり)
 * @returns
 */
export const wrapZodAuth = <T extends ZodSchema>(
  schema: T,
  next: (req: Omit<NextApiRequest, 'query' | 'body'> & z.infer<T>, res: NextApiResponse, session: Session) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const parsed = schema.safeParse(req)
    if (!parsed.success) {
      return resError(res, 400, 'Bad Request', JSON.parse(parsed.error.message))
    }
    return next(req, res, session)
  }
}

/**
 * 認証付きのハンドラー作成
 * @param handlerMap ハンドラーマップ
 * @param requreAdmin 管理者権限が必要
 * @returns
 */
export const wrapHandleAuth = (handlerMap: Partial<Record<HttpMethod, HandlerAuth>>, requreAdmin = false) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getApiSession(req, res)
    if (!session) {
      return resError(res, 403, 'Invalid session')
    }
    if (requreAdmin && !session.user.isAdmin) {
      return resError(res, 403, 'Permission denied')
    }
    for (const [method, handler] of Object.entries(handlerMap)) {
      if (req.method === method) {
        return handler(req, res, session)
      }
    }
    return resError(res, 400, 'Bad Request')
  }
}
