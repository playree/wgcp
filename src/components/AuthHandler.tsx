import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const PATH_SIGNIN = '/auth/signin'

export type AuthNextPage<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}

export const AuthHandler: React.FC<{ children: JSX.Element }> = ({ children }) => {
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
      <div className='ml-4'>Loading...</div>
    </div>
  )
}

export const AuthIsRequired: React.FC<{ children: JSX.Element }> = ({ children }) => {
  if (children.type.requireAuth) {
    return <AuthHandler>{children}</AuthHandler>
  }
  return children
}
