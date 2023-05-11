import React, { useState } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import {Table, Checkbox, Button, Modal } from 'flowbite-react';
import style from "../styles/Makeorder.module.css";
import myOrders from "../pages/myorders.jsx";

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

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const [ triggerPopUp, setTriggerPopUp ] = useState(false);

    const handleClosePopUp = () => {
        setTriggerPopUp(false)
    }

    const [medicamentosSeleccionados, setMedicamentosSeleccionados] = useState({});
    const [carrito, setCarrito] = useState([]);
    const handleCheckboxChange = (med) => {
        if(medicamentosSeleccionados[med.id]) {
            // si el medicamento ya está seleccionado lo eliminamos del carrito
            setCarrito(carrito.filter((item) => item.id !== med.id));
        } else {
            // si el medicamento no está seleccionado lo agregamos al carrito
            setCarrito([...carrito, med]);
        }

        // Actualizamos el estado de medicamentos seleccionados
        setMedicamentosSeleccionados({
            ...medicamentosSeleccionados,
            [med.id]: !medicamentosSeleccionados[med.id],
        });

        // Generamos el archivo JSON actualizado
        generarJSON();
    };

    const generarJSON = () => {
        const medicamentosJSON = JSON.stringify(carrito);
        // Hacer algo con el archivo JSON generado, como enviarlo a otro componente o descargarlo
        console.log(medicamentosJSON); // En este ejemplo, imprimimos el JSON en la consola
        return medicamentosJSON;
    };


    return (
        <div className="mx-auto">
            <>
                <Table hoverable={true}>
                    {console.log(searchValue)}
                    <Table.Head>
                        <Table.HeadCell className="" column=""></Table.HeadCell>
                        <Table.HeadCell> Medicamento </Table.HeadCell>
                        <Table.HeadCell> Activo/Excipiente </Table.HeadCell>
                        <Table.HeadCell> PVP </Table.HeadCell>
                        <Table.HeadCell> Dosis </Table.HeadCell>
                        <Table.HeadCell> Detalles </Table.HeadCell>
                        <Table.HeadCell><span className="sr-only"> Pedir </span></Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    {slice.map((med) =>
                        <Table.Row className={style.tableRow} >
                            <Table.Cell className="!p-4">
                                <input type="checkbox" checked={medicamentosSeleccionados[med.id] || false} 
                                onChange={() => handleCheckboxChange(med)} />
                            </Table.Cell>
                            <Table.Cell className={style.tableCell} key="{med}">{med.name}</Table.Cell>
                            <Table.Cell className={style.tableCell}>{med.act_exc}</Table.Cell>
                            <Table.Cell className={style.tableCell}>{med.pvp}</Table.Cell>
                            <Table.Cell className={style.tableCell}>{med.dosis}</Table.Cell>
                            <Table.Cell className={style.tableCell}>{med.detalles}</Table.Cell>
                            <Table.Cell>
                                <>
                                    <Button onClick={handleOpenModal}>
                                        Añadir al Carrito
                                    </Button>
                                    <Modal show={showModal} size="md" popup={true} onClose={handleCloseModal}>
                                        <Modal.Header />
                                        <Modal.Body>
                                            <div className="text-center">
                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                    Seguro que quieres comprar este medicamento ?
                                                </h3>
                                                <div className="flex justify-center gap-4">
                                                    <Button color="green" onClick={() => { setTriggerPopUp(true); setShowModal(false); }}>
                                                        Si, estoy segur@
                                                    </Button>
                                                    <Button color="failure" onClick={handleCloseModal}>
                                                        No, cancelar
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </>                         
                            </Table.Cell>
                        </Table.Row>
                    )}
                    </Table.Body>
                </Table>
                <br></br>
            </>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
            { triggerPopUp && 
                <Modal show={triggerPopUp} size="md" popup={true} onClose={handleClosePopUp} >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <h3 className="mb-5 text-lg font-normal text-blue-500">
                                Enhorabuena, tu pedido se ha realizado con éxito. Quieres ver su estado ?
                            </h3>
                            <div className="flex justify-center gap-4"> 
                                <Button color="gray" href="./myorders" >
                                    Ver Pedido
                                </Button>
                                <Button color="gray" onClick={handleClosePopUp} >
                                    No, gracias.
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal> }
        </div>
    );
}

export default TablaMakeOrder;