import React, { useState, useEffect, useRef } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import {Table, Button, Modal, Dropdown, Card, Tooltip} from 'flowbite-react'
import myordersStyles from "../styles/Myorders.module.css"
import {HiOutlineArrowRight, HiOutlineRocketLauncher, HiTrash, HiOutlineExclamationCircle,HiOutlineInformationCircle} from "react-icons/hi"
import useCookie from "../hooks/useCookie.js";
import { getText } from "../utils/getTextCurrentLocale.js";
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";
import createQR from "../utils/createPDF.js"


// //TODO: modular estas funciones de modal
function ModalDetalles({userTokenCookie, apiEndpoint, currentTarget, currentItem, modalDetallesState, setModalDetallesState}){
  const [localeCookie, ] = useCookie('local');
  const [pdfContent, setPdfContent] = useState(null);

  const [newResponse, setNewResponse] = useState("none")

      // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/get_patient_doctor"
  )
  useEffect(() =>{
    if(userTokenCookie != null ){
      sumbitAndFetch()
    }
  },[userTokenCookie])

  useEffect(() => {
    if(stringResponse != 'none') {
      console.log("new response not none: "+stringResponse)
      setNewResponse(JSON.parse(stringResponse))
    }
  }, [stringResponse])


    const onCloseDetallesHandler = () =>{
        setModalDetallesState(false);
    }
    const onClickDetallesHandler = () => {
        //asignamos el currentItem al Target
        //NOTA: si no estuviese esto se renderizaria un modal por cada fila
        currentTarget.current = currentItem.order_identifier;
        setModalDetallesState(true);
        sumbitAndFetch()
    }

    useEffect(() => {
      generatePDF();
    }, []);
  
    const generatePDF = async () => {
      const generatedPdfContent = await createQR(currentItem.order_identifier);
      setPdfContent(generatedPdfContent);
    };
  
    const getPdfUrl = () => {
      if (pdfContent) {
        const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
        return URL.createObjectURL(pdfBlob);
      }
      return null;
    };

    

  return(
    <>
    <HiOutlineInformationCircle onClick={onClickDetallesHandler} className={myordersStyles.informationIcon}></HiOutlineInformationCircle>
    <Modal
        /**si el currentTarget corresponde a la currentItem seleccionada y se hizo click en mostrar, mostrar modal */
        show={(currentTarget.current == currentItem.order_identifier && modalDetallesState) ? true : false}
        onClose={onCloseDetallesHandler}
        size="3xl"
      >
        <Modal.Header>
          {getText('order_details', localeCookie)}
        </Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
              <div>
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  {getText("modal_order_tracker",localeCookie)} -  {currentItem.location_end}
                </h5>
                <div className="grid grid-cols-3 leading-relaxed text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className={currentItem.state != "awaiting_confirmation" ? myordersStyles.detallesFeedbackConfirm : myordersStyles.detallesFeedback}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  
                  {(currentItem.state == "canceled" || currentItem.state == "denied") ? 
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                      className={myordersStyles.detallesFeedbackCancelled}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>      
                  
                  </>
                  :
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className={currentItem.state == "car_sent" || currentItem.state == "drone_sent" || currentItem.state == "delivered" ? myordersStyles.detallesFeedbackConfirm : myordersStyles.detallesFeedback}
                      >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                  
                  </>

                  }
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className={currentItem.state == "delivered" ? myordersStyles.detallesFeedbackConfirm : myordersStyles.detallesFeedback}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  
                </div>
                <div className="grid grid-cols-3  text-base leading-relaxed text-gray-900 dark:text-gray-400">
                  <p className={myordersStyles.detallesFeedbackText}>
                    {currentItem.state != "awaiting_confirmation" ? <>{getText("order_confirmed",localeCookie)}</> : <>{getText("ordered",localeCookie)}</> }  
                  </p>
                  {(currentItem.state == "canceled" || currentItem.state =="denied") ?
                    <>
                      <p className={myordersStyles.detallesFeedbackCanceledText}>
                      <Tooltip placement="bottom" content={getText("modal_tooltip_cancelled_text",localeCookie)}>
                        {getText("modal_tooltip_cancelled",localeCookie)}
                      </Tooltip>
                      </p>                   
                    </>
                    :
                    <>
                      <p className={myordersStyles.detallesFeedbackText}>
                      {currentItem.state == "car_sent"   && <>{getText("car_sent",localeCookie)}</>}   
                      {currentItem.state == "drone_sent" && <>{getText("drone_sent",localeCookie)}</>}   
                      {currentItem.state == "delivered"  && <>{getText("sent",localeCookie)}</> }   
                      {currentItem.state != "delivered" || currentItem.state != "drone_sent" || currentItem.state != "car_sent"  && <><span className="text-center">. . .</span></> }   
                        
                      </p>                   
                    </>
                  }
                  <p className={myordersStyles.detallesFeedbackText}>
                    { currentItem.state == "delivered" ? <>{getText("delivered", localeCookie)}</> : <><span className="text-center">. . .</span></>}
                  </p>
                  
                </div>
              </div>
            <div className="max-width">
              <Card>
                <div className="mb-4 flex items-center justify-between">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    {getText("modal_order_details_header",localeCookie)} - {currentItem.order_identifier}
                  </h5>
                </div>
                <div className="flow-root h-[200px] overflow-auto">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentItem.medicine_list.map((item) =>
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                              {item[0].medicine_name} ({item[1]})
                            </p>
                          </div>
                        </div>
                      </li>                  
                    )}
                  </ul>
                </div>
                
              </Card>
            </div>

              <p className="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
              {newResponse != "none" && 
                <>
                  Contacto: <br />
                  {newResponse.doctor_phone} <br />
                  {newResponse.doctor_email}
                </>
              }
              </p>
          </div>
          <div>
            {pdfContent && (
              <iframe src={getPdfUrl()} width="20%" height="200px" title="PDF Viewer" />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCloseDetallesHandler}>
            {getText('close', localeCookie)}
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )


}
function ModalContactar({apiEndpoint, userTokenCookie, currentTarget, currentItem, modalContactarState, setModalContactarState}){
//recibe: 
//currentTarget: identifica la fila a la que hicimos click dentro de la tabla
//currentItem: identifica la fila en cuestión para que no se ejecuten todos los modals a la vez (TODO: intentar optimizar)
//modalContactarState y setModalContactarState: muestran o esconden el modal
  const [localeCookie, ] = useCookie('locale')

  const [newResponse, setNewResponse] = useState("none")

      // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/get_patient_doctor"
  )
  useEffect(() =>{
    if(userTokenCookie != null ){
      sumbitAndFetch()
    }
  },[userTokenCookie])

  useEffect(() => {
    if(stringResponse != 'none') {
      console.log("new response not none: "+stringResponse)
      setNewResponse(JSON.parse(stringResponse))
    }
  }, [stringResponse])

    const onCloseContactarHandler = () =>{
        setModalContactarState(false);
    }
    const onClickContactarHandler = () => {
        //asignamos el currentItem al Target
        //NOTA: si no estuviese esto se renderizaria un modal por cada fila
        currentTarget.current = currentItem;
        setModalContactarState(true);
        sumbitAndFetch()
    }

    return(
    <>    
      <Button onClick={onClickContactarHandler} size="sm">
        {getText('contact', localeCookie)}
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Modal
        /**si el currentTarget corresponde a la currentItem seleccionada y se hizo click en mostrar, mostrar modal */
        show={(currentTarget.current == currentItem && modalContactarState) ? true : false}
        onClose={onCloseContactarHandler}
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
              {newResponse != "none" && 
              <>
                {newResponse.doctor_phone} <br />
                {newResponse.doctor_email}
              </>
              }
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


const TablaCompPaciente = ({ data, rowsPerPage, slice, range, setPage, page, props }) => {
  //componente que renderiza la tabla con los pedidos
  //recibe data -> json de pedidos
  //rowsPerPage -> cuantas filas va a renderizar
  //searchValue -> el filtro en caso de que se active el componente MyOrdersSearch
  ({ slice, range } = useTable(data.orders, page, rowsPerPage));

  const [localeCookie, ] = useCookie('locale')
  const [userTokenCookie, ] = useCookie('user_token')

  //estos dos hooks de abajo sirven para mostrar o bien ocultar los modals
  const [modalContactarState, setModalContactarState] = useState(false);
  const [modalCancelarPedidoState, setModalCancelarPedidoState] = useState(false);
  const [modalDetallesState, setModalDetallesState] = useState(false);
  //currentTarget es un hook useRef para que no se actualice en cada render y así aseguramos que los modals no se multipliquen
  const currentTarget = useRef("");


  //changeModalCancelarPedidoState y changeModalContactarState son funciones que cambian el useState ya que los setters no se pueden pasar bien hacia los componentes
  function changeModalCancelarPedidoState(e){
    setModalCancelarPedidoState(e);

  }

  function changeModalContactarState(e){
    setModalContactarState(e);

  }
  function changeModalDetallesState(e){
    setModalDetallesState(e);

  }


  
  return (
    <>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell className="!p-4">
            </Table.HeadCell>
            <Table.HeadCell>
              {getText('ID', localeCookie)}
            </Table.HeadCell>
            <Table.HeadCell>
              {getText('purchased_date', localeCookie)}
            </Table.HeadCell>
            <Table.HeadCell>

            </Table.HeadCell>
            <Table.HeadCell>
              {getText('state', localeCookie)}
            </Table.HeadCell>
            <Table.HeadCell>
              {getText('details', localeCookie)}
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {slice.map((order) =>
            <>
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.firstTableCell}> 
                    <Dropdown className={myordersStyles.chevronDown} label="" inline={true}>
                        <ModalCancelarPedido currentTarget={currentTarget} currentItem={order.order_identifier} modalCancelarPedidoState={modalCancelarPedidoState} setModalCancelarPedidoState={changeModalCancelarPedidoState}/>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                    {order.order_identifier}
                  </Table.Cell>
                  <Table.Cell>
                    {order.date}
                  </Table.Cell>
                  <Table.Cell>
                    {(order.state == "canceled" || order.state == "denied") && <ModalContactar userTokenCookie={userTokenCookie} apiEndpoint={props.apiEndpoint} currentTarget={currentTarget} currentItem={order.order_identifier} modalContactarState={modalContactarState} setModalContactarState={changeModalContactarState}/>}
                  </Table.Cell>
                  <Table.Cell>
                    {(order.state == "delivered" || order.state == "delivered_waiting" ) &&
                      <span className={myordersStyles.deliveryStateEntregado}>{getText("delivered", localeCookie)}</span>
                    }
                    {(order.state == "car_sent") &&
                      <span className={myordersStyles.deliveryStateEnviado}>{getText("car_sent", localeCookie)}</span>
                    }
                    {(order.state == "drone_sent") &&
                      <span className={myordersStyles.deliveryStateEnviado}>{getText("drone_sent", localeCookie)}</span>
                    }
                    {(order.state == "awaiting_confirmation" || order.state == "ordered") &&
                      <span className={myordersStyles.deliveryStateEspConfirm}>{getText(order.state, localeCookie)}</span>
                    }
                    {(order.state == "canceled" || order.state == "denied") &&
                      <span className={myordersStyles.deliveryStateCancelado}>{getText(order.state, localeCookie)}</span>
                    }
                  </Table.Cell>
                  <Table.Cell className={`${myordersStyles.firstTableCell} ${myordersStyles.detailsRow}`}>
                    <ModalDetalles userTokenCookie={userTokenCookie} apiEndpoint={props.apiEndpoint} currentTarget={currentTarget} currentItem={order} modalDetallesState={modalDetallesState} setModalDetallesState={changeModalDetallesState} />
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

export default TablaCompPaciente;