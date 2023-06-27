import React, { useState, useRef } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import { Table, Button, Modal, Dropdown } from 'flowbite-react'
import inventoryStyles from "../styles/Inventory.module.css"

const Tablainventarios = ({ data }) => {
  // State
  const [modalCancelarinventarioState, setModalCancelarinventarioState] = useState(false);
  //currentTarget es un hook useRef para que no se actualice en cada render y así aseguramos que los modals no se multipliquen
  const currentTarget = useRef("");

  //changeModalCancelarinventarioState y changeModalContactarState son funciones que cambian el useState ya que los setters no se pueden pasar bien hacia los componentes
  function changeModalCancelarinventarioState(e){
    setModalCancelarinventarioState(e);

  }

  //si la longitud del searchValue es > 0 y se hizo click en buscar, filtra el json de datos
  var { slice, range } = useTable(data, page, rowsPerPage);

  const getCellColor = (cantidad) => {
    if (cantidad < 5) {
      return "red";
    } 
    if (cantidad < 50000) {
      return "yellow";
    } 
    
    return "green";
    
  };
  
  return (
    <>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell> Image </Table.HeadCell>
            <Table.HeadCell> Name </Table.HeadCell>
            <Table.HeadCell> Excipient </Table.HeadCell>
            <Table.HeadCell> Form </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {slice.map((inventario) =>
            <>
                <Table.Row className={inventoryStyles.tableRow}>
                  <Table.Cell className={inventoryStyles.firstTableCell}> 
                    <Dropdown className={inventoryStyles.chevronDown} label="" inline={true}>
                        <ModalCancelarinventario currentTarget={currentTarget} currentItem={inventario.nombre} modalCancelarinventarioState={modalCancelarinventarioState} setModalCancelarinventarioState={changeModalCancelarinventarioState}/>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell className={inventoryStyles.tableCell}>
                    {inventario.nombre}
                  </Table.Cell>
                  <Table.Cell className={inventoryStyles.tableCell }>
                    {getCellColor(inventario.cantidad_almacen) == 'red' && 
                      <span className={inventoryStyles.cantidadSoldOut}>{inventario.cantidad_almacen}</span> }
                    {getCellColor(inventario.cantidad_almacen) == 'yellow' && 
                    <span className={inventoryStyles.cantidadWarning}>{inventario.cantidad_almacen}</span> }
                    {getCellColor(inventario.cantidad_almacen) == 'green' && 
                      <span className={inventoryStyles.cantidadAcceptable}>{inventario.cantidad_almacen}</span> }
                  </Table.Cell>
                  <Table.Cell>
                    {inventario.cantidad_vendida}                                                   
                  </Table.Cell>
                  <Table.Cell>
                    {inventario.ciudad} 
                  </Table.Cell>
                </Table.Row>
            </>
          )}

          </Table.Body>
        </Table> 

    </>
  );
};

export default Tablainventarios;