import { AppPropsCustom } from '@/common'
import { AuthHandler } from '@/components/AuthHandler'
import { Menu } from '@/components/Menu'
import { SideMenu } from '@/components/SideMenu'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

export const App = ({ Component, pageProps }: AppPropsCustom) => {
  let element = <Component {...pageProps} />
  if (Component.enableSideMenu) {
    // サイドメニューを表示するページ
    element = (
      <SideMenu menu={Menu} select={Component.enableSideMenu}>
        {element}
      </SideMenu>
    )
  }
  if (Component.enableAuth) {
    // 認証を必要とするページ
    element = <AuthHandler>{element}</AuthHandler>
  }
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute='class'>{element}</ThemeProvider>
    </SessionProvider>
  )
}
export default App
