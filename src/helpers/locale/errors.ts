export type ErrorLocaleItem = '@required_field'

export const errorLocales: Record<ErrorLocaleItem, { en: string; ja?: string }> = {
  '@required_field': {
    en: 'Required field',
    ja: '必須入力項目です',
  },
}
