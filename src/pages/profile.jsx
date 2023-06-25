import Head from 'next/head'
import Layout from "../component/Layout"
import Profile from "../component/Profile"
import UserProfile from '../component/Profile'
import genCommonProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await genCommonProps()
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
          <UserProfile/>
        </Layout>
      </main>
    </>
  )
}

