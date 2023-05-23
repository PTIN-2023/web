import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import productsStyles from "../styles/product.module.css";
import Product from '../component/product';  // Asegúrate de que estás importando el componente 'Product' de la ubicación correcta

const products = [
    {
        id: '1',
        name: 'Ibuprofeno',
        act_exc: 'Act_exc 1',
        pvp: '10.99',
        images: ['/media/Medicamentos/Ibuprofeno.png'], // Corrigiendo la ruta
        description: 'Descripción del producto',
        stock: 10,
        reviews: { average: 4.5, count: 10 }
    },
    {
        id: '2',
        name: 'Paracetamol',
        act_exc: 'Act_exc 2',
        pvp: '8.99',
        images: ['/media/Medicamentos/Ibuprofeno.png'], // Corrigiendo la ruta
        description: 'Descripción del producto',
        stock: 20,
        reviews: { average: 4.2, count: 15 }
    },
    // más productos...
];

export const Products = () => {
    return (
        <div>
            {products.map(product => <Product key={product.id} data={product} />)}
        </div>
    )
}
