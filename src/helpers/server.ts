import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { ZodSchema, z } from 'zod'

import { HttpMethod } from './http'

export const getApiSession = async (req: NextApiRequest, res: NextApiResponse) => {
  return getServerSession(req, res, authOptions)
}

export const resError = (res: NextApiResponse, code: number, message: string, detail?: object) => {
  return res.status(code).json({ error: { code, message, detail } })
}

/** ハンドラーメソッド */
export type Handler<R = unknown> = (req: NextApiRequest, res: NextApiResponse<R>) => void

/**
 * Zodバリデーション付きハンドラー
 * @param schema スキーマ定義
 * @param next ハンドラー
 * @returns
 */
export const handleZod = <T extends ZodSchema = ZodSchema>(
  schema: T,
  next: (req: Omit<NextApiRequest, 'query' | 'body'> & z.infer<T>, res: NextApiResponse) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const parsed = schema.safeParse(req)
    if (!parsed.success) {
      const errorMessage = JSON.parse(parsed.error.message)
      console.warn(errorMessage)
      return resError(res, 400, 'Bad Request', errorMessage)
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
      if (req.method?.toUpperCase() === method) {
        return handler(req, res)
      }
    }
    return resError(res, 400, 'Bad Request')
  }
}

/** ハンドラー(認証あり)メソッド */
export type HandlerAuth<R = unknown> = (req: NextApiRequest, res: NextApiResponse<R>, session: Session) => void

/**
 * Zodバリデーション付きハンドラー(認証あり)
 * @param schema スキーマ定義
 * @param next ハンドラー(認証あり)
 * @returns
 */
export const handleAuthZod = <T extends ZodSchema = ZodSchema>(
  schema: T,
  next: (req: Omit<NextApiRequest, 'query' | 'body'> & z.infer<T>, res: NextApiResponse, session: Session) => void,
  requreAdmin = false,
) => {
  return async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    if (requreAdmin && !session.user.isAdmin) {
      return resError(res, 403, 'Permission denied')
    }
    const parsed = schema.safeParse(req)
    if (!parsed.success) {
      const errorMessage = JSON.parse(parsed.error.message)
      console.warn(errorMessage)
      return resError(res, 400, 'Bad Request', errorMessage)
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
      if (req.method?.toUpperCase() === method) {
        return handler(req, res, session)
      }
    }
    return resError(res, 400, 'Bad Request')
  }
}
