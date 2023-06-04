import { z } from 'zod'

import { ErrorLocaleItem } from './errors'

const customErrorMap =
  (et: (item: ErrorLocaleItem) => string): z.ZodErrorMap =>
  (issue, ctx) => {
    console.debug('zod:', issue, ctx)
    const msg = et(issue.message as ErrorLocaleItem)
    return { message: msg || ctx.defaultError }
  }

export const setErrorMapLocale = (et: (item: ErrorLocaleItem) => string) => {
  z.setErrorMap(customErrorMap(et))
}
