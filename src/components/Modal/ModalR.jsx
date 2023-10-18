import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Register from '../../views/Register/Register';
import { Link } from 'react-router-dom';
import './ModalR.css';
import ModalMessage from './ModalMessage';
import ModalLReg from './ModalLReg';



const ModalR = (props) => {
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showLR, setShowLR] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeModalR = () => {
    setShowMessage(true);
    setShow(false);
  }

  const handleLogInLink = () => {
    setShowLR(true);
    setShow(false);
  }

  return (
    <>
      <Link className='nav-link' onClick={handleShow}>
        Register
      </Link>

      <Modal {...props} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Here</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Register onCloseModalR={closeModalR}  /> 
        <p>Already have an account? <button onClick={handleLogInLink}>Login here</button></p>
         </Modal.Body>
      </Modal>
      <ModalMessage show={showMessage} />
      <ModalLReg show={showLR} />
    </>
  );
};


export default ModalR; 