import React, { useState, useRef } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import {Table, Checkbox, Button, Modal, Tooltip, Dropdown} from 'flowbite-react'
import style from "../styles/Makeorder.module.css"

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

    return (
        <>
            <Table hoverable={true}>
                {console.log(searchValue)}
                <Table.Head>
                    <Table.HeadCell className=""></Table.HeadCell>
                    <Table.HeadCell> Medicamento </Table.HeadCell>
                    <Table.HeadCell> Activo/Excipiente </Table.HeadCell>
                    <Table.HeadCell> PVP </Table.HeadCell>
                    <Table.HeadCell> Dosis </Table.HeadCell>
                    <Table.HeadCell> Detalles </Table.HeadCell>
                    <Table.HeadCell><span className="sr-only"> Pedir </span></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                {slice.map((med) =>
                    <>
                        <Table.Row className={style.tableRow}>
                            <Table.Cell className="!p-4"><Checkbox /></Table.Cell>
                            <Table.Cell className={style.tableCell}>{med.medName}</Table.Cell>
                            <Table.Cell className={style.tableCell}>{med.act_exc}</Table.Cell>
                            <Table.Cell className={style.tableCell}>{med.pvp}</Table.Cell>
                            <Table.Cell className={style.tableCell}>{med.dosis}</Table.Cell>
                            <Table.Cell className={style.tableCell}>{med.detalles}</Table.Cell>
                            <Table.Cell>
                                <a href="/tables" 
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500" >
                                    Pedir 
                                </a>
                            </Table.Cell>
                        </Table.Row>
                    </>
                )}
                </Table.Body>
            </Table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
}

export default TablaMakeOrder;