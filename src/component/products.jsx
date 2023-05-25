import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import productsStyles from "../styles/product.module.css";

export const Product = (props) => {
    const { medicineIdentifier, medicineName, act_exc, pvp, images, description, stock, reviews } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);

    const cartItemAmount = cartItems[medicineIdentifier];
    return (
        <div className="bg-white overflow-hidden shadow-lg rounded-lg divide-y divide-gray-200 mb-4">
            <div className="px-4 py-5 sm:px-6">
                <div className="w-full h-48 overflow-hidden flex">
                    {images && images.length > 0 && images.map((image, index) => (
                        <img key={index} src={image} alt={`${medicineName} image`} className="w-1/2 object-cover" />
                    ))}
                </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">{medicineName}</h2>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
                <div className="my-2 text-sm text-gray-700">
                    <p><strong>Price:</strong> {pvp}€</p>
                    <p><strong>In stock:</strong> {stock}</p>
                </div>
                <div className="my-2 text-sm text-gray-700">
                    {reviews && <p><strong>Reviews:</strong> {reviews.average} stars ({reviews.count} reviews)</p>}
                </div>

            </div>
            <div className="px-4 py-4 sm:px-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => addToCart(medicineIdentifier)}>
                    Add to cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
                </button>
            </div>
        </div>
    );
};
