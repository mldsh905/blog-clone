import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body className='bg-[url("../../public/bg.jpg")]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
