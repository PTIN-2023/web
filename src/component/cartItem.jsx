import React, {useContext} from 'react'
import { ShopContext } from '../context/shopContext'
import cartStyle from "../styles/cart.module.css"

export const CartItem = ({item}) => {
    const { cartItems, addToCart, removeFromCart, removeAll } = useContext(ShopContext);

    return (
    <div className={cartStyle.cartItems}>
        <img src={item.medicine_image_url}/>
        <div className={cartStyle.description}>
            <p>
                <b>{item.medicine_name}</b>
            </p>
            <p>
                <b>{item.pvp}€</b>
            </p>
            <div className={cartStyle.countHandler}>
                <button onClick={() => removeFromCart(item)}> - </button>
                <input value={cartItems[item.medicine_identifier].amount} onChange={() => {return}}/>
                <button onClick={() => addToCart(item)}> + </button>
            </div>
            <div className={cartStyle.removeBtton}>
                <button onClick={() => removeAll(item)}> Eliminar </button>
            </div>
        </div>
    </div>
  )
}
