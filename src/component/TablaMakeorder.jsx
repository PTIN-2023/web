import React, { useContext, useState } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import { ShopContext } from "../context/shopContext.jsx"
import { Product } from "../component/products.jsx"


const TablaMakeOrder = ({ data, rowsPerPage, searchValue, setSearchValue }) => {
    //componente que renderiza la tabla con los pedidos
    //recibe data -> json de pedidos
    //rowsPerPage -> cuantas filas va a renderizar
    //searchValue -> el filtro en caso de que se active el componente MyOrdersSearch
    const [page, setPage] = useState(1);

    //si la longitud del searchValue es > 0 y se hizo click en buscar, filtra el json de datos
    if (searchValue.value.length > 0 && searchValue.isCompleted) {
        data = data.orders((med) => med.nombre.toLowerCase().includes(searchValue.value));
    } else data = data.orders;

    var { slice, range } = useTable(data, page, rowsPerPage);

    const { addToCart } = useContext(ShopContext);

    return (
        <div className="mx-auto flex flex-col justify-start">
            <div className="bg-white">
                <div className="mx-auto max-w-2x1 px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-blue-800 sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-xl font-serif">Medicamentos</h2>


                    <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                        {slice.map((med) => (
                            <Product data={med} />
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: 'auto', marginTop: '10px' }}>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
            </div>
        </div>

    );
}

export default TablaMakeOrder;