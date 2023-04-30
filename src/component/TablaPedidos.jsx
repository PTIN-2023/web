import React, { useState, useRef } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import {Table, Button, Modal, Dropdown} from 'flowbite-react'
import myordersStyles from "../styles/Myorders.module.css"
import {HiOutlineArrowRight, HiTrash, HiOutlineExclamationCircle} from "react-icons/hi"
import useCookie from "../hooks/useCookie.js";
import { getText } from "../utils/getTextCurrentLocale.js";

//TODO: modular estas funciones de modal
function ModalContactar({currentTarget, currentItem, modalContactarState, setModalContactarState}){
//recibe: 
//currentTarget: identifica la fila a la que hicimos click dentro de la tabla
//currentItem: identifica la fila en cuestión para que no se ejecuten todos los modals a la vez (TODO: intentar optimizar)
//modalContactarState y setModalContactarState: muestran o esconden el modal
    const [localeCookie, ] = useCookie('locale')

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
        {getText('contact', localeCookie)}
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Modal
        /**si el currentTarget corresponde a la currentItem seleccionada y se hizo click en mostrar, mostrar modal */
        show={(currentTarget.current == currentItem && modalContactarState) ? true : false}
      >
        <Modal.Header>
          {getText('contact', localeCookie)}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {getText('cancelled_notice', localeCookie)}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {getText('cancelled_cause', localeCookie)}
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
          {getText('close', localeCookie)}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

function ModalCancelarPedido({currentTarget, currentItem, modalCancelarPedidoState, setModalCancelarPedidoState}){
    //funciona igual que el modal anterior pero con el botón de cancelar pedido
    //TODO: hacer que borre el pedido
    console.log(currentTarget.current);
    const [localeCookie, ] = useCookie('locale')
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
        <Dropdown.Item onClick={onClickCancelarPedidoHandler} className={myordersStyles.cancelarPedidoDropdown} icon={HiTrash}>{getText('cancel_order', localeCookie)}</Dropdown.Item>      
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
                {getText('cancelation_confirmation', localeCookie)} <span className="font-bold leading-relaxed text-gray-500 dark:text-gray-400">{currentItem}</span>?
                </h3>
                <div className="flex justify-center gap-4">
                <Button
                    color="failure"
                    onClick={onClickCancelarPedidoHandler_CANCELAR}
                >
                  {getText('cancelation_confirmation_yes', localeCookie)}
                </Button>
                <Button
                    color="gray"
                    onClick={onCloseCancelarPedidoHandler}
                >
                  {getText('cancelation_confirmation_no', localeCookie)}
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    </>
    )
}


const TablaPedidos = ({ data, rowsPerPage, searchValue, setSearchValue }) => {
  //componente que renderiza la tabla con los pedidos
  //recibe data -> json de pedidos
  //rowsPerPage -> cuantas filas va a renderizar
  //searchValue -> el filtro en caso de que se active el componente MyOrdersSearch

  const [localeCookie, ] = useCookie('locale')

  const [page, setPage] = useState(1);
  //estos dos hooks de abajo sirven para mostrar o bien ocultar los modals
  const [modalContactarState, setModalContactarState] = useState(false);
  const [modalCancelarPedidoState, setModalCancelarPedidoState] = useState(false);
  //currentTarget es un hook useRef para que no se actualice en cada render y así aseguramos que los modals no se multipliquen
  const currentTarget = useRef("");

  //changeModalCancelarPedidoState y changeModalContactarState son funciones que cambian el useState ya que los setters no se pueden pasar bien hacia los componentes
  function changeModalCancelarPedidoState(e){
    setModalCancelarPedidoState(e);

  }

  function changeModalContactarState(e){
    setModalContactarState(e);

  }

  //si la longitud del searchValue es > 0 y se hizo click en buscar, filtra el json de datos
  if(searchValue.value.length > 0 && searchValue.isCompleted){
    data = data.filter((pedido) => pedido.nombre.toLowerCase().includes(searchValue.value));  
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
              {getText('name', localeCookie)}
            </Table.HeadCell>
            <Table.HeadCell>
              {getText('purchased_date', localeCookie)}
            </Table.HeadCell>
            <Table.HeadCell>
              {getText('state', localeCookie)}
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {slice.map((order) =>
            <>
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.firstTableCell}> 
                    <Dropdown className={myordersStyles.chevronDown} label="" inline={true}>
                        <ModalCancelarPedido currentTarget={currentTarget} currentItem={order.name} modalCancelarPedidoState={modalCancelarPedidoState} setModalCancelarPedidoState={changeModalCancelarPedidoState}/>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                    {order.name}
                  </Table.Cell>
                  <Table.Cell>
                    {order.state != "cancelled" ? order.fecha_compra : <ModalContactar currentTarget={currentTarget} currentItem={order.nombre} modalContactarState={modalContactarState} setModalContactarState={changeModalContactarState}/>}
                  </Table.Cell>
                  <Table.Cell>
                  {order.state == "delivered" &&
                    <span className={myordersStyles.deliveryStateEntregado}>{getText(order.state, localeCookie)}</span>
                  }
                  {order.state == "sent" &&
                    <span className={myordersStyles.deliveryStateEnviado}>{getText(order.state, localeCookie)}</span>
                  }
                  {order.state == "awaiting_confirmation" &&
                    <span className={myordersStyles.deliveryStateEspConfirm}>{getText(order.state, localeCookie)}</span>
                  }
                  {order.state == "cancelled" &&
                    <span className={myordersStyles.deliveryStateCancelado}>{getText(order.state, localeCookie)}</span>
                  }
                  </Table.Cell>
                </Table.Row>
            </>
          )}

          </Table.Body>
        </Table> 

    </>
  );
};

export default TablaPedidos;