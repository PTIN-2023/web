import Head from 'next/head'
import Layout from "../component/Layout"
import NotificationsList from "../component/notifications/Notifications"



export default function Home(props) {
  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <NotificationsList />
        </Layout>
      </main>
    </>
  )
}

