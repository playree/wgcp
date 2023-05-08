import { useRouter } from 'next/router'

type LocaleItem =
  | 'menu_dashboard'
  | 'menu_users'
  | 'menu_settings'
  | 'menu_locale'
  | 'menu_signout'
  | 'group_user'
  | 'group_admin'
  | 'item_user'
  | 'item_admin'

const locales: Record<LocaleItem, { en: string; ja?: string }> = {
  menu_dashboard: {
    en: 'Dashboard',
    ja: 'ダッシュボード',
  },
  menu_users: {
    en: 'Users',
    ja: 'ユーザー管理',
  },
  menu_settings: {
    en: 'Settings',
    ja: '設定',
  },
  menu_locale: {
    en: 'Locale',
    ja: '言語',
  },
  menu_signout: {
    en: 'Sign Out',
    ja: 'サインアウト',
  },
  group_user: {
    en: 'User',
    ja: 'ユーザー',
  },
  group_admin: {
    en: 'Admin',
    ja: '管理者',
  },
  item_user: {
    en: 'User',
    ja: '一般ユーザー',
  },
  item_admin: {
    en: 'Administrator',
    ja: '管理者',
  },
}

export const useLocale = () => {
  const { locale } = useRouter()
  const t = (item: LocaleItem) => {
    return locales[item][(locale as 'en' | 'ja') || 'en'] || ''
  }
  return { locale, t }
}