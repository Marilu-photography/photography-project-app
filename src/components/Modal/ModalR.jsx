import { useState } from 'react';
//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Register from '../../views/Register/Register';
import { Link } from 'react-router-dom';
import './ModalR.css';
import ModalMessage from './ModalMessage';
import ModalL from './ModalL';



const ModalR = () => {
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showL, setShowL] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeModalR = () => {
    setShowMessage(true);
    setShow(false);
  }

  const handleLogInLink = () => {
    setShowL(true);
    setShow(false);
  }

  return (
    <>
      <Link className='nav-link' onClick={handleShow}>
        Register
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Here</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Register onCloseModalR={closeModalR}  /> 
        <p>Already have an account? <button onClick={handleLogInLink}>Log in here</button></p>
         </Modal.Body>
      </Modal>
      <ModalMessage show={showMessage} />
      <ModalL show={showL} />
    </>
  );
};


export default ModalR; 