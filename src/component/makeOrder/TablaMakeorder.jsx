import React from "react";
import { Product } from "../makeOrder/products.jsx"
import {Card} from "flowbite-react"
import CustomTableNavigation from "../common/CustomTableNavigation.jsx";

const TablaMakeOrder = ( {medicineResponse, page, setPage, numPages} ) => {
    return (
        <div className="mx-auto flex flex-col justify-start">
            <Card className="m-1">
                <div className="mx-auto max-w-2x1 px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <p class="text-4xl m-5 text-gray-500 font-semibold dark:text-white">Medicamentos</p>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                        {medicineResponse && medicineResponse.map((medicine) => (
                            <Product key={medicine.medicine_identifier} medicine={medicine} />
                        ))}
                    </div>
                </div>
            </Card>
            <CustomTableNavigation 
                numPages={numPages} 
                currentPage={page} 
                setPage={setPage} 
            />
        </div>
    );
}

export default TablaMakeOrder;
