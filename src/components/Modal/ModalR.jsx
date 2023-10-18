import { useState } from 'react';
//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Register from '../../views/Register/Register';
import { Link } from 'react-router-dom';
import './ModalR.css';



const ModalR = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeModalR = () => {
    setShow(false);
  }

  return (
    <>
      <Link className='nav-link' variant="primary" onClick={handleShow}>
        Register
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Here</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Register onCloseModalR={closeModalR} />  </Modal.Body>
      </Modal>
    </>
  );
};


export default ModalR; 