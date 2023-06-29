import Head from 'next/head'
import Layout from "../component/Layout"
import Checkout_comp from "../component/checkout_comp"
import commonGetServerSideProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}

export default function Home(props) {
  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout props={props}>
          <Checkout_comp/>
        </Layout>
      </main>
    </>
  )
}
