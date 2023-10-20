import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import './ModalR.css';
import Login from '../../views/Login/Login';
//import ModalR from './ModalR';



const ModalL = (props) => {
    const [show, setShow] = useState(false);
    //const [showR, setShowR] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>

            <Link className='nav-link' onClick={handleShow}>
                Login
            </Link>

            <Modal {...props} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Here</Modal.Title>
                </Modal.Header>
                <Modal.Body> <Login /> 
                <p>Dont't you have an account yet? <button className='btn-modal-link'>Register here</button></p> 
                </Modal.Body> 
            </Modal>
        </>
    );
};


export default ModalL; 