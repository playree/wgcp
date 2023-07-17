import { NextPage } from 'next'
import { Session } from 'next-auth'
import { AppProps } from 'next/app'

// 画面共通部品

export type NextPageCustom<P = Record<string, unknown>> = NextPage<
  Record<string, Session | unknown> & P,
  Record<string, Session | unknown> & P
> & {
  enableAuth?: boolean
  requireAdmin?: boolean
  enableSideMenu?: boolean | string
}

export type AppPropsCustom<P = Record<string, Session | null | undefined>> = AppProps<P> & {
  Component: NextPageCustom<P>
}

/** フォーム進捗 */
export type FormProgress = 'Ready' | 'Submited' | 'Done' | 'Error'
