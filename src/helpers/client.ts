import { NextPage } from 'next'
import { Session } from 'next-auth'
import { AppProps } from 'next/app'

// 画面共通部品

export type NextPageCustom<P = Record<string, unknown>> = NextPage<
  Record<string, Session | unknown> & P,
  Record<string, Session | unknown> & P
> & {
  enableAuth?: boolean
  enableSideMenu?: boolean | string
}

export type AppPropsCustom<P = Record<string, Session | null | undefined>> = AppProps<P> & {
  Component: NextPageCustom<P>
}

/** className結合用 */
export const cnjoin = (...className: (string | undefined)[]) => className.join(' ')

/** フォーム進捗 */
export type FormProgress = 'Ready' | 'Submited' | 'Done' | 'Error'
