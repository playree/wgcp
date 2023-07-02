import { z } from 'zod'

import { el } from './locale'

export const zUsername = z.string().nonempty(el('@required_field')).min(4, el('@invalid_username'))
export const zEmail = z.string().email(el('@invalid_email')).optional().or(z.string().length(0))
export const zIsAdmin = z.boolean()
export const zPassword = z.string().nonempty(el('@required_field')).min(8, el('@invalid_password'))
export const zCsrfToken = z.string()

// サインイン
export const scSignin = z.object({
  username: zUsername,
  password: zPassword,
})
export type TypeSignin = z.infer<typeof scSignin>

// ユーザー作成
export const scUserCreate = z.object({
  username: zUsername,
  password: zPassword,
  email: zEmail,
  isAdmin: zIsAdmin,
})
export type TypeUserCreate = z.infer<typeof scUserCreate>
