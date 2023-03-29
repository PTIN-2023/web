import Head from 'next/head'
import Layout from "../component/Layout"
import { SampleContent } from '../component/SampleContent'

export default function Home() {
  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <SampleContent />
        </Layout>
      </main>
    </>
  )
}

