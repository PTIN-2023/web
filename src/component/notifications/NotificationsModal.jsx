



export default function NotificationsModal (accion) {
    

    return (
        <>
            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleOpenAcceptModal}><HiOutlineCheckCircle/></button>
            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleOpenDenyModal}><HiXCircle/></button>
            <Modal show={showModal} size="md" popup={true} onClose={handleCloseDenyModal}>
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
                                { accion == 'accept' && <Button color="success" onClick={handleCloseAcceptModal}>
                                    Aceptar
                                </Button>}
                                { accion == 'deny' && <Button gradientMonochrome="failure" type="submit" disabled={isInputEmpty} onClick={handleCloseDenyModal}>
                                    Rechazar
                                </Button>}
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
    );
}



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
                                                       
                                                        <Button color="failure" onClick={handleCloseAcceptModal}>
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>