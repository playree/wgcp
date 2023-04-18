import { AuthAppProps, AuthHandler } from '@/components/AuthHandler'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AuthAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.requireAuth ? (
        <AuthHandler>
          <Component {...pageProps} />
        </AuthHandler>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}
