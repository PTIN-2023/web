import Head from 'next/head'
import Layout from "../component/Layout"
import Tabla from "../component/TablaMakeorder"
import makeorderStyles from "../styles/Makeorder.module.css"
import { useState, useEffect } from "react";
import FilterTable from "../component/FilterTable"
import { ShopContextProvider } from '../context/shopContext';

export default function Home() {
    const [searchValue, setSearchValue] = useState({value:"",isCompleted:false});

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
                            <Tabla searchValue={searchValue}/>
                        </div>
                    </div>
                </Layout> 
            </main>
            </ShopContextProvider>
        </>
    );
}