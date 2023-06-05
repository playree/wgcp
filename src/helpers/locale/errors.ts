export type ErrorLocaleItem = '@required_field' | '@invalid_username' | '@invalid_email'

export const errorLocales: Record<ErrorLocaleItem, { en: string; ja?: string }> = {
  '@required_field': {
    en: 'Required field',
    ja: '必須入力項目',
  },
  '@invalid_username': {
    en: '4 or more alphanumeric characters (.-_)',
    ja: '半角英数記号(.-_)4文字以上',
  },
  '@invalid_email': {
    en: 'Invalid email format',
    ja: 'Eメールフォーマットが不正',
  },
}
