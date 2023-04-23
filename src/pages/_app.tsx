import { AppPropsCustom } from '@/common'
import { AuthHandler } from '@/components/AuthHandler'
import { SideMenu } from '@/components/SideMenu/'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'

export const App = ({ Component, pageProps }: AppPropsCustom) => {
  let element = <Component {...pageProps} />
  if (Component.enableSideMenu) {
    element = <SideMenu>{element}</SideMenu>
  }
  if (Component.enableAuth) {
    element = <AuthHandler>{element}</AuthHandler>
  }
  return <SessionProvider session={pageProps.session}>{element}</SessionProvider>
}
export default App
