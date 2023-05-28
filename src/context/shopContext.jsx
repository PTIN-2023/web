import React, { createContext, useState } from 'react'

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (med) => {
      const updatedEntry = {}
      updatedEntry[med.medicine_identifier] = {
        medicine : med,
        amount : (cartItems[med.medicine_identifier] == undefined ? 1 : cartItems[med.medicine_identifier].amount + 1)
      }

      setCartItems((current_cart) => ({
          ...current_cart,
          ...updatedEntry
      }));

      console.log(cartItems)
    };
    
    const removeFromCart = (med) => {
      const updatedEntry = {}
      updatedEntry[med.medicine_identifier] = {
        medicine : med,
        amount : (cartItems[med.medicine_identifier].amount == 1 ? 0 : cartItems[med.medicine_identifier].amount - 1)
      }

      setCartItems((current_cart) => ({
          ...current_cart,
          ...updatedEntry
      }));
    };

    const removeAll = (med) => {
      const updatedEntry = {}
      updatedEntry[med.medicine_identifier] = {
        medicine : med,
        amount : 0
      }

      setCartItems((current_cart) => ({
          ...current_cart,
          ...updatedEntry
      }));
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        removeAll
    };

    return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
};

