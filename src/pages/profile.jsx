import Head from 'next/head';
import Layout from "../component/Layout";
import UserProfile from '../component/Profile';
import { useEffect, useState } from 'react';
import useCookie from "../hooks/useCookie";
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";
import commonGetServerSideProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await commonGetServerSideProps();
}

export default function Home(props) {
  const [userPicture,] = useCookie('user_picture');
  const [userTokenCookie,] = useCookie('user_token');
  const [userInfo, setUserInfo] = useState(null);

  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie
  });

  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    props.apiEndpoint + "/api/user_info"
  );
  
  useEffect(() => {
    if (stringResponse !== 'none') {
      console.log("new response not none: " + stringResponse);
    }
  }, [stringResponse]);

  useEffect(() => {
    const fetchData = async () => {
      if (userTokenCookie !== null) {
        console.log("Token: " + userTokenCookie);
        await sumbitAndFetch();
        console.log("-----------------------------");
        setUserInfo(stringResponse);
      }
    };
  
    fetchData();
  }, [userTokenCookie, sumbitAndFetch]);
  
  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout props={props}>
          {((userInfo !== null) && (userInfo !== 'none') && (userInfo.result != "error")) && (
            <UserProfile
              data={userInfo}
              profileImg={userPicture}
              client_token={userTokenCookie}
            />
          )}
        </Layout>
      </main>
    </>
  );
}