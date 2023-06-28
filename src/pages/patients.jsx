import Head from 'next/head'
import Layout from "../component/Layout"
import Tablapacientes from "../component/TablaPacientes"
import myordersStyles from "../styles/Myorders.module.css"
import { useState, useEffect } from "react";
import * as env_config from "../utils/env_config"
import useCookie from '../hooks/useCookie';
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetch from "../hooks/useSumbitAndFetchObject.js";
import genCommonProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await genCommonProps()
}

export default function Home(props) {

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
          <Tablapacientes props={props}/>
        </div>
        </Layout> 
      </main>
    </>
  )
}

