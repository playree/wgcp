import { Menu } from '@/components/Menu'
import { AuthHandler } from '@/components/nexkit/auth/AuthHandler'
import { SideMenu } from '@/components/nexkit/ui/SideMenu'
import { ToastProvider } from '@/components/nexkit/ui/Toast'
import { AppPropsCustom } from '@/helpers/client'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

export const App = ({ Component, pageProps }: AppPropsCustom) => {
  let element = (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  )

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
