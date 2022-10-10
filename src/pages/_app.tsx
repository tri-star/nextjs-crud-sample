import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { DefaultLayout } from '@/layouts/admin/DefaultLayout'
import { startClientWorker } from '@/mocks/browser'
import { isServer } from '@/common/ssr'
import { startMockServer } from '@/mocks/server'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

if(isServer()) {
  startMockServer()
} else {
  startClientWorker()
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getDefaultLayout = (page: ReactNode) => DefaultLayout({children: page})
  const getLayout = Component.getLayout ?? getDefaultLayout

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
