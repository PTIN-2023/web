import Head from 'next/head'
import Layout from "../component/Layout"
import Tabla from "../component/makeOrder/TablaMakeorder"
import makeorderStyles from "../styles/Makeorder.module.css"
import { useState, useEffect } from "react";
import FilterTable from "../component/makeOrder/FilterTable"
import { ShopContextProvider } from '../context/shopContext'
import * as env_config from "../utils/env_config.js";
import useCookie from "../hooks/useCookie"
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetchObject from "../hooks/useSumbitAndFetchObject.js";

export async function getServerSideProps() {
    const apiEndpoint = String(env_config.getApiEndpoint());

    return {
        props: {
            apiEndpoint
        }
    }
}

export default function Home(props) {
    const [searchValue, setSearchValue] = useState({value:"",isCompleted:false});

    // Cookies
    //const [userTokenCookie, ] = useCookie('user_token')
    const [userTokenCookie, ] = useCookie(null)

    // Form values
    const [medsPerPage, setMedsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [medName, setMedName] = useState('Paracetamol');
    const [pvpMin, setPvpMin] = useState('0');
    const [pvpMax, setPvpMax] = useState('10000');
    const [prescriptionNeeded, setPrescriptionNeeded] = useState([true, false]);
    const [medForm, setMedForm] = useState(['pill', 'cream', 'powder', 'liquid', 'Tablets']);
    const [typeOfAdminst, setTypeOfAdminst] = useState(['Oral', 'topical', 'inhalation', 'ophthalmic']);

    // Request
    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "filter": {
            "meds_per_page": medsPerPage,
            "page": page,
            "med_name": medName,
            "pvp_min": pvpMin,
            "pvp_max": pvpMax,
            "prescription_needed": prescriptionNeeded,
            "form": medForm,
            "type_of_administration": typeOfAdminst
        }
    })
        
    const [sumbitAndFetch, response] = useSumbitAndFetchObject(
        props.apiEndpoint+"/api/list_available_medicines",
        stringRequest,
        (res) => console.log(res)
    )

    useEffect(() => {
        if(userTokenCookie != null)
            sumbitAndFetch();
    }, [page, userTokenCookie])

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
                            <Tabla medicine={response}/>
                        </div>
                    </div>
                </Layout> 
            </main>
            </ShopContextProvider>
        </>
    );
}