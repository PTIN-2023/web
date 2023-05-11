import React, { useState } from 'react'
import shoppingCartSlider from './shopCartSlide';

const shoppingCartButton = () => {

    const [open, setOpen] = useState(false)
    
    const manageOnClick = () => {
        setOpen(!open);
        shoppingCartSlider(open, setOpen);
    }

    return(
        <button type="button" onClick={manageOnClick}>
            Abrir/Cerrar Carrito
        </button>
    )
}

export default shoppingCartButton;