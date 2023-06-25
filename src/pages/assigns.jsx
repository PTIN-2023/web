import Head from 'next/head'
import Layout from "../component/Layout"
import myordersStyles from "../styles/Myorders.module.css"
import {useEffect, useState} from "react";
import * as env_config from "../utils/env_config"
import useCookie from "../hooks/useCookie";
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";
import AssignContainer from "../component/assign/AssignContainer"

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

  var [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    props.apiEndpoint+"/api/manager_list_doctors"
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
        <Layout props={props}>
        <div className={myordersStyles.mainContainer}>
          {/**TablaPedidos recibe cuantas filas va a renderizar, los datos y el valor para filtrar en caso d eque haya */}
          {(stringResponse != "none") && <AssignContainer data={JSON.parse(stringResponse)} props={props}/>}
          
        </div>
        </Layout> 
      </main>
    </>
  )
}

