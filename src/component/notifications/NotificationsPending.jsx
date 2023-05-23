import React from "react";
import {Table, Button, Modal} from 'flowbite-react';
import useTable from "../../hooks/useTable.js";
import TableFooter from "../TableFooter.jsx";
import style from "../../styles/Makeorder.module.css";
import {useState, useEffect} from "react";
import * as env_config from "../../utils/env_config"
import useCookie from '../../hooks/useCookie';
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetchObject from "../../hooks/useSumbitAndFetchObject.js";
import { HiOutlineCheckCircle, HiXCircle } from 'react-icons/hi';

export async function getServerSideProps() {
    const apiEndpoint = String(env_config.getApiEndpoint());
  
    return {
      props: { 
        apiEndpoint,
      }
    }
}

function NotificationsPending (props) {

    const [userTokenCookie, ] = useCookie('user_token');
    const [rowsPerPage, setrowsPerPage] = useState('10');
    const [page, setPage] = useState('1');
    const [data, setData] = useState();
    
    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "confirmations_per_page" : rowsPerPage,
        "page" : page
    })

    const [sumbitAndFetch, stringResponse] = useSumbitAndFetchObject(
        stringRequest,
       [ "http://localhost:3000/api/list_doctor_pending_confirmations"]
    )

    useEffect(() => {
        sumbitAndFetch();
    }, [stringResponse])



    
    

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
        <div></div>
    );  
}

export default NotificationsPending;

/*<div>
            <>
                <TableFooter range={data.length} slice={stringResponse} setPage={setPage} page={page} />
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>Paciente</Table.HeadCell>
                        <Table.HeadCell>Medicamentos</Table.HeadCell>
                        <Table.HeadCell>Cantidad</Table.HeadCell>
                        <Table.HeadCell>ID orden</Table.HeadCell>
                        <Table.HeadCell/>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    
                    {data.map((notification) =>
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
        </div>
        */