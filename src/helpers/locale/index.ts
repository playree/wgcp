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
  return { locale, t, et }
}
