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

    const [searchValue, setSearchValue] = useState({ value: "", isCompleted: false });
    const [userTokenCookie,] = useCookie('user_token')
    const [ordersPerPage, setOrdersPerPage] = useState('10');
    const [page, setPage] = useState('1');

    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "orders_per_page" : ordersPerPage,
        "page" : page
      })
    
      const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
        stringRequest,
        //props.apiEndpoint+"/api/list_patient_prescriptions"
        props.apiEndpoint+"/api/list_patient_orders"
        
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
                <title>TransMedWebPTIN</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Layout props={props}>
                    {stringResponse != 'none' && <MyPrescriptions data={JSON.parse(stringResponse)} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue} />}
                </Layout>
            </main>
        </>
    )
}