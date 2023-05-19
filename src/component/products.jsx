import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import productsStyles from "../styles/product.module.css";

export const Product = (props) => {
    const {id, name, act_exc, pvp} = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);

    const cartItemAmount = cartItems[id];
    return (
        <div className={productsStyles.product}>
            <img src="/media/Ibuprofeno.png"/>
            <div className={productsStyles.description}>
                <p> <b>{name}</b> </p>
                <p> <b>{pvp}€</b> </p>
            </div>
            <button className={productsStyles.addToCartBttn} onClick={() => addToCart(id)}>
                Add to cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
            </button>
        </div>
    );
};