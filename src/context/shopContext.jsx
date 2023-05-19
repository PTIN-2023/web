import React, { createContext, useState } from 'react'

export const ShopContext = createContext(null);

/*
const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTOS.length; i++) {
    cart[i] = 0;
  }
  return cart;
}
*/
const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < 10; i++) {
    cart[i] = 0;
  }
  return cart;
}

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };
    
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const removeAll = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] = 0 }));
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        removeAll
    };

    console.log(cartItems);
    return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
};

