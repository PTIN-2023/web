import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import productsStyles from "../styles/product.module.css";

export const Product = ({medicine}) => {
    const { cartItems, addToCart } = useContext(ShopContext);
    
    return (
        <div className="bg-white overflow-hidden shadow-lg rounded-lg divide-y divide-gray-200 mb-4">
            <div className="px-4 py-5 sm:px-6">
                <div className="w-full h-48 overflow-hidden flex">
                    <img src={medicine.medicine_image_url} alt={`${medicine.medicineName} image`} className="object-cover" />
                </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">{medicine.medicineName}</h2>
                <p className="mt-1 text-sm text-gray-500">{medicine.description}</p>
                <div className="my-2 text-sm text-gray-700">
                    <p><strong>Price:</strong> {medicine.pvp}€</p>
                </div>
            </div>
            <div className="px-4 py-4 sm:px-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => addToCart(medicine)}>
                    Add to cart {cartItems[medicine.medicine_identifier] && cartItems[medicine.medicine_identifier].amount > 0 && <> ({cartItems[medicine.medicine_identifier].amount}) </>}
                </button>
            </div>
        </div>
    );
};
