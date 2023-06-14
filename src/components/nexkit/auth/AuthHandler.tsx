import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

export const PATH_SIGNIN = '/auth/signin'

export const AuthHandler: FC<{ children: JSX.Element }> = ({ children }) => {
  const { status, data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated' && router.pathname != PATH_SIGNIN) {
      signIn()
    }
  }, [router, status])
  useEffect(() => {
    if (session) {
      console.debug('authenticated:', session)
    }
  }, [session])
  if (status === 'authenticated') {
    return children
  }
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='h-8 w-8 animate-spin rounded-xl bg-blue-600'></div>
      <div className='ml-4 font-bold'>Loading...</div>
    </div>
  )
}
