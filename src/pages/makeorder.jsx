import Head from 'next/head'
import Layout from "../component/Layout"
import Tabla from "../component/makeOrder/TablaMakeorder"
import { useEffect, useState } from "react";
import FilterTable from "../component/makeOrder/FilterTable"
import { ShopContextProvider } from '../context/shopContext'
import useCookie from "../hooks/useCookie"
import useSumbitAndFetchObject from "../hooks/useSumbitAndFetchObject.js";
import commonGetServerSideProps from '../utils/gen_common_props';
import ShoppingCart from "../component/makeOrder/shoppingCart"
import usePrepareBodyRequest from '../hooks/usePrepareBodyRequest';

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}

export default function Home(props) {
    // Cookies
    const [userTokenCookie, ] = useCookie('user_token')

    // Search
    const [medNameSearch, setMedNameSearch] = useState({value:"",isCompleted:false});

    useEffect(() => {
        setMedName(medNameSearch.value)
    }, [medNameSearch])

    // Form values
    const [numPages, setNumPages] = useState(1) 
    const [medName, setMedName] = useState("");
    const [pvpMax, setPvpMax] = useState(50);
    const [medForm, setMedForm] = useState(["Tablets", "Capsules", "Liquid", "Powder", "Cream", "Gel"])
    const [typeOfAdminst, setTypeOfAdminst] = useState(["Oral","Topical","Inhalation","Ophthalmic"])
    const [page, setPage] = useState(1);
    const [medsPerPage, ] = useState(10);
    
    // Requests
    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "filter": {
            "med_name": medName,
            "pvp_max": pvpMax,
            "form": medForm,
            "type_of_administration": typeOfAdminst,
            "page": page,
            "meds_per_page": medsPerPage,
        }
    })
    
    const [sumbitListAvailable, response] = useSumbitAndFetchObject(
        stringRequest,
        props.apiEndpoint + "/api/list_available_medicines",
    )

    const [sumbitNumPages, ] = useSumbitAndFetchObject(
        stringRequest,
        props.apiEndpoint + "/api/list_available_medicines_num",
        (res) => {
            if (res && res.result == "ok") {
                setNumPages(res.num)
            }
        }
    )

    useEffect(() => {
        if(userTokenCookie != null) {
            sumbitListAvailable()
            sumbitNumPages()
        }
    }, [stringRequest])
    
    return (
        <>
            <ShopContextProvider>
            <Head>
                <title>TransMedWebPTIN</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
            <Layout navBarValue={setMedNameSearch} props={props}>
                <div className='flex space-between flex-start' style={{ backgroundColor: '#87CEFA' }}>
                    <div>
                        <FilterTable 
                            pvpMax={pvpMax}
                            medForm={medForm}
                            typeOfAdminst={typeOfAdminst}

                            setPvpMax={setPvpMax}
                            setMedForm={setMedForm}
                            setTypeOfAdminst={setTypeOfAdminst}
                        />
                    </div>
                    <div style={{ flex: 1, marginLeft: '5px' }}>              
                        <Tabla medicineResponse={response.medicines} page={page} setPage={setPage} numPages={numPages}/>
                    </div>
                </div>
            </Layout>
            </main>
            </ShopContextProvider>
        </>
    );
}

/* */