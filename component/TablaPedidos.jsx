import React, { useState, useRef } from "react";
import useTable from "../src/hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import {Table, Checkbox, Button, Modal, Tooltip, Dropdown} from 'flowbite-react'
import myordersStyles from "../styles/Myorders.module.css"
import {HiOutlineArrowRight, HiTrash, HiOutlineExclamationCircle} from "react-icons/hi"

function ModalContactar({currentTarget, currentItem, modalContactarState, setModalContactarState}){

    const onCloseContactarHandler = () =>{
        setModalContactarState(false);
    }
    const onClickContactarHandler = () => {
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
        show={(currentTarget.current == currentItem && modalContactarState) ? true : false}
      >
        <Modal.Header>
         Contactar
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Su pedido ha sido cancelado.
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

function ModalCancelarPedido({currentTarget, currentItem, modalCancelarPedidoState, setModalCancelarPedidoState}){
    console.log(currentTarget.current);
    const onCloseCancelarPedidoHandler = () =>{
        setModalCancelarPedidoState(false);
    }
    const onClickCancelarPedidoHandler = () => {
        
        currentTarget.current = currentItem;
        setModalCancelarPedidoState(true);  

    }
    const onClickCancelarPedidoHandler_CANCELAR = () => {
        setModalCancelarPedidoState(true);
    }


    return(
    <>    
        <Dropdown.Item onClick={onClickCancelarPedidoHandler} className={myordersStyles.cancelarPedidoDropdown} icon={HiTrash}>Cancelar pedido</Dropdown.Item>      
        <Modal
            show={(currentTarget.current == currentItem && modalCancelarPedidoState) ? true : false}
            size="md"
            popup={true}
            onClose={onCloseCancelarPedidoHandler}
        >
            <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Segur@ que quieres cancelar el pedido <span className="font-bold leading-relaxed text-gray-500 dark:text-gray-400">{currentItem}</span>?
                </h3>
                <div className="flex justify-center gap-4">
                <Button
                    color="failure"
                    onClick={onClickCancelarPedidoHandler_CANCELAR}
                >
                    Si, cancelar
                </Button>
                <Button
                    color="gray"
                    onClick={onCloseCancelarPedidoHandler}
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


const TablaPedidos = ({ data, rowsPerPage, searchValue, setSearchValue }) => {
  const [page, setPage] = useState(1);
  const [modalContactarState, setModalContactarState] = useState(false);
  const [modalCancelarPedidoState, setModalCancelarPedidoState] = useState(false);
  const currentTarget = useRef("");

  function changeModalCancelarPedidoState(e){
    setModalCancelarPedidoState(e);

  }

  function changeModalContactarState(e){
    setModalContactarState(e);

  }


  if(searchValue.value.length > 0 && searchValue.isCompleted){
    data = data.filter((pedido) => pedido.nombre.toLowerCase().includes(searchValue.value));  
  }  
  var { slice, range } = useTable(data, page, rowsPerPage);
  
  return (
    <>
        <Table hoverable={true}>
          {console.log(searchValue)}
          <Table.Head>
            <Table.HeadCell className="!p-4">
            </Table.HeadCell>
            <Table.HeadCell>
              Medicamento
            </Table.HeadCell>
            <Table.HeadCell>
              Fecha de compra
            </Table.HeadCell>
            <Table.HeadCell>
              Estado
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {slice.map((pedido) =>
            <>
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.firstTableCell}> 
                    <Dropdown className={myordersStyles.chevronDown} label="" inline={true}>
                        <ModalCancelarPedido currentTarget={currentTarget} currentItem={pedido.nombre} modalCancelarPedidoState={modalCancelarPedidoState} setModalCancelarPedidoState={changeModalCancelarPedidoState}/>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                    {pedido.nombre}
                  </Table.Cell>
                  <Table.Cell>
                    {pedido.estado != "Cancelado" ? pedido.fecha_compra : <ModalContactar currentTarget={currentTarget} currentItem={pedido.nombre} modalContactarState={modalContactarState} setModalContactarState={changeModalContactarState}/>}
                  </Table.Cell>
                  <Table.Cell>
                  {pedido.estado == "Entregado" &&
                    <span className={myordersStyles.deliveryStateEntregado}>{pedido.estado}</span>
                  }
                  {pedido.estado == "Enviado" &&
                    <span className={myordersStyles.deliveryStateEnviado}>{pedido.estado}</span>
                  }
                  {pedido.estado == "Esperando confirmación" &&
                    <span className={myordersStyles.deliveryStateEspConfirm}>{pedido.estado}</span>
                  }
                  {pedido.estado == "Cancelado" &&
                    <span className={myordersStyles.deliveryStateCancelado}>{pedido.estado}</span>
                  }                                                      
                  </Table.Cell>
                </Table.Row>
            </>
          )}

          </Table.Body>
        </Table> 

        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default TablaPedidos;