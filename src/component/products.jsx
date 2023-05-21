import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import productsStyles from "../styles/product.module.css";

export const Product = (props) => {
    const {id, name, act_exc, pvp} = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);

    const cartItemAmount = cartItems[id];
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mb-4">
            <div className="px-4 py-5 sm:px-6">
                <img src="/media/Ibuprofeno.png" alt={name} className="w-full object-cover h-48"/>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">{name}</h2>
                <p className="mt-1 text-sm text-gray-500">{pvp}€</p>
            </div>
            <div className="px-4 py-4 sm:px-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => addToCart(id)}>
                    Add to cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
                </button>
            </div>
        </div>
    );
};
