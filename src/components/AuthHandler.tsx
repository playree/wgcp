import { NextPage } from 'next'
import { Session } from 'next-auth'
import { signIn, useSession } from 'next-auth/react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const PATH_SIGNIN = '/auth/signin'

export type AuthAppProps = AppProps<{ session: Session }> & { Component: { requireAuth: boolean } }

export type AuthNextPage<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}

export const AuthHandler = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated' && router.pathname != PATH_SIGNIN) {
      signIn()
    }
  }, [router, status])
  if (status === 'authenticated') return children
  return <p>Loading...</p>
}
