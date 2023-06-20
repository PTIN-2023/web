import React, {useContext} from 'react'
import { ShopContext } from '../../context/shopContext'
import cartStyle from '../../styles/cart.module.css'

export const CartItem = ({item}) => {
    const { cartItems, addToCart, removeFromCart, removeAll } = useContext(ShopContext);

    return (
        <div className={cartStyle.cartItems}>
            <div className="w-full h-full overflow-hidden flex justify-center p-5">
                <img src={item.medicine_image_url}/>
            </div>
            <div className={cartStyle.description}>
                <p>
                    <b>{item.medicine_name}</b>
                </p>
                <p>
                    Precio:
                    <b> {item.pvp}€</b>
                </p>
                <div className="flex border w-14 mb-2">
                    <button className='mr-1 ml-2' onClick={() => removeFromCart(item)}> - </button>
                    <input className='mr-2 w-2' value={cartItems[item.medicine_identifier].amount} onChange={() => {return}}/>
                    <button onClick={() => addToCart(item)}> + </button>
                    <button className='ml-5 text-red-600' onClick={() => removeAll(item)}> Eliminar </button>
                </div>
            </div>
        </div>
    )
}
