import Head from 'next/head';
import Layout from "../component/Layout";
import UserProfile from '../component/Profile';
import useCookie from "../hooks/useCookie";
import useAutoSumbitAndFetchObject from "../hooks/useAutoSumbitAndFetchObject";
import commonGetServerSideProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await commonGetServerSideProps();
}
export default function Home(props) {
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token');

  const [getUserData, profileInfoResponse] = useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token" : userTokenCookie
    },
    // url
    props.apiEndpoint + "/api/user_info",
    // precheck
    (values) => {
      return values.session_token != null
    }
  )
  
  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout props={props}>
          {(profileInfoResponse != "none" && profileInfoResponse.result == "ok") && 
            <UserProfile 
              data={profileInfoResponse} 
              userToken={userTokenCookie}
              getUserData={getUserData}
              setUserToken={setUserTokenCookie}
              props={props}
            />
          }
        </Layout>
      </main>
    </>
  );
}