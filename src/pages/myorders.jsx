import Head from 'next/head'
import Layout from "../component/Layout"
import TablaPedidos from "../component/TablaPedidos"
import myordersStyles from "../styles/Myorders.module.css"
import {useEffect, useState} from "react";
import * as env_config from "../utils/env_config"
import useCookie from "../hooks/useCookie";
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";
import commonGetServerSideProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}

export default function Home(props) {
 //recibe props: pedidos
 //searchValue es un estado que guarda el texto de busqueda del componente MyOrdersSearch
 //se declara aqui arriba para pasarlo a los hijos, actualizar el State y pasarlo a TablaPedidos
  const [searchValue, setSearchValue] = useState({value:"",isCompleted:false});
  const [userTokenCookie, ] = useCookie('user_token')
  const [ordersPerPage, ] = useState('10');
  const [page, ] = useState('1');  

  const [_, response] = useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token" : userTokenCookie,
      "orders_per_page" : ordersPerPage,
      "page" : page
    },
    // url
    props.apiEndpoint + "/api/list_patient_orders",
    // precheck
    (values) => {
      return values.session_token != null
    }
  )

  return (
    <>
      <Head>
        <title>TransMed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="media/logo/favicon.ico" />
      </Head>
      <main>
        {/**le pasamos a Layout el valor del componente de la página que está renderizando (Layout se encarga de detectar en que pagina está) */}
        <Layout navBarValue={setSearchValue} props={props}>
        <div className={myordersStyles.mainContainer}>
          {/**TablaPedidos recibe cuantas filas va a renderizar, los datos y el valor para filtrar en caso d eque haya */}
          {(response != "none" && response.result == "ok") && 
            <TablaPedidos 
              props={props} 
              data={response} 
              rowsPerPage={10} 
              searchValue={searchValue} 
              setSearchValue={setSearchValue}
            />}
        </div>
        </Layout> 
      </main>
    </>
  )
}

