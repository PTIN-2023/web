import React, { useContext, useState, useEffect } from "react";
import TableFooter from "../TableFooter.jsx";
import { ShopContext } from "../../context/shopContext.jsx";
import { Product } from "../makeOrder/products.jsx"
import ShoppingCart from "../../component/makeOrder/shoppingCart"
import myordersStyles from "../styles/Myorders.module.css"
import CustomTableNavigation from '../component/common/CustomTableNavigation';

const TablaMakeOrder = ( {medicineResponse, page, setPage, numPages} ) => {
    return (
        <div className="mx-auto flex flex-col justify-start">
            <div className="bg-white">
                <div className="mx-auto max-w-2x1 px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-blue-800 sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-xl font-serif">Medicamentos</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                        {medicineResponse && medicineResponse.map((medicine) => (
                            <Product key={medicine.medicine_identifier} medicine={medicine} />
                        ))}
                    </div>
                </div>
            </div>
            <CustomTableNavigation 
                numPages={numPages} 
                currentPage={page} 
                setPage={setPage} 
            />
        </div>
    );
}

export default TablaMakeOrder;
