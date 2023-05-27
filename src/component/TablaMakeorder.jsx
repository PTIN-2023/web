import React, { useContext, useState, useEffect } from "react";
import TableFooter from "./TableFooter.jsx";
import { ShopContext } from "../context/shopContext.jsx";
import { Product } from "../component/products.jsx";
import * as env_config from "../utils/env_config.js";
import useCookie from '../hooks/useCookie';
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";

export async function getServerSideProps() {
    const apiEndpoint = String(env_config.getApiEndpoint());

    return {
        props: {
            apiEndpoint,
        }
    }
}

const calculateRange = (meds, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(meds.length / rowsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
};

const TablaMakeOrder = ( props, searchValue ) => {
    // Cookies
    const [userTokenCookie, ] = useCookie('user_token')    

    // Form values
    const [ordersPerPage, setOrdersPerPage] = useState(10);
    const [medsPerPage, setMedsPerPage] = useState('');
    const [page, setPage] = useState('');
    const [medName, setMedName] = useState('');
    const [pvpMin, setPvpMin] = useState('');
    const [pvpMax, setPvpMax] = useState('');
    const [prescriptionNeeded, setPrescriptionNeeded] = useState([true, false]);
    const [medForm, setMedForm] = useState(['pill', 'cream', 'powder', 'liquid']);
    const [typeOfAdminst, setTypeOfAdminst] = useState(['oral', 'topical', 'inhalation', 'ophthalmic']);

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
    console.log(stringRequest);
    const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
        stringRequest,
        "http://localhost:3000/api/list_available_medicines"
        //props.apiEndpoint+"/api/list_patient_orders
    )

    useEffect(() => {
        sumbitAndFetch();
    }, [page])

    const meds = stringResponse.meds ? stringResponse.meds.map(med => {
        const { medsPerPage, page, medName, pvpMin, pvpMax, prescriptionNeeded, medForm, typeOfAdminst } = med;
        return {
            meds_per_page : medsPerPage,
            page : page,
            med_name : medName,
            pvp_min : pvpMin,
            pvp_max : pvpMax,
            prescription_needed : prescriptionNeeded,
            form : medForm,
            type_of_administration : typeOfAdminst
        };
    }) : [];

    const range = calculateRange(meds, ordersPerPage);

    console.log(meds)

    //si la longitud del searchValue es > 0 y se hizo click en buscar, filtra el json de datos
    //if (searchValue.value.length > 0 && searchValue.isCompleted) {
        //meds = meds.medicine.filter((med) => med.id.toLowerCase().includes(searchValue.value));
    //} else meds = meds.medicine;

    const { addToCart } = useContext(ShopContext);

    return (
        <div className="mx-auto flex flex-col justify-start">
            <div className="bg-white">
                <div className="mx-auto max-w-2x1 px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-blue-800 sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-xl font-serif">Medicamentos</h2>


                    <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                        {meds.map((medicine) => (
                            <Product data={medicine} />
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: 'auto', marginTop: '10px' }}>
                <TableFooter range={range} slice={meds} setPage={setPage} page={page} />
            </div>
        </div>

    );
}

export default TablaMakeOrder;
