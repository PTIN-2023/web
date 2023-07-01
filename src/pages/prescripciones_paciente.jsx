import Head from 'next/head'
import Layout from "../component/Layout"
import MyPrescriptions from "../component/Prescripciones_Paciente"
import useCookie from "../hooks/useCookie";
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";
import {useEffect, useState} from "react";
import * as env_config from "../utils/env_config"
import commonGetServerSideProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}

export default function Home(props) {
  const [userTokenCookie,] = useCookie('user_token')

  const [_, response] = useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token" : userTokenCookie,
    },
    // url
    props.apiEndpoint + "/api/get_patient_prescription_history",
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
          {response != 'none' && response.result == "ok" && 
          <MyPrescriptions 
            data={response} 
          />
          }
        </Layout>
      </main>
    </>
  )
}