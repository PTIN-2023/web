import React, { useContext, useState, useEffect } from "react";
import TableFooter from "./TableFooter.jsx";
import { ShopContext } from "../context/shopContext.jsx";
import { Product } from "../component/products.jsx";
import useCookie from '../hooks/useCookie';
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";


const calculateRange = (meds, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(meds.length / rowsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
};

const TablaMakeOrder = ({ apiEndpoint, searchValue }) => {
    const [userTokenCookie, ] = useCookie('user_token')
    const [medName, setMedName] = useState();
    const [price, setPrice] = useState();
    const [ordersPerPage, setOrdersPerPage] = useState('10');
    const [page, setPage] = useState('1');  

    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "medicine_identifier": '0',
        "medicine_image_url": 'https://picsum.photos/200',
        "medicine_name": medName,
        "excipient": 'Sorbitol (E-420)',
        "pvp": price,
        "contents": '30 comprimidos',
        "prescription_needed": false,
        "form": 'pill',
        "type_of_adminstration": 'oral',
        "orders_per_page" : ordersPerPage,
        "page" : page
    })

    const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
        stringRequest,
        apiEndpoint+"/api/list_available_medicines"
    )

    useEffect(() => {
        if(stringResponse != 'none') {
          console.log("response not none")
        }
    }, [stringResponse])
    
    sumbitAndFetch();

    const meds = stringResponse.orders ? stringResponse.orders.map(med => {
        const { medicine_identifier, medicine_image_url, medicine_name, pvp } = med;
        return {
          medicineIdentifier: medicine_identifier,
          medicineImageUrl: medicine_image_url,
          medicineName: medicine_name,
          price: pvp,
          ordersPerPage : ordersPerPage,
          page : page,
          excipient: 'Sorbitol (E-420)',
          contents: '30 comprimidos',
          prescriptionNeeded: false,
          form: 'pill',
          typeOfAdminstration: 'oral'
        };
    }) : [];

    const range = calculateRange(meds, ordersPerPage);

    console.log(meds.medicine)

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