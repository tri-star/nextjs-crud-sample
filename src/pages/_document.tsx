import { Head, Html, Main, NextScript } from 'next/document'

const Doc = () => {
  return (
    <Html lang="ja">
      <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}

export default Doc
