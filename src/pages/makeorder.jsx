import Head from 'next/head'
import Layout from "../component/Layout"
import Tabla from "../component/TablaMakeorder"
import makeorderStyles from "../styles/Makeorder.module.css"
import { useState, useEffect } from "react";
import FilterTable from "../component/FilterTable"
import { ShopContextProvider } from '../context/shopContext';
import * as env_config from "../utils/env_config"
import useCookie from "../hooks/useCookie";
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";

export async function getServerSideProps(props) {
    const apiEndpoint       = String(          env_config.getApiEndpoint());

    return {
        props: {
            apiEndpoint
        }
    }
}

export default function Home(props) {
    const [searchValue, setSearchValue] = useState({ value: "", isCompleted: false });
    const [userTokenCookie, ] = useCookie('user_token')
    const [medName, setMedName] = useState();
    const [price, setPrice] = useState();
    const [ordersPerPage, setOrdersPerPage] = useState('10');
    const [page, setPage] = useState('1');  
    
    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "medicine_identifier": '0',
        "medicine_image_url": 'https://picsum.photos/200',
        "medicine_name": 'Ibuprofeno',
        "excipient": 'Sorbitol (E-420)',
        "pvp": 4,
        "contents": '30 comprimidos',
        "prescription_needed": false,
        "form": 'pill',
        "type_of_adminstration": 'oral',
        "orders_per_page" : ordersPerPage,
        "page" : page
    })
    
    const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
        stringRequest,
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
            <ShopContextProvider>
            <Head>
                <title>TransMedWebPTIN</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/**le pasamos a Layout el valor del componente de la página que está renderizando (Layout se encarga de detectar en que pagina está) */}
                <Layout navBarValue={setSearchValue}>
                    <div className='flex space-between flex-start' style={{ backgroundColor: '#87CEFA' }}>
                        <div>
                            <FilterTable />
                        </div>
                        <div style={{ flex: 1, marginLeft: '5px' }}>
                            {/**Tablamakeorder recibe cuantas filas va a renderizar, los datos y el valor para filtrar en caso d eque haya */}                 
                            {stringResponse != 'none' && <Tabla data={JSON.parse(stringResponse)} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue}/>}
                        </div>
                    </div>
                </Layout> 
            </main>
            </ShopContextProvider>
        </>
    );
}