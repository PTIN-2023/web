import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import productsStyles from "../../styles/product.module.css"

export const Product = ({medicine}) => {
    const { cartItems, addToCart } = useContext(ShopContext);

    return (
        <div>
            <div className="bg-white overflow-hidden shadow-lg rounded-lg divide-y divide-gray-200 mb-4">
                <div className="px-4 py-5 sm:px-6">
                    <div className="w-full h-48 overflow-hidden flex">
                        <img src={medicine.medicine_image_url} alt={`${medicine.medicine_name} image`} className="object-cover" />
                    </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">{medicine.medicine_name}</h2>
                    {medicine.prescription_needed
                        ? <p className="mt-1 text-sm text-gray-500">Con receta</p> 
                        : <p className="mt-1 text-sm text-gray-500">Sin receta</p>
                    }
                    <div className="my-2 text-sm text-gray-700">
                        <p><strong>Cantidad:</strong> {medicine.contents}</p>
                        <p><strong>Precio:</strong> {medicine.pvp}€</p>
                        <p><strong>Forma:</strong> {medicine.form}</p>
                        <p><strong>Vía:</strong> {medicine.type_of_administration}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center px-4 py-4 sm:px-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => addToCart(medicine)}>
                        Añadir {cartItems[medicine.medicine_identifier] && cartItems[medicine.medicine_identifier].amount > 0 && <> ({cartItems[medicine.medicine_identifier].amount}) </>}
                    </button>
                </div>
            </div>
        </div>
    );
};
