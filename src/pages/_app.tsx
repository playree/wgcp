import { AuthIsRequired } from '@/components/AuthHandler'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthIsRequired>
        <Component {...pageProps} />
      </AuthIsRequired>
    </SessionProvider>
  )
}
export default App
