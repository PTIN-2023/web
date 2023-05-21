import Head from 'next/head'
import Layout from "../component/Layout"
import Tabla from "../component/TablaMakeorder"
import makeorderStyles from "../styles/Makeorder.module.css"
import { useState, useEffect } from "react";
import FilterTable from "../component/FilterTable"
import '../utils/med_server.js'
import { ShopContextProvider } from '../context/shopContext';

export default function Home() {
    const [searchValue, setSearchValue] = useState({ value: "", isCompleted: false });

    let [meds, setMeds] = useState([])

    useEffect(() => {
        fetch("/api/meds")
            .then((res) => res.json())
            .then((json) => {
                setMeds(json.meds)
            })
            .catch((err) => console.log(err))
            console.log(meds)
    }, [])

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
                    <div className='flex space-between flex-start'>
                        <div>
                            <FilterTable />
                        </div>
                        <div style={{ flex: 1, marginLeft: '5px' }}>
                            {/**Tablamakeorder recibe cuantas filas va a renderizar, los datos y el valor para filtrar en caso d eque haya */}                 
                            <Tabla data={meds} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue}/>
                        </div>
                    </div>
                </Layout> 
            </main>
            </ShopContextProvider>
        </>
    );
}