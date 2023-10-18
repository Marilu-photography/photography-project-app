import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Register from '../../views/Register/Register';
import { Link } from 'react-router-dom';
import './ModalR.css';
import ModalMessage from './ModalMessage';
import Login from '../../views/Login/Login';



const ModalL = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const closeModalL = () => {
        setShow(false);
    }

    //   const handleRegisterLink = () => {
    //     setShow(false);
    //   }

    return (
        <>

            <Link className='nav-link' onClick={handleShow}>
                Login
            </Link>

            <Modal {...props} show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Here</Modal.Title>
                </Modal.Header>
                <Modal.Body> <Login />  </Modal.Body>
            </Modal>
        </>
    );
};


export default ModalL; 