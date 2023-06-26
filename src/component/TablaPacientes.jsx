import React, { useState, useRef } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import {Table, Button, Modal, Dropdown} from 'flowbite-react'
import myordersStyles from "../styles/Myorders.module.css"
import { HiOutlineArrowRight } from "react-icons/hi"
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../hooks/useSumbitAndFetch";


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
            Sitio de contacto del cliente: {currentItem}
            </p>
            <p className="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
              +34 123456789 <br />
              paciente.superbueno@gente.com
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


const Tablapacientess = ({ data, rowsPerPage }) => {


  //componente que renderiza la tabla con los pacientess
  //recibe data -> json de pacientess
  //rowsPerPage -> cuantas filas va a renderizar
  const [page, setPage] = useState(1);
  const [localeCookie, ] = useCookie("locale")
  const [userTokenCookie, ] = useCookie('user_token')

  const [currentDoctor, setCurrentDoctor] = useState('')
  const [responsePatients, setResponsePatients] = useState("none")
  //estos dos hooks de abajo sirven para mostrar o bien ocultar los modals
  const [modalContactarState, setModalContactarState] = useState(false);
  //currentTarget es un hook useRef para que no se actualice en cada render y así aseguramos que los modals no se multipliquen
  const currentTarget = useRef("");

  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "doctor_email"  : currentDoctor,
  }) 

  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    props.apiEndpoint+"/api/list_assigned_doctors"
  )

  useEffect(() => {
    if(userTokenCookie != null){
      sumbitAndFetch()
    }
  }, [stringRequest]);

  useEffect(() => {
    if(stringResponse != "none"){
        setResponsePatients(JSON.parse(stringResponse))
    }
  }, [stringResponse])

  function changeModalContactarState(e){
    setModalContactarState(e);

  }

  var { slice, range } = useTable(responsePatients.patients, page, rowsPerPage);
  return (
    <>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell className="!p-4">
            </Table.HeadCell>
            <Table.HeadCell>
              Nombre Paciente
            </Table.HeadCell>
            <Table.HeadCell>
              Correo
            </Table.HeadCell>
            <Table.HeadCell>
              Numero de telefono
            </Table.HeadCell>
            <Table.HeadCell>
              Ciudad
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {responsePatients != "none" ? (slice.map((patient) =>
            <>
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.tableCell}>
                      {patient.user_full_name}
                  </Table.Cell>
                  <Table.Cell>
                      {patient.user_email}
                  </Table.Cell>
                  <Table.Cell>
                      {patient.user_phone}
                  </Table.Cell>
                  <Table.Cell>
                      {patient.user_city}
                  </Table.Cell>
                  <Table.Cell> 
                    <ModalContactar currentTarget={currentTarget} currentItem={patient.user_full_name} modalContactarState={modalContactarState} setModalContactarState={changeModalContactarState}/>
                  </Table.Cell>
                </Table.Row>
            </>
          ))
          :
          <></> 
          }
          </Table.Body>
        </Table> 
    </>
  );
};

export default Tablapacientess;