import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getDefaultLayout = (page: ReactNode) => DefaultLayout({children: page})
  const getLayout = Component.getLayout ?? getDefaultLayout

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
