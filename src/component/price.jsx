import React from "react";
import rangePriceStyles from "../styles/price.module.css"

const filterPrice = () => {
    <input type="range" className={rangePriceStyles.rangePrice} >
        Precio
    </input>
}

export default filterPrice;