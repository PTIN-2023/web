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
import commonGetServerSideProps from '../utils/gen_common_props';
import ShoppingCart from "../component/makeOrder/shoppingCart"

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}


// esta funcion filtra los medicamentos que no tienen prescripción
function deletePrescription (meds) {
    const arrayMeds = []
    for (let i in meds) {
        if(meds[i].prescription_needed === false) {
            arrayMeds.push(meds[i])
        }
    }
    return arrayMeds
}



// esta función filtra los medicamentos que són pill/cream
function formFilter (meds, medsForms) {
    // medForm és un array que contiene la forma de los medicamentos que queremos que aparezcan
    // esta función revisa este array con los medicamentos que nos llegan i los filtra
    let auxArray = []
    for (let i in meds) {
        let med = meds[i] //single med
        console.log("type_admin", med.type_of_administration)
        for (let y in medsForms) {
            if (med.form === medsForms[y]) auxArray.push(med) // si la forma és la correcta afegim el medicament al array
        }
    }
    meds = auxArray
    return meds
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
    const [medForm, setMedForm] = useState(["pill", "cream", "powder", "liquid"])
    const [typeOfAdminst, setTypeOfAdminst] = useState(["oral","topical","inhalation","ophthalmic"])
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
    )

    useEffect(() => {
        if(userTokenCookie != null)
            sumbitAndFetch();
    }, [page, stringRequest])

    let medsArray = response.medicines
    // filtro con/sin receta
    if (prescriptionNeeded === false) medsArray = deletePrescription(response.medicines)
    // filtro form
    //medsArray = formFilter(medsArray, medForm)
    
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
                <Layout navBarValue={setSearchValue} props={props}>
                    <div className='flex space-between flex-start' style={{ backgroundColor: '#87CEFA' }}>
                        <div>
                        <ShoppingCart />
                        {/*console.log(medForm)*/}
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
                            <Tabla medicineResponse={medsArray} page={page} setPage={setPage} />
                        </div>
                    </div>
                </Layout> 
            </main>
            </ShopContextProvider>
        </>
    );
}