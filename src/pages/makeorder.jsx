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
    const [medsPerPage, setMedsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [medId, setMedId] = useState()
    const [medImgURL, setMedImgURL] = useState()
    const [medName, setMedName] = useState();
    const [pvpMin, setPvpMin] = useState();
    const [pvpMax, setPvpMax] = useState();
    const [content, setContent] = useState()
    const [excipient, setExcipient] = useState()
    const [prescriptionNeeded, setPrescriptionNeeded] = useState()
    const [medForm, setMedForm] = useState(["pill","cream","powder","liquid"])
    const [typeOfAdminst, setTypeOfAdminst] = useState(["oral","topical","inhalation","ophthalmic"])

    // Request
    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "filter": {
            "medicine_identifier": medId,
            "medicine_image_url": medImgURL,
            "meds_per_page": medsPerPage,
            "page": page,
            "med_name": medName,
            "excipient": excipient,
            "pvp": pvpMax,
            //"pvp_min": pvpMin,
            //"pvp_max": pvpMax,
            "contents": content,
            "prescription_needed": prescriptionNeeded, // es un bool, no lista
            "form": medForm,
            "type_of_administration": typeOfAdminst
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
                            <FilterTable />
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