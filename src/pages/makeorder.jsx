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
    const [userTokenCookie, ] = useCookie('user_token')

    // Form values
    const [medName, setMedName] = useState();
    const [pvpMin, setPvpMin] = useState(0);
    const [pvpMax, setPvpMax] = useState(50);
    const [prescriptionNeeded, setPrescriptionNeeded] = useState(null)
    const [medForm, setMedForm] = useState(["Tablets","Capsules","Gel","Cream","Powder","Liquid"])
    const [typeOfAdminst, setTypeOfAdminst] = useState(["Oral","Topical","Inhalation","Ophthalmic"])
    const [page, setPage] = useState(1);
    const [medsPerPage, setMedsPerPage] = useState(10);

    // Request
    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "filter": {
            "med_name": medName,
            "pvp_min": pvpMin,
            "pvp_max": pvpMax,
            "prescription_needed": prescriptionNeeded,
            "form": medForm,
            "type_of_administration": typeOfAdminst,
            "page": page,
            "meds_per_page": medsPerPage,
        }
    })
    
    const [sumbitAndFetch, response] = useSumbitAndFetchObject(
        stringRequest,
        props.apiEndpoint+"/api/list_available_medicines",
        (res) => console.log(res)
    )

    useEffect(() => {
        if(userTokenCookie != null)
            sumbitAndFetch();
    }, [page, stringRequest])

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
                            <FilterTable 
                                medName={medName}
                                pvpMin={pvpMin}
                                pvpMax={pvpMax}
                                prescriptionNeeded={prescriptionNeeded}
                                medForm={medForm}
                                typeOfAdminst={typeOfAdminst}

                                setMedName={setMedName}
                                setPvpMin={setPvpMin}
                                setPvpMax={setPvpMax}
                                setPrescriptionNeeded={setPrescriptionNeeded}
                                setMedForm={setMedForm}
                                setTypeOfAdminst={setTypeOfAdminst}
                            />
                        </div>
                        <div style={{ flex: 1, marginLeft: '5px' }}>
                            {/**Tablamakeorder recibe cuantas filas va a renderizar, los datos y el valor para filtrar en caso d eque haya */}                 
                            <Tabla medicineResponse={response} page={page} setPage={setPage}/>
                        </div>
                    </div>
                </Layout> 
            </main>
            </ShopContextProvider>
        </>
    );
}