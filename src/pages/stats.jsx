import Head from 'next/head'
import Layout from "../component/Layout"
import StatsContainer from "../component/StatsContainer"
import {useEffect, useState} from "react";
import * as env_config from "../utils/env_config"
import useCookie from "../hooks/useCookie";
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";
import genCommonProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await genCommonProps()
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
        <Layout props={props}>
          {stringResponse != 'none' && <StatsContainer data={JSON.parse(stringResponse)} />}
        </Layout>
      </main>
    </>
  )
}

