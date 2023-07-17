import { z } from 'zod'

import { el } from './locale'

export const zUserId = z.string().nonempty().uuid()
export const zUsername = z.string().nonempty(el('@required_field')).min(4, el('@invalid_username'))
export const zEmail = z.string().email(el('@invalid_email')).optional().or(z.string().length(0))
export const zIsAdmin = z.boolean()
export const zPassword = z.string().nonempty(el('@required_field')).min(8, el('@invalid_password'))
export const zPasswordOpt = z.string().min(8, el('@invalid_password')).optional().or(z.string().length(0))
export const zCsrfToken = z.string()

// サインイン
export const scSignin = z.object({
  username: zUsername,
  password: zPassword,
})
export type TypeSignin = z.infer<typeof scSignin>

// ユーザーID
export const scUserId = z.object({
  userid: zUserId,
})

// ユーザー作成
export const scUserCreate = z.object({
  username: zUsername,
  password: zPassword,
  email: zEmail,
  isAdmin: zIsAdmin,
})
export type TypeUserCreate = z.infer<typeof scUserCreate>

// ユーザー更新
export const scUserUpdate = z.object({
  username: zUsername,
  password: zPasswordOpt,
  email: zEmail,
  isAdmin: zIsAdmin,
})
export type TypeUserUpdate = z.infer<typeof scUserUpdate>
