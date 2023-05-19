import React, {useContext} from 'react'
import { ShopContext } from '../context/shopContext'
import cartStyle from "../styles/cart.module.css"

export const CartItem = (props) => {
    const {id, name, act_exc, pvp} = props.data;
    const { cartItems, addToCart, removeFromCart, removeAll } = useContext(ShopContext);
  
    return (
    <div className={cartStyle.cartItems}>
        <img src="/media/Ibuprofeno.png"/>
        <div className={cartStyle.description}>
            <p>
                <b>{name}</b>
            </p>
            <p>
                <b>{pvp}€</b>
            </p>
            <div className={cartStyle.countHandler}>
                <button onClick={() => removeFromCart(id)}> - </button>
                <input value={cartItems[id]}/>
                <button onClick={() => addToCart(id)}> + </button>
                <button className={cartStyle.removeBtton} onClick={() => removeAll(id)}> remove all </button>
            </div>
        </div>
    </div>
  )
}
