import Head from 'next/head'
import Layout from "../component/Layout"
import Tablapacientes from "../component/TablaPacientes"
import myordersStyles from "../styles/Myorders.module.css"
import { useState, useEffect } from "react";
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
   //recibe props: pedidos
 //searchValue es un estado que guarda el texto de busqueda del componente MyOrdersSearch
 //se declara aqui arriba para pasarlo a los hijos, actualizar el State y pasarlo a TablaPedidos
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
   props.apiEndpoint+"/api/list_doctor_patients"
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
        {/**le pasamos a Layout el valor del componente de la página que está renderizando (Layout se encarga de detectar en que pagina está) */}
        <Layout>
        <div className={myordersStyles.mainContainer}>
          {/**Tablapacientes recibe cuantas filas va a renderizar, los datos */}
          {stringResponse != 'none' && <Tablapacientes data={JSON.parse(stringResponse)} rowsPerPage={10}/>}
        </div>
        </Layout> 
      </main>
    </>
  )
}

