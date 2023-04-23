import { PrismaClient } from '@prisma/client'
import type { NextPage } from 'next'
import { Session } from 'next-auth'
import type { AppProps } from 'next/app'

export const prisma = new PrismaClient()

export type NextPageCustom<P = Record<string, Session | null | undefined>, IP = P> = NextPage<P, IP> & {
  enableAuth?: boolean
  enableSideMenu?: boolean | string
}

export type AppPropsCustom<P = Record<string, Session | null | undefined>> = AppProps<P> & {
  Component: NextPageCustom<P>
}
