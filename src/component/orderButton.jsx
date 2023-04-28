import {Button, Modal} from 'flowbite-react'
import { HiOutlineExclamation, HiOutlineExclamationCircle } from 'react-icons/hi';

const orderButton = ({ showModal, setShowModal, handleCloseModal, handleOpenModal }) =>
{
    return(
        <>
        <React.Fragment>
            <Button onClick={handleOpenModal}>
                Pedir
            </Button>
            <Modal show={showModal} size="md" popup={true} onClose={handleCloseModal}>
                <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Seguro que quieres seguir con la compra ?
                            </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="green" onClick={handleCloseModal}>
                                        Si, estoy segur@
                                    </Button>
                                    <Button color="failure" onClick={handleCloseModal}>
                                        No, cancelar
                                    </Button>
                                </div>
                        </div>
                    </Modal.Body>
            </Modal>
        </React.Fragment>
        </>
    );
}

export default orderButton;