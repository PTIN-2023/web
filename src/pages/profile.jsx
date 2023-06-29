import Head from 'next/head'
import Layout from "../component/Layout"
import UserProfile from '../component/Profile'
import { useEffect } from 'react';
import useCookie from "../hooks/useCookie";
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";
import commonGetServerSideProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}
export default function Home(props) {

  const [userPicture,] = useCookie('user_picture');
  const [userTokenCookie,] = useCookie('user_token');

  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie
  })

  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    props.apiEndpoint+"/api/user_info"
  )

  useEffect(() => {
    if(stringResponse != 'none') {
      console.log("new response not none: "+stringResponse)
    }
  }, [stringResponse])

  useEffect(() => {
    if(userTokenCookie != null) {
      sumbitAndFetch();
    }
  }, [userTokenCookie])

  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout props={props}>
          {(stringResponse != "none") && <UserProfile data={JSON.parse(stringResponse)} profileImg={userPicture} client_token={userTokenCookie} />}
        </Layout>
      </main>
    </>
  )
}

