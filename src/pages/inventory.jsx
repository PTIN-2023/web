import Head from 'next/head'
import Layout from "../component/Layout"
import getTextCurrentLocale from '../utils/getTextCurrentLocale'
import Tablainventarios from '../component/TablaInventario'
import {useState, useEffect} from "react";
import * as env_config from "../utils/env_config"
import useCookie from '../hooks/useCookie';
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetch from "../hooks/useSumbitAndFetchObject.js";

export async function getServerSideProps() {
    const apiEndpoint = String(env_config.getApiEndpoint());
  
    return {
      props: { 
        apiEndpoint,
      }
    }
  }

export default function Home(props) {

    const [rowsPerPage, setrowsPerPage] = useState('10');
    const [userTokenCookie, ] = useCookie('user_token')
    const [page, setPage] = useState('1');  
  
  
    const stringRequest = usePrepareBodyRequest({
      "session_token" : userTokenCookie,
      "orders_per_page" : rowsPerPage,
      "page" : page
    })
  
    const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
      stringRequest,
      props.apiEndpoint+"/api/list_inventory_orders"
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
                <Layout>
                    <div>
                        {stringResponse != 'none' && <Tablainventarios data={JSON.parse(stringResponse)} rowsPerPage={rowsPerPage} />}
                    </div>
                </Layout>
            </main>
        </>
    )
}

