import React, { useState, useRef } from "react";
import useTable from "../src/hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import {Table, Checkbox, Button, Modal, Tooltip, Dropdown} from 'flowbite-react'
import myordersStyles from "../styles/Myorders.module.css"
import {HiOutlineArrowRight, HiTrash, HiOutlineExclamationCircle} from "react-icons/hi"

//TODO: modular estas funciones de modal
function ModalContactar({currentTarget, currentItem, modalContactarState, setModalContactarState}){
//recibe: 
//currentTarget: identifica la fila a la que hicimos click dentro de la tabla
//currentItem: identifica la fila en cuestión para que no se ejecuten todos los modals a la vez (TODO: intentar optimizar)
//modalContactarState y setModalContactarState: muestran o esconden el modal
    const onCloseContactarHandler = () =>{
        setModalContactarState(false);
    }
    const onClickContactarHandler = () => {
        //asignamos el currentItem al Target
        //NOTA: si no estuviese esto se renderizaria un modal por cada fila
        currentTarget.current = currentItem;
        setModalContactarState(true);
    }

    return(
    <>    
      <Button onClick={onClickContactarHandler}>
        Contactar
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Modal
        /**si el currentTarget corresponde a la currentItem seleccionada y se hizo click en mostrar, mostrar modal */
        show={(currentTarget.current == currentItem && modalContactarState) ? true : false}
      >
        <Modal.Header>
         Contactar
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Su inventario ha sido cancelado.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Esto se puede deber principalmente a falta de stock o por decisión profesional de su medico.
            Puede ponerse en contacto con el/ella a través del correo o número de télefono.
            </p>
            <p className="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
            {/*TODO: en el proximo sprint, relacionar paciente con sus datos de doctor!*/}
            +34 123456789 <br />
            medico.superbueno@hospital.com
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCloseContactarHandler}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

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
        <Dropdown.Item onClick={onClickCancelarinventarioHandler} className={myordersStyles.cancelarinventarioDropdown} icon={HiTrash}>Cancelar inventario</Dropdown.Item>      
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


const Tablainventarios = ({ data, rowsPerPage, searchValue, setSearchValue }) => {
  //componente que renderiza la tabla con los inventarios
  //recibe data -> json de inventarios
  //rowsPerPage -> cuantas filas va a renderizar
  //searchValue -> el filtro en caso de que se active el componente MyOrdersSearch
  const [page, setPage] = useState(1);
  //estos dos hooks de abajo sirven para mostrar o bien ocultar los modals
  const [modalContactarState, setModalContactarState] = useState(false);
  const [modalCancelarinventarioState, setModalCancelarinventarioState] = useState(false);
  //currentTarget es un hook useRef para que no se actualice en cada render y así aseguramos que los modals no se multipliquen
  const currentTarget = useRef("");

  //changeModalCancelarinventarioState y changeModalContactarState son funciones que cambian el useState ya que los setters no se pueden pasar bien hacia los componentes
  function changeModalCancelarinventarioState(e){
    setModalCancelarinventarioState(e);

  }

  function changeModalContactarState(e){
    setModalContactarState(e);

  }

  //si la longitud del searchValue es > 0 y se hizo click en buscar, filtra el json de datos
  if(searchValue.value.length > 0 && searchValue.isCompleted){
    data = data.filter((inventario) => inventario.nombre.toLowerCase().includes(searchValue.value));  
  }  
  var { slice, range } = useTable(data, page, rowsPerPage);
  
  return (
    <>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        <Table hoverable={true}>
          {console.log(searchValue)}
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
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.firstTableCell}> 
                    <Dropdown className={myordersStyles.chevronDown} label="" inline={true}>
                        <ModalCancelarinventario currentTarget={currentTarget} currentItem={inventario.nombre} modalCancelarinventarioState={modalCancelarinventarioState} setModalCancelarinventarioState={changeModalCancelarinventarioState}/>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                    {inventario.nombre}
                  </Table.Cell>
                  <Table.Cell> {/*TODO: Implementar colores a cantidad almacén para que se vea con color cuando haya pocas unidades + Boton pedir cuando no haya unidades*/ }
                    {inventario.cantidad_almacen}
                  </Table.Cell>
                  <Table.Cell>
                    {inventario.cantidad_vendida}                                                   
                  </Table.Cell>
                  <Table.Cell> {/*TODO: Implementar la ciudad desde el json*/}
                    A 
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