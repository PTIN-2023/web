import Head from 'next/head'
import Layout from "../component/Layout"
import StatsContainer from "../component/StatsContainer"
import {useEffect, useState} from "react";
import * as env_config from "../utils/env_config"
import useCookie from "../hooks/useCookie";
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";

export async function getServerSideProps() {
  const isLocal           = env_config.isLocal();
  const apiEndpoint       = String(          env_config.getApiEndpoint());
  const locationName      = String(isLocal ? env_config.getLocationName()      : "N/A");
  const locationLatitude  = String(isLocal ? env_config.getLocationLatitude()  : "N/A");
  const locationLongitude = String(isLocal ? env_config.getLocationLongitude() : "N/A");
  const mapBoxToken       = String(          env_config.getTokenMapBox());
  const googleToken       = String(          env_config.getTokenGoogleSignIn());

  return {
    props: { 
      isLocal,
      apiEndpoint,
      locationName,
      locationLatitude,
      locationLongitude,
      mapBoxToken,
      googleToken
    }
  }
}

export default function Home(props) {

  const [userTokenCookie, ] = useCookie('user_token')

  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
  })

  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    props.apiEndpoint+"/api/stats"
  )

  useEffect(() => {
    if(stringResponse != 'none') {
      console.log("response not none")
    }
  }, [stringResponse])

  sumbitAndFetch();
  return (
    <>
      <Head>
        <title>TransMed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="media/logo/favicon.ico" />
      </Head>
      <main>
        <Layout>
          {stringResponse != 'none' && <StatsContainer data={JSON.parse(stringResponse)} />}
        </Layout>
      </main>
    </>
  )
}

