import React, { useContext, useState } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import { ShopContext } from "../context/shopContext.jsx"


const TablaMakeOrder = ({ data, rowsPerPage, searchValue, setSearchValue }) => {
    //componente que renderiza la tabla con los pedidos
    //recibe data -> json de pedidos
    //rowsPerPage -> cuantas filas va a renderizar
    //searchValue -> el filtro en caso de que se active el componente MyOrdersSearch
    const [page, setPage] = useState(1);

    //si la longitud del searchValue es > 0 y se hizo click en buscar, filtra el json de datos
    if(searchValue.value.length > 0 && searchValue.isCompleted){
        data = data.filter((med) => med.nombre.toLowerCase().includes(searchValue.value));  
    }  
    var { slice, range } = useTable(data, page, rowsPerPage);

    const {addToCart} = useContext(ShopContext);

    return (
        <div className="mx-auto flex flex-col justify-start">
            <div className="bg-white">
                <div className="mx-auto max-w-2x1 px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Medicamentos</h2>
                    
                    <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                    {slice.map((med) => (
                            <div key={med.id} className="group relative">
                                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img src="/media/default.png" alt="Foto caja Ibuprofeno" className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <button onClick={() => addToCart(med.id)}>
                                                <span aria-hidden="true" className="absolute inset-0"></span>
                                                {med.act_exc}
                                            </button>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{med.detalles}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{med.pvp}</p>
                                </div>
                            </div>
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