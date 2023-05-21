import Head from 'next/head'
import Layout from "../component/Layout"
import Notifications from "../component/Notifications"
import {useState, useEffect} from "react";
import useCookie from '../hooks/useCookie';
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch.js";

export default function Home(props) {

  const [userTokenCookie, ] = useCookie('user_token')
  const [confirmationsPerPage, setNotificationsPerPage] = useState('10');
  const [page, setPage] = useState('1');

  const stringRequest = usePrepareBodyRequest({
    "session_token" : "pepe@pepe.com",
    "confirmations_per_page" : confirmationsPerPage,
    "page" : page
  })

  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    props.apiEndpoint+"/api/list_doctor_pending_confirmations"
  )

  sumbitAndFetch();

  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Notifications data={stringResponse} rowsPerPage={10}/>
        </Layout>
      </main>
    </>
  )
}

