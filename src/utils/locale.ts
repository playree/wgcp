import { useRouter } from 'next/router'

type LocaleItem =
  | 'menu_dashboard'
  | 'menu_users'
  | 'menu_settings'
  | 'menu_locale'
  | 'menu_theme'
  | 'menu_signout'
  | 'group_user'
  | 'group_admin'
  | 'item_user'
  | 'item_user_add'
  | 'item_admin'
  | 'item_systeminfo'
  | 'item_freemem'
  | 'item_uptime'
  | 'item_add'
  | 'item_cancel'

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
  menu_theme: {
    en: 'Theme',
    ja: 'テーマ',
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
  item_user_add: {
    en: 'Add User',
    ja: 'ユーザー追加',
  },
  item_admin: {
    en: 'Administrator',
    ja: '管理者',
  },
  item_systeminfo: {
    en: 'System info',
    ja: 'システム情報',
  },
  item_freemem: {
    en: 'Free Memory',
    ja: '空きメモリ',
  },
  item_uptime: {
    en: 'Up time',
    ja: '起動時間',
  },
  item_add: {
    en: 'Add',
    ja: '追加',
  },
  item_cancel: {
    en: 'Cancel',
    ja: 'キャンセル',
  },
}

export const useLocale = () => {
  const { locale } = useRouter()
  const t = (item: LocaleItem) => {
    return locales[item][(locale as 'en' | 'ja') || 'en'] || ''
  }
  return { locale, t }
}
