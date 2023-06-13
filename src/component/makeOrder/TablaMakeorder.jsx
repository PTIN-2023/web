import React, { useContext, useState, useEffect } from "react";
import TableFooter from "../TableFooter.jsx";
import { ShopContext } from "../../context/shopContext.jsx";
import { Product } from "../products.jsx";
import * as env_config from "../../utils/env_config.js";
import useCookie from '../../hooks/useCookie.js';
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetchObject from "../../hooks/useSumbitAndFetchObject.js";

const TablaMakeOrder = ( {apiEndpoint, searchValue} ) => {
    // Cookies
    const [userTokenCookie, ] = useCookie('user_token')

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
        stringRequest,
        apiEndpoint+"/api/list_available_medicines"
    )

    useEffect(() => {
        if(userTokenCookie != null)
            sumbitAndFetch();
    }, [page, userTokenCookie])

    return (
        <div className="mx-auto flex flex-col justify-start">
            <div className="bg-white">
                <div className="mx-auto max-w-2x1 px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-blue-800 sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-xl font-serif">Medicamentos</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                        {response && response.result == 'ok' && response.medicines.map((medicine) => (
                            <Product key={medicine.medicine_identifier} medicine={medicine} />
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: 'auto', marginTop: '10px' }}>
                <TableFooter range={[1]} slice={0} setPage={setPage} page={page} />
            </div>
        </div>
    );
}

export default TablaMakeOrder;
