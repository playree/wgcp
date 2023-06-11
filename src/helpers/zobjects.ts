import { ZodSchema, z } from 'zod'

import { el } from './locale'

export const zodReq = (param: { query?: ZodSchema; body?: ZodSchema }) => {
  return z.object({ ...param })
}

export const zUsername = z.string().nonempty(el('@required_field')).min(4, el('@invalid_username'))
export const zEmail = z.string().email(el('@invalid_email')).optional().or(z.string().length(0))
export const zIsAdmin = z.boolean()

export const scUserCreate = z.object({
  username: zUsername,
})
