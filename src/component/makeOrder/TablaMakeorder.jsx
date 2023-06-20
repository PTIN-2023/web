import React, { useContext, useState, useEffect } from "react";
import TableFooter from "../TableFooter.jsx";
import { ShopContext } from "../../context/shopContext.jsx";
import { Product } from "../makeOrder/products.jsx"

const TablaMakeOrder = ( {medicineResponse, page, setPage} ) => {
    return (
        <div className="mx-auto flex flex-col justify-start">
            <div className="bg-white">
                <div className="mx-auto max-w-2x1 px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-blue-800 sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-xl font-serif">Medicamentos</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                        {console.log(medicineResponse)}
                        {medicineResponse && medicineResponse.map((medicine) => (
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
