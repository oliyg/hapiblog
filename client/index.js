import Head from 'next/head'
import Nav from './components/nav'

export default ({ children }) =>
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      {/* <link rel='stylesheet' href='/_next/static/style.css' /> */}
    </Head>
    <style jsx global>{`
      body {
      }
    `}</style>
    <Nav></Nav>
    {children}
  </div>
