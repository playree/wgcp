import { useRouter } from 'next/router'

import { ErrorLocaleItem, errorLocales } from './errors'
import { LocaleItem, locales } from './locales'

export const useLocale = () => {
  const { locale } = useRouter()
  const t = (item: LocaleItem) => {
    if (locales[item]) {
      return locales[item][locale as 'en' | 'ja'] || ''
    }
    return ''
  }
  const et = (item: ErrorLocaleItem) => {
    if (errorLocales[item]) {
      return errorLocales[item][locale as 'en' | 'ja'] || ''
    }
    return ''
  }
  const fet = (fieldError?: { message?: string }) => {
    if (fieldError) {
      if (errorLocales[fieldError.message as ErrorLocaleItem]) {
        return errorLocales[fieldError.message as ErrorLocaleItem][locale as 'en' | 'ja'] || ''
      }
    }
    return undefined
  }
  return {
    /** ロケール */
    locale,
    /** ロケール変換 */
    t,
    /** エラーロケール変換 */
    et,
    /** FieldErrorロケール変換 */
    fet,
  }
}

/** エラーロケール定義利用 */
export const el = (item: ErrorLocaleItem) => item
