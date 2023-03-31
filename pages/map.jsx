import Head from 'next/head'
import Layout from "../component/Layout"
import Map from "../component/Map"

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
          <Map mapType="global"></Map>
          <Map mapType="local"></Map>
        </Layout>
      </main>
    </>
  )
}

