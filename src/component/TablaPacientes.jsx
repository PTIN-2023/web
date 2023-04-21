import React, { useState, useRef } from "react";
import useTable from "../hooks/useTable.js";
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
            Sitio de contacto del cliente: {currentItem}
            </p>
            <p className="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
            {/*TODO: en el proximo sprint, relacionar paciente con sus datos de doctor!*/}
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


const Tablapacientess = ({ data, rowsPerPage, searchValue, setSearchValue }) => {
  //componente que renderiza la tabla con los pacientess
  //recibe data -> json de pacientess
  //rowsPerPage -> cuantas filas va a renderizar
  //searchValue -> el filtro en caso de que se active el componente MyOrdersSearch
  const [page, setPage] = useState(1);
  //estos dos hooks de abajo sirven para mostrar o bien ocultar los modals
  const [modalContactarState, setModalContactarState] = useState(false);
  const [modalCancelarpacientesState, setModalCancelarpacientesState] = useState(false);
  //currentTarget es un hook useRef para que no se actualice en cada render y así aseguramos que los modals no se multipliquen
  const currentTarget = useRef("");

  //changeModalCancelarpacientesState y changeModalContactarState son funciones que cambian el useState ya que los setters no se pueden pasar bien hacia los componentes
  function changeModalCancelarpacientesState(e){
    setModalCancelarpacientesState(e);

  }

  function changeModalContactarState(e){
    setModalContactarState(e);

  }

  //si la longitud del searchValue es > 0 y se hizo click en buscar, filtra el json de datos
  if(searchValue.value.length > 0 && searchValue.isCompleted){
    data = data.filter((pacientes) => pacientes.nombre.toLowerCase().includes(searchValue.value));  
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
              Nombre Paciente
            </Table.HeadCell>
            <Table.HeadCell>
              Historial Médico
            </Table.HeadCell>
            <Table.HeadCell>
              Medicamentos Recetados
            </Table.HeadCell>
            <Table.HeadCell>
              Contacto
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {slice.map((pacientes) =>
            <>
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.firstTableCell}> 
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                    {pacientes.nombre}
                  </Table.Cell>
                  <Table.Cell> 
                    <Dropdown className={myordersStyles.chevronDown} label={pacientes.historial[0]} inline={true}>
                        <option>{pacientes.historial[1]}</option>
                        <option>{pacientes.historial[2]}</option>
                        {/**TODO: Hacer bucle para mostrar el historial*/}
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown className={myordersStyles.chevronDown} label={pacientes.medicamentos[0]} inline={true}>
                        <option>{pacientes.medicamentos[1]}</option>
                        <option>{pacientes.medicamentos[2]}</option>
                        <option>{pacientes.medicamentos[3]}</option>
                        <option>{pacientes.medicamentos[4]}</option>
                        {/**TODO: Hacer bucle para mostrar los medicamentos ya que no siempre habra 4*/}
                    </Dropdown>                                                  
                  </Table.Cell>
                  <Table.Cell> 
                    <ModalContactar currentTarget={currentTarget} currentItem={pacientes.nombre} modalContactarState={modalContactarState} setModalContactarState={changeModalContactarState}/>
                  </Table.Cell>
                </Table.Row>
            </>
          )}

          </Table.Body>
        </Table> 

    </>
  );
};

export default Tablapacientess;