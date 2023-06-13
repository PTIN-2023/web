import React, { useState } from 'react';
import { Button, Modal } from 'flowbite';

const cartButton = () => {

  const [showButton, setShowButton] = useState(false);

  const handleCloseButton = () => {
    setShowButton(false);
  };

  const handleOpenButton = () => {
    setShowButton(true);
  };

  return (
    <React.Fragment>
        <Modal show={false} size="md" popup={true} onClose={handleCloseButton}>
            <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"> Are you sure you want to delete this product? </h3>
                    <div className="flex justify-center gap-4">
                    <Button color="failure"  > Yes, I'm sure </Button>
                    <Button color="gray" onClick={handleCloseButton} > No, cancel </Button>
                    </div>
                </div>
                </Modal.Body>
        </Modal>
    </React.Fragment>
  );
};

export default cartButton;