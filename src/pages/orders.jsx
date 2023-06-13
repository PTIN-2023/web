import Head from 'next/head'
import Layout from "../component/Layout"
import TablaPedidosManager from "../component/TablaPedidosManager"
import myordersStyles from "../styles/Myorders.module.css"
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

  const [searchValue, setSearchValue] = useState({value:"",isCompleted:false});
  const [userTokenCookie, ] = useCookie('user_token')
  const [ordersPerPage, setOrdersPerPage] = useState('10');
  const [page, setPage] = useState('1');  


  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "orders_per_page" : ordersPerPage,
    "page" : page
  })

  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    props.apiEndpoint+"/api/list_patient_orders"
  )

  useEffect(() => {
    if(stringResponse != 'none') {
      console.log("NEW response not none:"+stringResponse)
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
        {/**le pasamos a Layout el valor del componente de la página que está renderizando (Layout se encarga de detectar en que pagina está) */}
        <Layout navBarValue={setSearchValue}>
        <div className={myordersStyles.mainContainer}>
          {/**TablaPedidos recibe cuantas filas va a renderizar, los datos y el valor para filtrar en caso d eque haya */}
          {stringResponse != 'none' && <TablaPedidosManager data={JSON.parse(stringResponse)} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue}/>}
          
        </div>
        </Layout> 
      </main>
    </>
  )
}

