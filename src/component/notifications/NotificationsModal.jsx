import React from "react";
import { Button, Modal } from 'flowbite-react';
import { useState, useRef } from "react";
import { HiOutlineCheckCircle, HiXCircle } from 'react-icons/hi';



export default function NotificationsModal ({currentTarget, currentItem}) {

    //Referencia al textarea para sacar la informacion que tiene
    const textareaRef = useRef(null);

    //useState para definir la accion a mostrar aceptar/rechazar y para saber si mostrar el modal o no
    const [action, setAction] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showError, setShowError] = useState(false);

    
    //Para cerrar el modal 
    const handleCloseModal = () => {
        setShowModal(false);
    };


    //Para abrir el modal 
    const handleOpenAceptModal = () => {
        currentTarget.current = currentItem;
        setShowModal(true);
        setAction('accept');
    };

    const handleOpenDenyModal = () => {
        currentTarget.current = currentItem;
        setShowModal(true);
        setAction('deny');
    };
    
    function handleSubmit(event) {
        event.preventDefault();
        if (action == 'deny') {
            if (textareaRef.current.value == '') setShowError(true);
            else 
            { 
                setShowError(false);
                console.log("Rechazo con motivo:", textareaRef.current.value);
                //TODO: Implementar Backend on deny
            }
        }
        else if (action == 'accept' )
        {
            console.log("Aceptada");
            //TODO: Implementar Backend on accept
        }
    }


    return (
        <>
            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleOpenAceptModal}><HiOutlineCheckCircle/></button>
            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleOpenDenyModal}><HiXCircle/></button>
            
            <Modal show={(currentTarget.current == currentItem && showModal) ? true : false} size="md" popup={true} onClose={handleCloseModal}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <div className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            <span>Seguro que quiere</span>
                            { action == 'deny' && <span style={{ color: "red" }}> rechazar</span>}
                            { action == 'accept' &&  <span style={{ color: "green" }}> aceptar</span>}
                            <span> esta petición?</span>
                        </div>
                        { action == 'deny' && <textarea type="text" placeholder="Motivo" style={{ width: "80%", height: "60px" }} id="myInput" ref={textareaRef} />}
                        <form onSubmit={handleSubmit}>
                            <br />
                            <div className="flex justify-center gap-4">
                                { action == 'accept' && <Button color="success" type="submit" onClick={handleCloseModal}>
                                    Aceptar
                                </Button>}
                                { action == 'deny' && <Button gradientMonochrome="failure" type="submit" onClick={handleCloseModal}>
                                    Rechazar
                                </Button>}
                                <Button color="failure" onClick={handleCloseModal}>
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                        {  action == 'deny' && showError && (
                            <div style={{ color: "red" }}><br/>Por favor, escriba el motivo por el que rechaza la petición</div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}