import React, { useState, useRef } from "react";
import {Table, Tabs, Button, Modal} from 'flowbite-react';
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import style from "../styles/Makeorder.module.css";
import { HiClock, HiOutlineBell, HiOutlineCheckCircle, HiXCircle } from 'react-icons/hi';



function Tabla_notificaciones({ data, rowsPerPage }){
    //Pagina actual
    const [page, setPage] = useState(1);

    //usa el hook useTable para dividir los datos por pagina
    var { slice, range } = useTable(data, page, rowsPerPage);

    //useState de los modales de accept y deny, para decirle cuando se tienen que mostrar
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showDenyModal, setShowDenyModal] = useState(false);

    //useState para el input del modal deny, para que evite que se pueda enviar un rechazo sin motivo
    const [inputValue, setInputValue] = useState("");
    const isInputEmpty = inputValue.trim() === "";
    
    //Para cerrar el modal accept
    const handleCloseAcceptModal = () => {
        setShowAcceptModal(false);
    };

    //Para cerrar el modal accept
    const handleCloseDenyModal = () => {
        setShowDenyModal(false);
    };

    //Para abrir el modal accept
    const handleOpenAcceptModal = () => {
        setShowAcceptModal(true);
    };

    //Para abrir el modal deny
    const handleOpenDenyModal = () => {
        setShowDenyModal(true);
    };
    
    function handleSubmit(event) {
      event.preventDefault();
    }

    return (
        <div>
            <>
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>Paciente</Table.HeadCell>
                        <Table.HeadCell>Medicamento</Table.HeadCell>
                        <Table.HeadCell>Cantidad</Table.HeadCell>
                        <Table.HeadCell>ID orden</Table.HeadCell>
                        <Table.HeadCell/>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    {slice.map((notification) =>
                        <>
                            <Table.Row className={style.tableRow}>
                                <Table.Cell className={style.tableCell}>{notification.patient_fullname}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.medicine_list}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.date}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.order_identifier}</Table.Cell>
                                <Table.Cell>
                                    <>
                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleOpenAcceptModal}><HiOutlineCheckCircle/></button>
                                        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleOpenDenyModal}><HiXCircle/></button>
                                        <Modal show={showAcceptModal} size="md" popup={true} onClose={handleCloseAcceptModal}>
                                            <Modal.Header />
                                            <Modal.Body>
                                                <div className="text-center">
                                                    <div className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                        <span>Seguro que quiere</span>
                                                        <span style={{ color: "green" }}> aceptar</span>
                                                        <span> esta petición?</span>
                                                    </div>
                                                    <div className="flex justify-center gap-4">
                                                        <Button color="success" onClick={handleCloseAcceptModal}>
                                                            Aceptar
                                                        </Button>
                                                        <Button color="failure" onClick={handleCloseAcceptModal}>
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                        <Modal show={showDenyModal} size="md" popup={true} onClose={handleCloseDenyModal}>
                                            <Modal.Header />
                                            <Modal.Body>
                                                <div className="text-center">
                                                    <div className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                        <span>Seguro que quiere</span>
                                                        <span style={{ color: "red" }}> rechazar</span>
                                                        <span> esta petición?</span>
                                                    </div>
                                                    <form onSubmit={handleSubmit}>
                                                        
                                                        <textarea type="text" placeholder="Motivo" style={{ width: "80%", height: "60px" }} id="myInput" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                                                        
                                                        <br />
                                                        <div className="flex justify-center gap-4">
                                                            <Button gradientMonochrome="failure" type="submit" disabled={isInputEmpty} onClick={handleCloseDenyModal}>
                                                                Rechazar
                                                            </Button>
                                                            <Button color="failure" onClick={handleCloseDenyModal}>
                                                                Cancelar
                                                            </Button>
                                                        </div>
                                                    </form>
                                                    {isInputEmpty && (
                                                        <div style={{ color: "red" }}><br/>Por favor, escriba el motivo por el que rechaza la petición</div>
                                                    )}
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </>                         
                                </Table.Cell>
                            </Table.Row>
                        </>
                    )}
                    </Table.Body>
                </Table>
                <br></br>
            </>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </div>
        
    );  
}


function Tabla_historial({ data, rowsPerPage }){
    //Pagina actual
    const [page, setPage] = useState(1);

    //usa el hook useTable para dividir los datos por pagina
    var { slice, range } = useTable(data, page, rowsPerPage);

    return (
        <div>
            <>
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>Paciente</Table.HeadCell>
                        <Table.HeadCell>Medicamento</Table.HeadCell>
                        <Table.HeadCell>Cantidad</Table.HeadCell>
                        <Table.HeadCell>ID orden</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    {slice.map((notification) =>
                        <>
                            <Table.Row className={style.tableRow}>
                                <Table.Cell className={style.tableCell}>{notification.paciente}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.medicamento}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.cantidad}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.id_orden}</Table.Cell>
                            </Table.Row>
                        </>
                    )}
                    </Table.Body>
                </Table>
                <br></br>
            </>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </div>
        
    );  
}



function NotificationList({ data, rowsPerPage }) {



    return (
        <Tabs.Group
            aria-label="pills"
            style="underline"
        >
            <Tabs.Item 
                title="Notificaciones"
                icon={HiOutlineBell}
            >
                <Tabla_notificaciones data={data} rowsPerPage={rowsPerPage} />
                
            </Tabs.Item>
            <Tabs.Item
                active={true}
                title="Historial"
                icon={HiClock}
            >
                <Tabla_historial data={data} rowsPerPage={rowsPerPage} />
            </Tabs.Item>
        </Tabs.Group>
    );
}

export default NotificationList;