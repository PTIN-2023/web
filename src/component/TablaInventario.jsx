import React, { useState, useRef } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import { Table, Button, Modal, Dropdown } from 'flowbite-react'
import inventoryStyles from "../styles/Inventory.module.css"
import { HiTrash, HiOutlineExclamationCircle } from "react-icons/hi"


function ModalCancelarinventario({currentTarget, currentItem, modalCancelarinventarioState, setModalCancelarinventarioState}){
    //funciona igual que el modal anterior pero con el botón de cancelar inventario
    //TODO: hacer que borre el inventario
    console.log(currentTarget.current);
    const onCloseCancelarinventarioHandler = () =>{
        setModalCancelarinventarioState(false);
    }
    const onClickCancelarinventarioHandler = () => {
        
        currentTarget.current = currentItem;
        setModalCancelarinventarioState(true);  

    }
    const onClickCancelarinventarioHandler_CANCELAR = () => {
        setModalCancelarinventarioState(true);
    }


    return(
    <>    
        <Dropdown.Item onClick={onClickCancelarinventarioHandler} className={inventoryStyles.cancelarinventarioDropdown} icon={HiTrash}>Cancelar inventario</Dropdown.Item>      
        <Modal
            show={(currentTarget.current == currentItem && modalCancelarinventarioState) ? true : false}
            size="md"
            popup={true}
            onClose={onCloseCancelarinventarioHandler}
        >
            <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Segur@ que quieres cancelar el inventario <span className="font-bold leading-relaxed text-gray-500 dark:text-gray-400">{currentItem}</span>?
                </h3>
                <div className="flex justify-center gap-4">
                <Button
                    color="failure"
                    onClick={onClickCancelarinventarioHandler_CANCELAR}
                >
                    Si, cancelar
                </Button>
                <Button
                    color="gray"
                    onClick={onCloseCancelarinventarioHandler}
                >
                    No, cerrar
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    </>
    )
}


const Tablainventarios = ({ data, rowsPerPage }) => {
  //recibe data -> json de inventarios
  //rowsPerPage -> cuantas filas va a renderizar
  const [page, setPage] = useState(1);

  //useStates para los modales
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
            <Table.HeadCell className="!p-4">
            </Table.HeadCell>
            <Table.HeadCell>
              Medicamento
            </Table.HeadCell>
            <Table.HeadCell>
              Cantidad Almacén
            </Table.HeadCell>
            <Table.HeadCell>
              Cantidad Vendida
            </Table.HeadCell>
            <Table.HeadCell>
              Ciudad más Compradora
            </Table.HeadCell>
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